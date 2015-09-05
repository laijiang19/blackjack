var Game = Backbone.Model.extend({
  initialize: function(){
    this.set('deck', new Deck());
    this.set('playerHand', new Hand());
    this.set('dealerHand', new Hand());

    this.get('playerHand').on('hit', hit);
  },
  
  hit: function(hand){
    
  }
});