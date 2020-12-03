class CraftingTable {
    constructor (s1, s2, s3, s4, s5, s6, s7, s8, s9) {
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
        this.s5 = s5;
        this.s6 = s6;
        this.s7 = s7;
        this.s8 = s8;
        this.s9 = s9;
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
            s9: ct.s9
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new CraftingTable(data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9)
    }
}

db.collection("RecIpe WIzard Crafting").doc("acacia_boat")
  .withConverter(converter)
  .get().then(function(doc) {
    if (doc.exists){
      var onDB = doc.data();
      if (temp === onDB) {
          console.log(onDB);
      }
    } else {
      console.log("No such document!")
    }}).catch(function(error) {
      console.log("Error getting document:", error)
    });

function getCraftingRecipe(s1, s2, s3, s4, s5, s6, s7, s8, s9, printConsole) {
    var result;
    if (printConsole) {
        console.log("Returning recipe for: " + s1 + " " + s2 + " " + s3 + " " + s4 + " " + s5 + " " + s6 + " " + s7 + " " + s8 + " " + s9);
    }
    // code for returning recipe
    return(result);
}