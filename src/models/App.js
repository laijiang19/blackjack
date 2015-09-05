var App = Backbone.Model.extend({

  initialize: function(){
    this.set('deck', new Deck());
    this.set('playerHand', new Hand());
    console.log(this.get('playerHand'));
    // tells deck to deal two cards
    this.set('dealerHand', new DealerHand());
    // tells deck to deal two cards

    this.get('dealerHand').on('roundOver', this.roundOver, this);

    this.get('playerHand').on('hit', this.hit, this);
    this.get('dealerHand').on('hit', this.hit, this);

  },

  hit: function(hand){
    hand.push(this.get('deck').deal([true]));
  },
  
  roundOver: function(hand){
    if(this.get('playerHand').roundOver && this.get('dealerHand').roundOver){
      this.newHand(); 
    }
  },

  newHand: function(){
    this.get('playerHand').initialize();
    //tells deck to deal two cards
  }
});

//  
//


/*
# TODO: Refactor this model to use an internal Game Model instead
# of containing the game logic directly.
class window.App extends Backbone.Model
  initialize: ->
    @set 'deck', deck = new Deck()
    @set 'playerHand', deck.dealPlayer()
    @set 'dealerHand', deck.dealDealer()
*/