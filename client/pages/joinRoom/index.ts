import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "initjoinroom-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();

      let formEl = this.shadow.querySelector(".form-ingresar-sala");
      console.log("El form:", formEl);
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const objeto = Object.fromEntries(formData.entries());
        console.log(formData);
        console.log("Este es el obejto:", objeto);
        state.askRTDBroom(objeto.inputName);
      });
    }
    render() {
      var style = document.createElement("style");

      style.innerHTML = `
      
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
        .inputs{
            width: calc(100% - 30px);
            min-height: 35px;
            margin-bottom: 20px;
            padding-left: 10px;
            font-size: 20px;
          }

        .btn-hover {
          font-size: 35px;
          padding: 10px 87px;
          margin: 0 auto;
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
       
       .btn-hover.color {
           background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
           box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
       } 
 
      }

        `;

      this.shadow.innerHTML = `
        <div class="container">
   
       <h1 class="title">Piedra Papel ó Tijera</h1>
       
       <form class="form-ingresar-sala">
       <h1 class="title"> Ingrese el código </h1>
       <input style="--i:1" placeholder="ID"class="inputs input-name" type="text" name="inputName"  required/>
       <button class="root btn-hover color">Unirse a la sala</button>
       </form>

       <div class="container-hands">
       <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
       <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
       <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
       
       </div>
   
       </div>
        `;
      this.shadow.appendChild(style);
    }
  }
);
