"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.baseDeDatos = void 0;
var firebase_admin_1 = require("firebase-admin");
var serviceAccount = require("../key.json"); //Acordate que Axel es Boiviano
// console.log(admin);
// console.log(serviceAccount);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://m6-cap3-default-rtdb.firebaseio.com",
});
var baseDeDatos = firebase_admin_1.default.firestore();
exports.baseDeDatos = baseDeDatos;
var rtdb = firebase_admin_1.default.database();
exports.rtdb = rtdb;
