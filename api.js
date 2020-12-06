// Create and setup output elements
var outputElement = document.createElement("span");
var outputAckElement = document.createElement("span");
outputElement.classList.add("recipewizardhidden");
outputAckElement.classList.add("recipewizardhidden");
outputElement.id = "recipeOutput";
outputAckElement.id = "recipeOutputAck";
document.body.appendChild(outputElement);
document.body.appendChild(outputAckElement);

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
class CT_Recipe {
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
    getCT_Slots() {
        return this.s1 + ', ' + this.s2 + ', ' + this.s3 + ', ' + this.s4 + ', ' + this.s5 + ', ' + this.s6+ ', ' + this.s7 + ', ' + this.s8 + ', ' + this.s9;
    }
    // Return the item name, for pre-defined recipes
    toString() {
        return this.itemName;
    }
}

// Class converter for Firestore
var converter = {
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new CT_Recipe(data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9, data.itemName);
    }
}

// Check user-submitted CT_Recipe with all records on database
function getRecipeOutput(inputRecipe) {
    var currentItem;
    for (var i = 0; i < items.length; i = i+1) {
        currentItem = items[i];
        db.collection("RecIpe WIzard Crafting").doc(currentItem)
        .withConverter(converter)
        .get().then(function(doc) {
            var onDB = doc.data();
            var tempData = inputRecipe.getCT_Slots();
            var onDBdata = onDB.getCT_Slots();
            if (tempData === onDBdata) {
                var output = document.getElementById("recipeOutput");
                var outputAck = document.getElementById("recipeOutputAck");
                output.innerHTML = onDB.toString();
                outputAck.innerHTML = "true";
            }
        });
    }
}

// 
function craft(s1, s2, s3, s4, s5, s6, s7, s8, s9, printConsole) {
    outputAckElement.innerHTML = "false";
    if (printConsole) {
        console.log("Returning recipe for: " + s1 + ", " + s2 + ", " + s3 + ", " + s4 + ", " + s5 + ", " + s6 + ", " + s7 + ", " + s8 + ", " + s9);
    }
    getRecipeOutput(new CT_Recipe(s1, s2, s3, s4, s5, s6, s7, s8, s9));
}