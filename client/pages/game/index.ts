import { Router } from "@vaadin/router";
import "../../router";
import { state } from "../../state";

customElements.define(
  "initgame-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
    }

    render() {
      // const options = ["piedra", "papel", "tijera"];
      // const randomOption = Math.floor(Math.random() * options.length);
      // var botRandomPlay = options[randomOption];

      var counter = 3;

      const countdown = setInterval(() => {
        counter--;
        const counterEl: any = this.shadow.querySelector(".countdown");
        counterEl.textContent = String(counter);
        if (counter < 1) {
          clearInterval(countdown);
        }
      }, 1000);
      var style = document.createElement("style");
      style.innerHTML = `
      *{
        caret-color: transparent;
      }
        .container{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        overflow-y: hidden;
        }
    
        .bot-hands{
         display: none;
         transform: rotate(180deg);
         position: relative;
         top: -20px;
        }
    
        .countdown{
        font-family: 'Luckiest Guy', cursive;  
        font-size: 150px;
        margin-top: 150px;
        }
    
      @media (min-width: 769px) {
        .countdown{
          font-size: 250px;
        }}
    
        .container-hands{
        display: flex;
        position: relative;
        top: 20px;
        }
    
      .bot-paper, .bot-rock, .bot-scissor{
        padding: 0px 25px;	
      }
    
      @media (min-width: 769px) {
        .bot-paper, .bot-rock, .bot-scissor{
          padding: 0 150px;
        }}
    
        .handview{
          padding: 0px 25px;
        opacity: 0.5;
        cursor: pointer;
        }
    
      @media (min-width: 769px) {
        .handview{
          padding: 0 150px;
        }}
    
      .handview:hover{
        top: 0px;
        opacity: 1;
        display: inherit;
        transform: translateY(-30px);
        transition: all 1s;
      
        }
        .selected {
        position: absolut;
        opacity: 1;
        transform: translateY(-30px);
        transition: all 0.3s;
        }
        `;
      this.shadow.innerHTML = `
        <div class="container">
      
          <div class="bot-hands">
          <movimiento-de-manos hand="piedra" class="bot-rock"></movimiento-de-manos>
          <movimiento-de-manos hand="papel" class="bot-paper"></movimiento-de-manos>
          <movimiento-de-manos hand="tijera" class="bot-scissor"></movimiento-de-manos>
          </div>
      
        <div>
            <div class="countdown">${counter}</div>
        </div>
      
          <div class="container-hands">
          <movimiento-de-manos hand="piedra" class="handview rock"></movimiento-de-manos>
          <movimiento-de-manos hand="papel" class="handview paper"></movimiento-de-manos>
          <movimiento-de-manos hand="tijera" class="handview scissor"></movimiento-de-manos>
          </div>
      
          </div>
          `;
      this.shadow.appendChild(style);

      const handsCont: HTMLElement =
        this.shadow.querySelector(".container-hands");
      const rockEl: HTMLElement = this.shadow.querySelector(".rock");
      const paperEl: HTMLElement = this.shadow.querySelector(".paper");
      const scissorEl: HTMLElement = this.shadow.querySelector(".scissor");

      const botHandsStyles = document.createElement("style");

      function secondPlayerChoices(params) {
        if (params == "piedra") {
          botHandsStyles.innerHTML = `
              .bot-hands {display: inherit;}
              .bot-rock {display: inherit;}
              .bot-paper {display: none;}
              .bot-scissor {display: none;}
              .countdown {display: none;}

              `;
        } else if (params == "papel") {
          botHandsStyles.innerHTML = `
              .bot-hands {display: inherit;}
              .bot-rock {display: none;}
              .bot-paper {display: inherit;}
              .bot-scissor {display: none;}
              .countdown {display: none;}

              `;
        } else if (params == "tijera") {
          botHandsStyles.innerHTML = `
              .bot-hands {display: inherit;}
              .bot-rock {display: none;}
              .bot-paper {display: none;}
              .bot-scissor {display: inherit;}
              .countdown {display: none;}

              `;
        }
      }

      const currentState = state.getState();

      function playGame(hand) {
        if (hand == "piedra") {
          paperEl.style.display = "none";
          scissorEl.style.display = "none";
          handsCont.style.justifyContent = "center";
          rockEl.classList.remove(".handview");
          rockEl.classList.add("selected");
        } else if (hand == "papel") {
          rockEl.style.display = "none";
          scissorEl.style.display = "none";
          handsCont.style.justifyContent = "center";
          paperEl.classList.remove(".handview");
          paperEl.classList.add("selected");
        } else if (hand == "tijera") {
          paperEl.style.display = "none";
          rockEl.style.display = "none";
          handsCont.style.justifyContent = "center";
          scissorEl.classList.remove(".handview");
          scissorEl.classList.add("selected");
        }
      }

      for (const h of handsCont.children) {
        h.addEventListener("click", () => {
          const select = h.getAttribute("hand");

          if (select == "piedra") {
            state.setMove("piedra");
            setTimeout(() => {
              playGame("piedra");
            }, 4000);
          } else if (select == "papel") {
            state.setMove("papel");
            setTimeout(() => {
              playGame("papel");
            }, 4000);
          } else if (select == "tijera") {
            state.setMove("tijera");
            setTimeout(() => {
              playGame("tijera");
            }, 4000);
          }
        });
      }

      setTimeout(() => {
        console.log(
          "1er player",
          state.data.currentGame.myPlay,
          "secondP",
          state.data.currentGame.secondPlayer
        );
        if (
          state.data.currentGame.myPlay == "" ||
          state.data.currentGame.secondPlayer == " "
        ) {
          window.alert("Alguien no eligio");
          Router.go("/desafio-final-five/waitingRoom/");
        } else {
          secondPlayerChoices(state.data.currentGame.secondPlayer);
        }
      }, 4000);

      setTimeout(() => {
        if (
          state.data.currentGame.myPlay != "" &&
          state.data.currentGame.secondPlayer != ""
        ) {
          state.whoWins(
            state.data.currentGame.myPlay,
            state.data.currentGame.secondPlayer
          );
        }
      }, 4500);
      this.shadow.appendChild(botHandsStyles);
    }
  }
);
