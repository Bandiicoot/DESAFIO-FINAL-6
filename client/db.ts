import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, get } from "firebase/database";

const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.BACK_URL,
  //   projectId: "react-firebase-auth",
  //   storageBucket: "react-firebase-auth.appspot.com",
});

const database = getDatabase(app);

export { database, onValue, ref, get };
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount as any),
// //   databaseURL: "https://m6-cap3-default-rtdb.firebaseio.com",
// // });

// const baseDeDatos = admin.firestore();
// const rtdb = admin.database();
// export { baseDeDatos, rtdb };
