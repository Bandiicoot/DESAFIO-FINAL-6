"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("NYMARU CHI NYMARU ÑO NYMARU WOWOWOWOWO");
var db_1 = require("./db");
var uuid_1 = require("uuid");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var userCollection = db_1.baseDeDatos.collection("users");
var roomCollection = db_1.baseDeDatos.collection("rooms");
app.use(bodyParser.json());
app.use(express.json());
app.listen(port, function () {
    console.log("listening on port " + port + "AXELOIDE");
});
// SE CREA AXEL DIVIDIO EN LOS POUST Y LOS GET Y LOS POUST Y ASI OSEA SON DOS COMENTARIOS
app.post("/signup", function (req, res) {
    var _a = req.body, email = _a.email, name = _a.name, password = _a.password;
    console.log(email, name, password +
        "IO SOY FRANCHESCO VIRGULINIIII FIAAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    userCollection
        .where("email", "==", email)
        .get()
        .then(function (searchResponse) {
        if (searchResponse.empty) {
            userCollection
                .add({
                email: email,
                name: name,
                password: password,
            })
                .then(function (newUserRef) {
                res.status(201).json({ id: newUserRef.id, new: true });
            });
        }
        else {
            res.status(400).json({
                id: searchResponse.docs[0].id,
                message: "Email ya ingresado!",
            });
        }
    });
});
// AUTORIZACION
app.post("/auth", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    userCollection
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then(function (serchResponse) {
        if (serchResponse.empty) {
            res.status(404).json({ message: "Not found!" });
        }
        else {
            res.status(200).json({
                id: serchResponse.docs[0].id,
                name: serchResponse.docs[0].get("name"),
            });
        }
    });
});
app.post("/createGameRoom", function (req, res) {
    var userId = req.body.userId;
    userCollection
        .doc(userId.toString())
        .get()
        .then(function (doc) {
        var _a;
        if (doc.exists) {
            var roomRef_1 = db_1.rtdb.ref("/rooms/" + (0, uuid_1.v4)());
            roomRef_1
                .set({
                rooms: {
                    currentGame: (_a = {},
                        _a[userId] = {
                            choice: "",
                            name: "",
                            online: false,
                            start: false,
                            score: 0,
                        },
                        _a.secondPlayer = {
                            choice: "",
                            name: "",
                            online: false,
                            start: false,
                            score: 0,
                        },
                        _a),
                },
            })
                .then(function () {
                var roomLongId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                roomCollection
                    .doc(roomId.toString())
                    .set({
                    rtdbRoomId: roomLongId,
                })
                    .then(function () {
                    res.status(200).json({ id: roomId.toString() });
                });
            });
        }
        else {
            res.status(400).json({ MESSAGE: "Quien sos capo?" });
        }
    });
});
app.post("/actualScore", function (req, res) {
    var _a = req.body, roomId = _a.roomId, userId = _a.userId;
    var roomRef = db_1.rtdb.ref("/rooms/".concat(roomId));
    roomRef.get().then(function (roomSnap) {
        var roomSnapData = roomSnap.val();
        roomSnapData.rooms.currentGame[userId].score++;
        roomRef.update(roomSnapData);
    });
    res.json("PEACHES PEACHES PEACHES");
});
app.get("/getRtdbRoomId/:roomId", function (req, res) {
    var roomId = req.params.roomId;
    var roomRef = roomCollection.doc(roomId);
    roomRef.get().then(function (snap) {
        if (snap.exists) {
            res.json(snap.data());
        }
        else {
            res.status(404).send({ message: "La sala no existe CUCHASTE" });
        }
    });
});
// Axel es un dinosaurio que vive en nuestras mentes y cuando la game room ref nymaaaaaaaaaaaaaaaaaaaaaaru
app.patch("/gameRoomsChanges/", function (req, res) {
    var _a = req.body, roomId = _a.roomId, userId = _a.userId, userName = _a.userName, userStatus = _a.userStatus;
    var roomRef = db_1.rtdb.ref("/rooms/".concat(roomId));
    roomRef.get().then(function (currentGameSnap) {
        var _a;
        var currentGameSnapData = currentGameSnap.val();
        console.log(currentGameSnapData);
        // currentGameSnapData.userId.name = name;
        if (currentGameSnapData.rooms.currentGame.secondPlayer) {
            Object.assign(currentGameSnapData.rooms.currentGame, (_a = {},
                _a[userId] = {
                    choice: "",
                    name: userName,
                    online: userStatus,
                    start: false,
                    score: 0,
                },
                _a));
            delete currentGameSnapData.rooms.currentGame.secondPlayer;
        }
        else if (currentGameSnapData.rooms.currentGame[userId]) {
            currentGameSnapData.rooms.currentGame[userId].online = userStatus;
        }
        var currentGameUpdated = currentGameSnapData;
        roomRef.update(currentGameUpdated);
        res.json(currentGameUpdated);
    });
});
