import { Router } from "@vaadin/router";
import "../../router";
import { state } from "../../state";

customElements.define(
  "initsigninpage-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      const formEl: any = this.shadow.querySelector(
        ".form-signin"
      ) as HTMLFormElement;
      console.log(formEl);
      formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const dataObject = Object.fromEntries(formData.entries());
        console.log("Esto es la data:", dataObject);

        // const registrito = state.signup(dataObject) as any;
        state.signIn(dataObject);
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
      .rootcion{
        font-size: 35px;
         padding: 10px 87px;
    
       margin: 0 auto;
     }

     .btnHover {
       width:auto !important;
   
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



  
      `;
      this.shadow.innerHTML = `
    <div class="container">

    <h1 class="title">Piedra Papel ó Tijera</h1>
    <form class="form-signin">
    <label for="inputEmail" class="labels">Email</label>
    <input class="inputs input-email" type="email" name="inputEmail" required/>

    <label for="inputPassword" class="labels">Contraseña</label>
    <input class="inputs "input-password type="password" name="inputPassword" required/>
    <button class=" rootcion btnHover btn-hover color">Iniciar sesión</button>
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
