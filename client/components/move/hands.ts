const hands = {
  piedra: require("url:../../images/piedra.png"),
  papel: require("url:../../images/papel.png"),
  tijera: require("url:../../images/tijeras.png"),
};

class Movimientos extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }
  render() {
    const div = document.createElement("div");
    const style = document.createElement("style");
    const hand: any = this.getAttribute("hand");

    style.innerHTML = `
            .hand{
                height: 150px;
                width: 80px;
             
            }
            `;

    div.innerHTML = `
            <img class="hand" src=${hands[hand]}></img>
            `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("movimiento-de-manos", Movimientos);
