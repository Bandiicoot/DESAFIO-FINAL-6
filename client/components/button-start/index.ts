class ButtonStart extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const button = document.createElement("button");
    button.className = "root btn-hover color ";

    style.innerHTML = `
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
      
      .btn-hover.color {
          background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
          box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
      } 
}
        
        `;
    button.textContent = this.textContent;
    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}

customElements.define("button-start", ButtonStart);
