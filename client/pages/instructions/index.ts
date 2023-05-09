import { Router } from "@vaadin/router";
import "../../router";

customElements.define(
  "initinstructionspage-comp",
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
      
          <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
          <button-start class="button">¡Jugar!</button-start>
      
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
        Router.go("/desafio-final-five/game");
      });
    }
  }
);

// export function initInstructionsPage(params) {
//   const div = document.createElement("div");
//   const style = document.createElement("style");

//   style.innerHTML = `
// *{
//   caret-color: transparent;
// }
//     .container{
//         height: 100vh;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         margin-top:-40px;
//         align-items: center;
//         max-width:800px;
//         margin:0 auto;
//     }
//     .instructions{
//         font-family: "odibee sans";
//         font-size: 60px;
//         color: #000000;
//         text-align: center;
//         max-width: 80%;
//     }
//     .container-hands{
//         display: flex;
//         justify-content: space-between;
//         position: relative;
//         top: 100px;
//         margin: 0px 60px;
//         width: 80%;
//         }
//     `;

//   div.innerHTML = `
//     <div class="container">

//     <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
//     <button-start class="button">¡Jugar!</button-start>

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
