import "./pages/welcome";
import "./pages/instructions";
import "./pages/game";
import "./pages/results";
import "./pages/home/index";
import "./pages/singUp";
import "./pages/signIn";
import "./pages/joinRoom";
import "./pages/pasarCodigoRooom";
import "./pages/waitingRoom";

import { Router } from "@vaadin/router";

// export function initRouter(container: Element) {
//   const routes = [
//     {
//       path: /\/desafio-final-five/,
//       component: initHomePage,
//     },
//     {
//       path: /\/desafio-final-five\/signUp/,
//       component: initSignUpPage,
//     },
//     {
//       path: /\/desafio-final-five\/signIn/,
//       component: initSignInPage,
//     },

//     {
//       path: /\/desafio-final-five\/welcome/,
//       component: initWelcomePage,
//     },
//     {
//       path: /\/desafio-final-five\/instructions/,
//       component: initInstructionsPage,
//     },
//     {
//       path: /\/desafio-final-five\/game/,
//       component: initGame,
//     },
//     {
//       path: /\/desafio-final-five\/results/,
//       component: initResults,
//     },
//   ];

//   function goTo(path) {
//     history.pushState({}, "", path);
//     handleRoute(path);
//   }

//   function handleRoute(route) {
//     for (const r of routes) {
//       if (r.path.test(route)) {
//         const el = r.component({ goTo: goTo });
//         if (container.firstChild) {
//           container.firstChild.remove();
//         }

//         container.appendChild(el);
//       }
//     }
//   }

//   if (location.host.includes("github.io") || "/") {
//     goTo("/desafio-final-five/");
//   } else {
//     handleRoute(location.pathname);
//   }

//   window.onpopstate = function () {
//     handleRoute(location.pathname);
//   };
// }

// export async function goTo(path, container?) {
//   history.pushState({}, "", path);
//   handleRoute(path, container); // its not a function
// }
// export async function handleRoute(path, container?) {
//   for (const r of routes) {
//     if (r.path.test(path)) {
//       const el = r.component({ goTo: goTo });
//       if (container.firstChild) {
//         container.firstChild.remove();
//       }
//       container.appendChild(el);
//     }
//   }
//   if (location.host.includes("github.io") || "/") {
//     goTo("/desafio-final-five/");
//   } else {
//     handleRoute(location.pathname);
//   }

//   window.onpopstate = function () {
//     handleRoute(location.pathname);
//   };
// }
const router = new Router(document.querySelector(".root"));
router.setRoutes([
  {
    path: "/",
    component: "inithomepage-comp",
  },
  {
    path: "/desafio-final-five/home",
    component: "inithomepage-comp",
  },
  {
    path: "/desafio-final-five/signUp",
    component: "initsignuppage-comp",
  },
  {
    path: "/desafio-final-five/signIn/",
    component: "initsigninpage-comp",
  },
  ////////////////////////////////////////////////////////
  {
    path: "/desafio-final-five/welcome",
    component: "initwelcomepage-comp",
  },
  {
    path: "/desafio-final-five/joinGame",
    component: "initjoinroom-comp",
  },
  {
    path: "/desafio-final-five/pasarCodigoRoom",
    component: "initcodigoroom-comp",
  },
  {
    path: "/desafio-final-five/waitingRoom",
    component: "initwaitingroom-comp",
  },
  {
    path: "/desafio-final-five/instructions",
    component: "initinstructionspage-comp",
  },
  {
    path: "/desafio-final-five/game",
    component: "initgame-comp",
  },
  {
    path: "/desafio-final-five/results/",
    component: "initresults-comp",
  },
]);
