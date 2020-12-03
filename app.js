const firebaseConfig = {
    apiKey: "AIzaSyCJrzuFHQTTjQqs1nYqvSvT9pRWYkl3BKc",
    authDomain: "mc-hub-gc.firebaseapp.com",
    projectId: "mc-hub-gc",
    storageBucket: "mc-hub-gc.appspot.com",
    messagingSenderId: "511189266377",
    appId: "1:511189266377:web:1bf960a1eb8e98aceb8218",
    measurementId: "G-4VSVC65DWD"
};

const firebase = require("firebase");
require("firebase/firestore");

var db = firebase.firestore();

firebase.initializeApp(firebaseConfig);

const acacia_boat_ref = firestore.doc("RecIpe WIzard Crafting/acacia_boat");
const acacia_button_ref = firestore.doc("RecIpe WIzard Crafting/acacia_button");