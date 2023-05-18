import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "initwaitingroom-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    opponentName: string;
    connectedCallback() {
      const currentState = state.getState();
      this.opponentName = currentState.r;
    }

    constructor() {
      super();
      this.render();
    }
    render() {
      var style = document.createElement("style");
      style.innerHTML = `
      *{
        caret-color: transparent;
      }
        .container{
           display:flex;
           flex-direction: column;
           justify-content:space-between;
            max-width: 500px;
            margin: 0 auto;
            height: 100vh;
        }
        .title{
            font-family: "dosis";
            font-size: 100px;
            color: #009048;
            text-align: center;
        }
    
        @media (min-width: 769px){
        .title{
             margin-top: 10%;
             margin-bottom: 5%;
        }}
        .button{
            margin-left: 10%;
        }
        @media (min-width: 769px) {
        .button{
            margin-left: 60px;
        }}
    
        .container-hands{
            display: flex;
            justify-content: space-between;
            position:relative ;
            max-width: 100%; 
        }
        `;

      this.shadow.innerHTML = `
        <div class="container">
        
        <h1 class="title">Piedra Papel ó Tijera</h1>
        <button-start class="button">Estoy listo</button-start>
        
        <div class="container-hands">
        <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
        
        </div>
        
        </div>`;
      this.shadow.appendChild(style);
    }
  }
);
