import { Router } from "@vaadin/router";
import "../../router";
// import { handleRoute } from "../../router";
import { state } from "../../state";

customElements.define(
  "initsignuppage-comp",
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
        
        .form-signin{
            height: 300px;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
        }
        .inputs{
          width: calc(100% - 30px);
          min-height: 35px;
          margin-bottom: 20px;
          padding-left: 10px;
          font-size: 20px;
        }
      
        }
        `;
      this.shadow.innerHTML = `
        <div class="container">
        <h1 class="title">Piedra Papel ó Tijera</h1>
        <form class="form-signin">
    
        <input style="--i:1" placeholder="Nombre"class="inputs input-name" type="text" name="inputName"  required/>
    
        <input style="--i:1" placeholder="Email"class="inputs input-email" type="email" name="inputEmail" required/>
    
        
        <input style="--i:10" placeholder="Contraseña"class="inputs "input-password type="password" name="inputPassword"/>  
        
        <button class="button">Registrarse</button>
        </form>
      
        <div class="container-hands">
    
        <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
        <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>
        
        </div>
    
        </div>
        `;
      this.shadow.appendChild(style);

      const formEl: any = this.shadow.querySelector(".form-signin");
      console.log(formEl);
      formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const dataObject = Object.fromEntries(formData.entries());
        console.log("Esto es la data:", dataObject);

        // const registrito = state.signup(dataObject) as any;
        state.signup(dataObject);
      });

      // const buttonEl: any = this.shadow.querySelector(".button");
      // buttonEl.addEventListener("click", () => {
      //   Router.go("/desafio-final-five/welcome");
      // });
    }
  }
);

// export function initSignUpPage(params) {
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

//     .form-signin{
//         height: 300px;
//         display: flex;
//         flex-direction: column;
//         margin: 0 auto;
//     }
//     .inputs{
// 			width: calc(100% - 30px);
// 			min-height: 35px;
// 			margin-bottom: 20px;
// 			padding-left: 10px;
// 			font-size: 20px;
// 		}

//     }

//     `;

//   div.innerHTML = `
//     <div class="container">
//     <h1 class="title">Piedra Papel ó Tijera</h1>
//     <form class="form-signin">

//     <input style="--i:1" placeholder="Nombre"class="inputs input-name" type="text" name="inputName"  required/>

//     <input style="--i:1" placeholder="Email"class="inputs input-email" type="email" name="inputEmail" required/>

//     <input style="--i:10" placeholder="Contraseña"class="inputs "input-password type="password" name="inputPassword"/>

//     <button class="button">Registrarse</button>
//     </form>

//     <div class="container-hands">

//     <div class="hand"><movimiento-de-manos hand="piedra"></movimiento-de-manos></div>
//     <div class="hand"><movimiento-de-manos hand="papel"></movimiento-de-manos></div>
//     <div class="hand"><movimiento-de-manos hand="tijera"></movimiento-de-manos></div>

//     </div>

//     </div>
//     `;

// .then(() => {
//   if (registrito === false) {
//     window.alert("El email ya esta en uso, por favor ingrese otro ");
//   } else if (registrito == true) {
//     window.alert("Cuenta creada!");
//     params.goTo("/desafio-final-five/welcome");
//   }
// });

// const buttonEl: any = div.querySelector(".button");
// buttonEl.addEventListener("click", () => {
//   params.goTo("/desafio-final-five/welcome");
//   // });

//   div.appendChild(style);
//   return div;
// }
