import { Router } from "@vaadin/router";
import "../../router";
import { state } from "../../state";

customElements.define(
  "initcodigoroom-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      state.connectToGameRoom(state.data.currentGame.longRoomId);
    }

    render() {
      var style = document.createElement("style");

      style.innerHTML = `
      *{
        caret-color: transparent;
      }
          .container{
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-top:-40px;
              align-items: center;
              max-width:800px;
              margin:0 auto;
          }
          .instructions{
              font-family: "odibee sans";
              font-size: 60px;
              color: #000000;
              text-align: center;
              max-width: 80%;
          }
          .container-hands{
              display: flex;
              justify-content: space-between;
              position: relative;
              top: 100px;
              margin: 0px 60px;
              width: 80%;
              }
      `;

      this.shadow.innerHTML = `
      <div class="container">
  
      <p class="instructions">Enviale este codigo a tu contrincante</p>
      <h1 class="main-title">${state.data.currentGame.shortRoomId}</h1>
     
  
      <div class="container-hands">
  
      <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
      <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
      <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
  
      </div>
  
      </div>
      `;
      this.shadow.appendChild(style);

      // const buttonEl: any = this.shadow.querySelector(".button");
      // buttonEl.addEventListener("click", () => {
      //   Router.go("/desafio-final-five/waitingRoom");
      //   // Mandar a sala de espera
      // });
    }
  }
);
