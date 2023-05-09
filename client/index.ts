import { Router } from "@vaadin/router";
import "./router";
// import { initRouter } from "./router";
import { state } from "./state";

import "./pages/home";
import "./pages/signIn";
import "./pages/welcome";
import "./pages/instructions";
import "./pages/game";
import "./pages/results";
import "./pages/pasarCodigoRooom";
import "./components/button-start";
import "./components/move/hands";
import "./pages/waitingRoom";
(function () {
  Router.go("/");
  state.getStorage();
})();
