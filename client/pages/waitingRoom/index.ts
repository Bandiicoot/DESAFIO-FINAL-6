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


    /*=========*/


     body{
      font-family: 'Montserrat', sans-serif;
    font-weight: 800;
      background-color: #FFF;
      color: #00b8de;
  }
  /* ======================== */
  .loaderContainer{   
   // display: grid;
    //  place-content: center;
      height: 100px;
  }
  .cargando{
      width: 120px;
      height: 85px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
    margin: 0 auto; 
  }
  .texto-cargando{ 
    padding-top:20px
  }
  .cargando span{
      font-size: 20px;
      text-transform: uppercase;
  }
  .pelotas {
      width: 30px;
      height: 30px;
      background-color: #00b8de;
      animation: salto .5s alternate
      infinite;
    border-radius: 50%  
  }
  .pelotas:nth-child(2) {
      animation-delay: .18s;
  }
  .pelotas:nth-child(3) {
      animation-delay: .37s;
  }
  @keyframes salto {
      from {
          transform: scaleX(1.25);
      }
      to{
          transform: 
          translateY(-50px) scaleX(1);
      }
  }



        `;

      this.shadow.innerHTML = `
        <div class="container">
        
        
        <h1 class="title">Piedra Papel ó Tijeras</h1>
        <h3 class ="texto"> Cuando ambos jugadores pongan "listo" arraaaanca el partido </h3>
        <button class="btn-hover root color botonListo">Estoy listo</button>
          
     
         <div display="none" class="cargando" id="cargando">
           <div class="pelotas"></div>
           <div class="pelotas"></div>
           <div class="pelotas"></div>
      </div>
  
    
        <button-start class="button volver">Volver</button-start>

        <div class="container-hands">
        <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
        
        </div>
        
        </div>`;
      this.shadow.appendChild(style);

      const juanjoCagando = this.shadow.querySelector(".cargando");

      const buttonListoEl = this.shadow.querySelector(".botonListo");
      buttonListoEl.addEventListener("click", () => {
        console.log("Estoy tocando el boton listo");
        buttonListoEl.textContent = "Esperando";
        juanjoCagando.removeAttribute("display");
      });

      const goBackButtonEl = this.shadow.querySelector(".volver");

      goBackButtonEl.addEventListener("click", () => {
        Router.go("/desafio-final-five/welcome");
      });
    }
  }
);
