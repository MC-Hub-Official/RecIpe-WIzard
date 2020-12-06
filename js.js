// Create and setup output elements

var outputElement = document.createElement("span");
var outputAcknowledgementElement = document.createElement("span");
outputElement.classList.add("recipewizardhidden");
outputAcknowledgementElement.classList.add("recipewizardhidden");
outputElement.id = "recipeOutput";
outputAcknowledgementElement.id = "recipeOutputAcknowledgement";
document.body.appendChild(outputElement);
document.body.appendChild(outputAcknowledgementElement);

// Add stylesheet
document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="css.css">')

// Firebase configuration for access to the Cloud Firestore database
const firebaseConfig = {
    apiKey: "AIzaSyCJrzuFHQTTjQqs1nYqvSvT9pRWYkl3BKc",
    authDomain: "mc-hub-gc.firebaseapp.com",
    projectId: "mc-hub-gc",
    storageBucket: "mc-hub-gc.appspot.com",
    messagingSenderId: "511189266377",
    appId: "1:511189266377:web:1bf960a1eb8e98aceb8218",
    measurementId: "G-4VSVC65DWD"
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


// Define and append to a list of craftable Minecraft items
var items = [];
db.collection("RecIpe WIzard Crafting").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        items.push(doc.id);
    });
});

// Define class for Crafting Table Recipe
class Ctr {
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
    // Return the items per slot
    ctSlots() {
        return this.s1 + ', ' + this.s2 + ', ' + this.s3 + ', ' + this.s4 + ', ' + this.s5 + ', ' + this.s6+ ', ' + this.s7 + ', ' + this.s8 + ', ' + this.s9;
    }
    // Return the item name, for pre-defined recipes
    toString() {
        return this.itemName;
    }
}

// Class converter for Firestore
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
        return new Ctr(data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9, data.itemName);
    }
}

// Check user-submitted CTR with all records on database
function checkTempWithDB(temp) {
    var returnableResult, currentItem;
    for (var i = 0; i < items.length; i = i+1) {
        currentItem = items[i];
        db.collection("RecIpe WIzard Crafting").doc(currentItem)
        .withConverter(converter)
        .get().then(function(doc) {
            var onDB = doc.data();
            var tempData = temp.ctSlots();
            var onDBdata = onDB.ctSlots();
            if (tempData === onDBdata) {
                returnableResult = onDB.toString();
                var output = document.getElementById("recipeOutput");
                var outputAcknowledgement = document.getElementById("recipeOutputAcknowledgement");

                output.innerHTML = returnableResult;
                outputAcknowledgement.innerHTML = "true";
            }
        });
    }
}

// Create temp from user-submitted recipe
function craft(s1, s2, s3, s4, s5, s6, s7, s8, s9, printConsole) {
    outputAcknowledgementElement.innerHTML = "false";
    if (printConsole) {
        console.log("Returning recipe for: " + s1 + ", " + s2 + ", " + s3 + ", " + s4 + ", " + s5 + ", " + s6 + ", " + s7 + ", " + s8 + ", " + s9);
    }
    checkTempWithDB(new Ctr(s1, s2, s3, s4, s5, s6, s7, s8, s9));
}