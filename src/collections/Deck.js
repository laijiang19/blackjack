var Deck = Backbone.Collection.extend({
  model: Card,

  //have an array of 52 cards
  //add that array, to the collection. 
  initialize: function(params){ // params may contain shuffle prop 
    this.newDeck();
  },

  newDeck: function(){
    this.reset();
    var holder = this; 
    _.shuffle(_.range(0, 52))
     .forEach(function(item){
        holder.add(new Card({
          rank: item % 13 + 1,
          suit: Math.floor(item / 13)
        })); 
    });
     console.log(this.length); 
     console.log("deck length ---"); 
  },  

  deal: function(array){
    var res = [];
    var holder = this;
    if (array === undefined) {
      res.push(this.pop());
      return res;
    }
    else {
      _.each(array, function(revealed){
        var temp = holder.pop();
        temp.set('revealed', revealed);
        res.push(temp);
      });
      return res;
    }
  }
  //hand.on('hit'func = hand.addCard(collection.pop))
});