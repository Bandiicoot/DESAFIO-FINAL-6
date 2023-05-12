import { Router } from "@vaadin/router";

import { rtdb } from "./db";
import * as router from "./router";
import { Console } from "console";

const API_BASE_URL = process.env.BACK_URL;

type Played = "piedra" | "papel" | "tijera";

const state = {
  data: {
    currentGame: {
      myPlay: "",
      botPlay: "",
      start: "false",
      userName: "",
      opponentName: "",
      userId: "",
      shortRoomId: 0,
      longRoomId: 0,
    },
    history: {
      myScore: 0,
      botScore: 0,
    },
  },
  listeners: [],

  createGameRoom() {},

  getStorage() {
    const localData = JSON.parse(localStorage.getItem("data") as string);

    if (localData) {
      console.log("Axel.go", localData);
      this.setState(localData);
      Router.go("/desafio-final-five/welcome");
    } else {
      Router.go("/");
    }
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    this.savedData();
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  ////////////////////////////////////////////////////////////////
  setStart() {
    const currentState = this.getState();
    currentState.start = true;
    this.setState(currentState);
  },
  ////////////////////////////////////////////////////////////////
  setName(name: string) {
    const currentState = this.getState();
    currentState.userName = name;
    this.setState(currentState);
  },
  ////////////////////////////////////////////////////////////////

  setRoomId(roomId: string) {
    const currentState = this.getState();
    currentState.roomId = roomId;

    this.setState(currentState);
  },
  ////////////////////////////////////////////////////////////////
  setOpponentId(opponentId: string) {
    const currentState = this.getState();
    currentState.opponentName = opponentId;
    this.setState(currentState);
  },
  ////////////////////////////////////////////////////////////////

  async getExistingRoom() {
    const currentState = this.getState();
  },
  ////////////////////////////////////////////////////////////////
  async askRTDBroom(shortRoomIdReceived) {
    console.log("askRTDBRoom Recibió: ", shortRoomIdReceived);
    await fetch(API_BASE_URL + "/getRoomId/" + shortRoomIdReceived, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        ////AGREGUE ESTO POR LO DEL CORS
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          window.alert(data.message);
        } else if (data.rtdbRoomid) {
          let cs = this.getState();
          console.log("currentState: ", cs);
          cs.shortRoomId = shortRoomIdReceived;
          cs.longRoomId = data.rtdbRoomid;

          this.setState(cs);
          // window.alert("Sala encontrada!");
          this.joinRoom({
            longRoomId: data.rtdbRoomid,
            userId: this.data.userData.userId,
            userName: this.data.userData.userName,
          });
        }
      });
  },

  async signup(userSignupData) {
    console.log(userSignupData);
    await fetch(API_BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userSignupData.inputEmail,
        name: userSignupData.inputName,
        password: userSignupData.inputPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message == "El email ya esta en uso, por favor ingrese otro") {
          window.alert(data.message);
        } else {
          let cs = this.getState();

          cs.userEmail = userSignupData.inputEmail;
          cs.userPassword = userSignupData.inputPassword;
          cs.userName = userSignupData.inputName;

          cs.userId = data.id;

          console.log("getState: ", this.getState());
          this.setState(cs);

          Router.go("/desafio-final-five/welcome");

          // Router.go("/menu");
        }
      });
  },

  async signIn(userSignInData) {
    console.log(userSignInData);
    await fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userSignInData.inputEmail,
        password: userSignInData.inputPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message == "Not found!") {
          window.alert(data.message);
        } else {
          let cs = this.getState();
          cs.currentGame.userName = data.name;
          cs.currentGame.userEmail = userSignInData.inputEmail;
          cs.currentGame.userPassword = userSignInData.inputPassword;
          // cs.currentGame.userName = userSignInData.inputName;

          cs.currentGame.userId = data.id;

          console.log("getState: ", this.getState());
          this.setState(cs);

          Router.go("/desafio-final-five/welcome");
        }
      });
  },

  async createRoom() {
    console.log(
      this.getState(),
      "createRoom Recibió: ",
      this.data.currentGame.userId,
      this.data.currentGame.userName
    );
    await fetch(API_BASE_URL + "/createGameRoom", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: this.data.currentGame.userId,
        userName: this.data.currentGame.userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Esta es la data que estamos probando", data);
        let cs = this.getState();
        (cs.currentGame.shortRoomId = data.shortId),
          (cs.currentGame.longRoomId = data.longRoomId);
        this.setState(cs);
        window.alert("Sala creada!");
        Router.go("/desafio-final-five/pasarCodigoRoom");
      });
  },

  setScore(result) {
    const currentState = this.getState();

    if (result == "win") {
      currentState.history.myScore++;
    } else if (result == "lose") {
      currentState.history.botScore++;
    }
    this.setState(currentState);
  },

  restartGame() {
    const currentState = this.getState();
    currentState.currentGame.myPlay = "";
    currentState.currentGame.botplay = "";
    this.setState(currentState);
  },

  whoWins(myPlay: Played, botPlay: Played) {
    const ganasteConPapel: boolean = myPlay == "papel" && botPlay == "piedra";
    const ganasteConTijera: boolean = myPlay == "tijera" && botPlay == "papel";
    const ganasteConPiedra: boolean = myPlay == "piedra" && botPlay == "tijera";
    const ganaste = [
      ganasteConPiedra,
      ganasteConPapel,
      ganasteConTijera,
    ].includes(true);

    const perdisteConPiedra: boolean = myPlay == "piedra" && botPlay == "papel";
    const perdisteConPapel: boolean = myPlay == "papel" && botPlay == "tijera";
    const perdisteConTijera: boolean =
      myPlay == "tijera" && botPlay == "piedra";
    const perdiste = [
      perdisteConPiedra,
      perdisteConPapel,
      perdisteConTijera,
    ].includes(true);

    if (ganaste == true) {
      return "win";
    } else if (perdiste == true) {
      return "lose";
    } else {
      return "tie";
    }
  },

  setMove(move: Played) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
    this.setScore();
  },

  savedData() {
    const currentHistory = this.getState();
    localStorage.setItem("data", JSON.stringify(currentHistory));
  },
};

export { state };
