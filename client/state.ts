import { Router } from "@vaadin/router";
import { database, onValue, ref, get, off } from "./db";
// import { rtdb } from "./db";
// import * as router from "./router";
import { Console } from "console";
import { createCipheriv } from "crypto";
//
// || "https://desafio-final-6-back.onrender.com"; || "http://localhost:3000"

// const API_BASE_URL = "http://localhost:3000";

const API_BASE_URL = process.env.BACK_URL;
const FRONT_URL = "https://desafio-final-6.onrender.com";

const state = {
  data: {
    currentGame: {
      myPlay: "",
      secondPlayer: "",
      botPlay: "",
      start: "false",
      userName: "",
      opponentName: "",
      userId: "",
      shortRoomId: 0,
      longRoomId: 0,
      userPassword: "",
      finalResult: "",
    },
    history: {
      myScore: 0,
      botScore: 0,
    },
    actualGame: {},
  },
  listeners: [],

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
    await fetch(API_BASE_URL + "/getRtdbRoomId/" + shortRoomIdReceived, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          window.alert(data.message);
        } else {
          console.log("esta es la data rtdbRoomid: ", data.rtdbRoomId);
          let cs = this.getState();
          console.log("currentState: ", cs);
          cs.currentGame.shortRoomId = shortRoomIdReceived;
          cs.currentGame.longRoomId = data.rtdbRoomId;

          this.setState(cs);
          window.alert("Sala encontrada!");
          this.joinRoom({
            longRoomId: data.rtdbRoomId,
            userId: this.data.currentGame.userId,
            userName: this.data.currentGame.userName,
          });
        }
      });
  },

  async joinRoom(dataRecieved) {
    console.log("joinRoom recibió: ", dataRecieved);
    await fetch(
      API_BASE_URL +
        "/gameRoomsChanges/" +
        dataRecieved.longRoomId +
        "/" +
        dataRecieved.userId,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userStatus: true,
          userName: dataRecieved.userName,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          data.message == "Te uniste a la sala" ||
          data.message == "Te conectaste a la sala"
        ) {
          window.alert(data.message);
          this.connectToGameRoom(dataRecieved.longRoomId);
        } else if (data.message === "Sala llena") {
          window.alert(data.message);
        }
      });
  },

  async signup(userSignupData) {
    console.log(userSignupData);
    await fetch(API_BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
        if (data.message == "El email ya esta en uso, por favor ingresa otro") {
          window.alert(data.message);
        } else {
          let cs = this.getState();

          cs.currentGame.userEmail = userSignupData.inputEmail;
          cs.currentGame.userPassword = userSignupData.inputPassword;
          cs.currentGame.userName = userSignupData.inputName;

          cs.currentGame.userId = data.id;

          this.setState(cs);
          console.log("getState: ", this.getState());

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

  // async createRoom() {
  //   console.log(
  //     // this.getState(),
  //     "createRoom Recibió: ",
  //     this.data.currentGame.userId,
  //     this.data.currentGame.userName
  //   );
  //   await fetch(API_BASE_URL + "/createGameRoom", {
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "same-origin",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: this.data.currentGame.userId,
  //       userName: this.data.currentGame.userName,
  //     }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Esta es la data que estamos probando", data);
  //       let cs = this.getState();
  //       (cs.currentGame.shortRoomId = data.shortId),
  //         (cs.currentGame.longRoomId = data.longRoomId);
  //       this.setState(cs);
  //       window.alert("Sala creada!");
  //       Router.go("/desafio-final-five/pasarCodigoRoom");
  //     });
  // },

  async createRoom(userId, userName) {
    console.log("createRoom Recibió: ", userId, userName);
    await fetch(API_BASE_URL + "/createGameRoom", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        userName: userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let cs = this.getState();
        (cs.currentGame.shortRoomId = data.shortId),
          (cs.currentGame.longRoomId = data.longRoomId);
        this.setState(cs);
        window.alert("Sala creada!");
        Router.go("/desafio-final-five/pasarCodigoRoom");
      });
  },

  returnActualGame() {
    return this.data.actualGame;
  },

  async connectToGameRoom(longRoomId) {
    const roomRef = ref(database, "rooms/" + longRoomId + "/rooms/currentGame");
    console.log(roomRef, "este es el roomRef");

    onValue(roomRef, (snap) => {
      console.log("Esta es la roomRef:" + roomRef, "SnapShot", snap);
      const data = snap.val();
      console.log(data);
      this.data.actualGame = data;
      if (
        state.data.actualGame[state.data.currentGame.userId] ==
        state.data.actualGame[Object.keys(data)[0]]
      ) {
        this.data.currentGame.myPlay = data[Object.keys(data)[0]].choice;

        this.data.history.myScore = data[Object.keys(data)[0]].score;
        this.data.history.botScore = data[Object.keys(data)[1]].score;
        this.data.currentGame.secondPlayer = data[Object.keys(data)[1]].choice;
        this.data.currentGame.opponentName = data[Object.keys(data)[1]].name;
      } else if (
        state.data.actualGame[state.data.currentGame.userId] ==
        state.data.actualGame[Object.keys(data)[1]]
      ) {
        this.data.currentGame.myPlay = data[Object.keys(data)[1]].choice;
        this.data.history.myScore = data[Object.keys(data)[1]].score;
        this.data.history.botScore = data[Object.keys(data)[0]].score;
        this.data.currentGame.secondPlayer = data[Object.keys(data)[0]].choice;
        this.data.currentGame.opponentName = data[Object.keys(data)[0]].name;
      }
      console.log("Este es el current game miau:", this.data);
      if (window.location.href == FRONT_URL + "/desafio-final-five/joinGame") {
        Router.go("/desafio-final-five/waitingRoom");
      }

      if (
        data[Object.keys(data)[0]].online == true &&
        data[Object.keys(data)[1]].online == true
      ) {
        if (
          window.location.href ==
          FRONT_URL + "/desafio-final-five/pasarCodigoRoom"
        ) {
          this.data.actualGame = data;
          Router.go("/desafio-final-five/waitingRoom");
        }
      } else {
        window.alert("Esperando que Gojo le gane al Sukuna");
      }
      if (
        data[Object.keys(data)[0]].start == true &&
        data[Object.keys(data)[1]].start == true
      ) {
        if (
          window.location.href ==
          FRONT_URL + "/desafio-final-five/waitingRoom"
        ) {
          this.data.actualGame = data;
          Router.go("/desafio-final-five/game");
        }
      }
    });
  },
  async disconnectToGameRoom(longRoomId) {
    const roomRefOff = ref(
      database,
      "rooms/" + longRoomId + "/rooms/currentGame"
    );
    off(roomRefOff);
  },
  async checkPlayersReady(longRoomId) {
    await fetch(
      API_BASE_URL +
        "/gameRooms/" +
        longRoomId +
        "/start/" +
        this.data.currentGame.userId,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
  },
  async setMove(move) {
    //console.log("sendChoice por que es el sendChoice sith recibio: ", move);
    this.sendChoice(move);
    // const currentState = this.getState();
    // currentState.currentGame.myPlay = move;
    // this.setScore();
  },
  async sendChoice(choice) {
    await fetch(API_BASE_URL + "/sendChoice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        roomId: this.data.currentGame.longRoomId,
        userId: this.data.currentGame.userId,
        choice: choice,
      }),
    });
  },

  async setScore(result) {
    if (result == "win") {
      await fetch(API_BASE_URL + "/actualScore", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roomId: this.data.currentGame.longRoomId,
          userId: this.data.currentGame.userId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            Router.go("/desafio-final-five/results/");
          }, 2000);
        });
    } else if (result == "lose") {
      setTimeout(() => {
        Router.go("/desafio-final-five/results/");
      }, 2000);
    } else if (result == "tie") {
      setTimeout(() => {
        Router.go("/desafio-final-five/results/");
      }, 2000);
    }
  },

  restartGame() {
    const currentState = this.getState();
    currentState.currentGame.myPlay = "";
    currentState.currentGame.secondPlayer = "";
    this.setState(currentState);
  },

  whoWins(myPlay, secondPlayer) {
    const ganasteConPapel: boolean =
      myPlay == "papel" && secondPlayer == "piedra";
    const ganasteConTijera: boolean =
      myPlay == "tijera" && secondPlayer == "papel";
    const ganasteConPiedra: boolean =
      myPlay == "piedra" && secondPlayer == "tijera";
    const ganaste = [
      ganasteConPiedra,
      ganasteConPapel,
      ganasteConTijera,
    ].includes(true);

    const perdisteConPiedra: boolean =
      myPlay == "piedra" && secondPlayer == "papel";
    const perdisteConPapel: boolean =
      myPlay == "papel" && secondPlayer == "tijera";
    const perdisteConTijera: boolean =
      myPlay == "tijera" && secondPlayer == "piedra";
    const perdiste = [
      perdisteConPiedra,
      perdisteConPapel,
      perdisteConTijera,
    ].includes(true);

    if (ganaste == true) {
      this.data.currentGame.finalResult = "win";
      this.setScore("win");
    } else if (perdiste == true) {
      this.data.currentGame.finalResult = "lose";
      this.setScore("lose");
    } else {
      this.data.currentGame.finalResult = "tie";
      this.setScore("tie");
    }
  },

  savedData() {
    const currentHistory = this.getState();
    localStorage.setItem("data", JSON.stringify(currentHistory));
  },
};

export { state };
