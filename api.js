// Create and setup output elements
var RW_outputElement = document.createElement("span");
var RW_outputAckElement = document.createElement("span");
RW_outputElement.classList.add("recipewizardhidden");
RW_outputAckElement.classList.add("recipewizardhidden");
RW_outputElement.id = "RW_output";
RW_outputAckElement.id = "RW_outputAck";
document.body.appendChild(RW_outputElement);
document.body.appendChild(RW_outputAckElement);

// Add stylesheet
document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="css.css">')

// Firebase configuration for access to the Cloud Firestore database
const RW_firebaseConfig = {
	apiKey: "AIzaSyCJrzuFHQTTjQqs1nYqvSvT9pRWYkl3BKc",
	authDomain: "mc-hub-gc.firebaseapp.com",
	projectId: "mc-hub-gc",
	storageBucket: "mc-hub-gc.appspot.com",
	messagingSenderId: "511189266377",
	appId: "1:511189266377:web:1bf960a1eb8e98aceb8218",
	measurementId: "G-4VSVC65DWD"
};

// Initialise Firebase
firebase.initializeApp(RW_firebaseConfig);
var RW_db = firebase.firestore();

// Define and append to a list of craftable Minecraft items
var RW_items = [];
RW_db.collection("Crafting").get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		RW_items.push(doc.id);
	});
});

// Define class for Crafting Table Recipe
class RW_CT_Recipe {
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
var RW_converter = {
	fromFirestore: function(snapshot, options){
		const data = snapshot.data(options);
		return new RW_CT_Recipe(data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9, data.itemName);
	}
}

// Check user-submitted CT_Recipe with all records on database
function RW_getRecipeOutput(RW_inputRecipe, returnID) {
	var RW_currentItem;
	for (var i = 0; i < RW_items.length; i = i+1) {
		RW_currentItem = RW_items[i];
		RW_db.collection("Crafting").doc(RW_currentItem)
		.withConverter(RW_converter)
		.get().then(function(doc) {
			var RW_onDB = doc.data();
			var RW_tempData = RW_inputRecipe.getCT_Slots();
			var RW_onDBdata = RW_onDB.getCT_Slots();
			if (RW_tempData === RW_onDBdata) {
				if (!returnID) {
					RW_outputElement.innerHTML = RW_onDB.toString();
					if (typeof RW_callback == 'function') {
						RW_callback(RW_onDB.toString());
					}
				} else {
					RW_outputElement.innerHTML = doc.id;
					if (typeof RW_callback == 'function') {
						RW_callback(doc.id);
					}
				}
				RW_outputAckElement.innerHTML = "true";
			}
		}).catch(function(error) {
			console.error("Recipe Wizard encountered an error:", error);
		});
	}
}

//
function craft(s1, s2, s3, s4, s5, s6, s7, s8, s9, returnID, RW_printConsole) {
	RW_outputAckElement.innerHTML = "false";
	RW_outputElement.innerHTML = "";
	if (RW_printConsole) {
		console.log("Returning recipe for: " + s1 + ", " + s2 + ", " + s3 + ", " + s4 + ", " + s5 + ", " + s6 + ", " + s7 + ", " + s8 + ", " + s9);
	}
	RW_getRecipeOutput(new RW_CT_Recipe(s1, s2, s3, s4, s5, s6, s7, s8, s9), returnID);
}