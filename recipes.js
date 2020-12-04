var firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCJrzuFHQTTjQqs1nYqvSvT9pRWYkl3BKc",
    authDomain: "mc-hub-gc.firebaseapp.com",
    projectId: "mc-hub-gc",
    storageBucket: "mc-hub-gc.appspot.com",
    messagingSenderId: "511189266377",
    appId: "1:511189266377:web:1bf960a1eb8e98aceb8218",
    measurementId: "G-4VSVC65DWD"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const items = ["acacia_boat", "acacia_button", "acacia_door", "acacia_fence", "acacia_fence_gate", "acacia_planks", "acacia_pressure_plate"];

class CraftingTable {
    constructor (s1, s2, s3, s4, s5, s6, s7, s8, s9, itemName) {
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
        this.s5 = s5;
        this.s6 = s6;
        this.s7 = s7;
        this.s8 = s8;
        this.s9 = s9;
        this.itemName = itemName;
    }
    toString() {
        return this.s1 + ', ' + this.s2 + ', ' + this.s3 + ', ' + this.s4 + ', ' + this.s5 + ', ' + this.s6+ ', ' + this.s7 + ', ' + this.s8 + ', ' + this.s9;
    }
}

var converter = {
    toFirestore: function(ct) {
        return {
            s1: ct.s1,
            s2: ct.s2,
            s3: ct.s3,
            s4: ct.s4,
            s5: ct.s5,
            s6: ct.s6,
            s7: ct.s7,
            s8: ct.s8,
            s9: ct.s9,
            itemName: ct.itemName
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new CraftingTable(data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9)
    }
}

function checkTempWithDB(temp) {
    for (var i = 0; i < items.length; i++) {
        db.collection("RecIpe WIzard Crafting").doc("acacia_boat")
            .withConverter(converter)
            .get().then(function(doc) {
                if (doc.exists){
                var onDB = doc.data();
                if (temp === onDB) {
                    return onDB.itemName
                }
                } else {
                console.log("No such document!")
                }}).catch(function(error) {
                console.log("Error getting document:", error)
                });

    }
}

function craft(s1, s2, s3, s4, s5, s6, s7, s8, s9, printConsole) {
    var result;
    if (printConsole) {
        console.log("Returning recipe for: " + s1 + ", " + s2 + ", " + s3 + ", " + s4 + ", " + s5 + ", " + s6 + ", " + s7 + ", " + s8 + ", " + s9);
    }
    checkTempWithDB(new CraftingTable(s1, s2, s3, s4, s5, s6, s7, s8, s9));
    return(result);
}