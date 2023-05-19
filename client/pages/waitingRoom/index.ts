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
        h3{
          color: #0249d6;
          margin: 0 auto;
          font-size: 2.5em;
          font-family: cursive;
          text-align: center;
        }

        .root{
          font-size: 35px;
         //  color: #D8FCFC;
         //  background-color: #006CFC;
         //  border: 10px solid #001997;
           padding: 10px 87px;
         //  cursor: pointer;
         //  border-radius:45%;
         margin: 0 auto;
       }

       .btn-hover {
         width:auto !important;
         // font-size: 16px;
         font-weight: 600;
         color: #fff;
         cursor: pointer;
         margin: 20px;
         height: 100px;
         text-align:center;
         border: none;
         background-size: 300% 100%;
     
         border-radius: 50px;
         moz-transition: all .4s ease-in-out;
         -o-transition: all .4s ease-in-out;
         -webkit-transition: all .4s ease-in-out;
         transition: all .4s ease-in-out;
     }
     
     .btn-hover:hover {
         background-position: 100% 0;
         moz-transition: all .4s ease-in-out;
         -o-transition: all .4s ease-in-out;
         -webkit-transition: all .4s ease-in-out;
         transition: all .4s ease-in-out;
     }
     
     .btn-hover:focus {
         outline: none;
     }
     
     .color {
         background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
         box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
     } 


.loader:before,
.loader:after,
.loader {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  margin: 8em auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.loader:before {
  left: -3.5em;
}
.loader:after {
  left: 3.5em;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #ffffff;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #FFF;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #ffffff;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #FFF;
  }
}







        `;

      this.shadow.innerHTML = `
        <div class="container">
        
        
        <h1 class="title">Piedra Papel ó Tijera</h1>
        <h3 class ="texto"> Cuando ambos jugadores pongan "listo" arraaaanca el partido </h3>
        <button class="btn-hover root color botonListo">Estoy listo<div class="loader" id="loader">...</div></button>
        <button-start class="button volver">Volver</button-start>

        <div class="container-hands">
        <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
        
        </div>
        
        </div>`;
      this.shadow.appendChild(style);

      const buttonListoEl = this.shadow.querySelector(".botonListo");
      buttonListoEl.addEventListener("click", () => {
        console.log("Estoy tocando el boton");
        buttonListoEl.textContent = "Esperando...";
      });
      const goBackButtonEl = this.shadow.querySelector(".volver");
      goBackButtonEl.addEventListener("click", () => {
        Router.go("/desafio-final-five/welcome");
      });
    }
  }
);
