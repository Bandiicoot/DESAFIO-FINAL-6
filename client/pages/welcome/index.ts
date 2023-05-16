import { Router } from "@vaadin/router";
import "../../router";
import { state } from "../../state";

customElements.define(
  "initwelcomepage-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

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
       <button-start class="button">Crear sala</button-start>
       <button-start class="buttonNewSala button">Unirse a una sala</button-start>
       <button-start class="button buttonCerrarSesion"> Cerrar sesión</button-start>
       <div class="container-hands">
   
       <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
       <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
       <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
       
       </div>
   
       </div>
        `;
      this.shadow.appendChild(style);

      const buttonEl: any = this.shadow.querySelector(".button");
      buttonEl.addEventListener("click", () => {
        var userName = state.data.currentGame.userName;
        var userId = state.data.currentGame.userId;
        state.createRoom(userId, userName);
      });

      const buttonNewSala: any = this.shadow.querySelector(".buttonNewSala");
      buttonNewSala.addEventListener("click", () => {
        Router.go("/desafio-final-five/joinGame");
      });

      const buttonCerrarSesion: any = this.shadow.querySelector(
        ".buttonCerrarSesion"
      );
      buttonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("data");
        Router.go("/desafio-final-five/home");
      });
    }
  }
);

// export function initWelcomePage(params) {
//   const div = document.createElement("div");
//   const style = document.createElement("style");

//   style.innerHTML = `
//   *{
//     caret-color: transparent;
//   }
//     .container{
//        display:flex;
//        flex-direction: column;
//        justify-content:space-between;
//         max-width: 500px;
//         margin: 0 auto;
//         height: 100vh;
//     }
//     .title{
//         font-family: "dosis";
//         font-size: 100px;
//         color: #009048;
//         text-align: center;
//     }

//     @media (min-width: 769px){
//     .title{
//          margin-top: 10%;
//          margin-bottom: 5%;
//     }}
//     .button{
//         margin-left: 10%;
//     }
//     @media (min-width: 769px) {
//     .button{
//         margin-left: 60px;
//     }}

//     .container-hands{
//         display: flex;
//         justify-content: space-between;
//         position:relative ;
//         max-width: 100%;

//     }

//     `;

//   div.innerHTML = `
//     <div class="container">

//     <h1 class="title">Piedra Papel ó Tijera</h1>
//     <button-start class="button">Crer una nueva sala</button-start>
//     <button-start class="buttonNewSala button">Ingresar a una sala</button-start>
//     <div class="container-hands">

//     <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
//     <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
//     <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>

//     </div>

//     </div>
//     `;

//   div.appendChild(style);
//   return div;
// }
