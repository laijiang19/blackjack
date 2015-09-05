var Hand = Backbone.Collection.extend({
  
  model: Card,

  initialize: function(){
    this.handInitialize();
  },
  
  handInitialize: function(){
    this.reset();  
    this.doge = true;  
    // maybe hand has some other variables
  },

  hit: function(){
    this.trigger('hit', this);
  },

  stand: function(){

  },

  handValue: function(){
    var value = 0;
    var aceCnt = 0;

    for (var i = 0; i < this.length; i++){
      value += this.at(i).get('value');
      if (this.at(i).get('value') === 11){
        aceCnt++;
      }
    }

    while (value > 21 && aceCnt > 0){
      aceCnt--;
      value -= 10;
    }

    return value;
  },

  checkForBust: function(){

  },

  addCard: function(cards){
    for (var i = 0; i < cards.length; i++){
      this.push(cards[i]);
    }
  }
});





/*
class window.Hand extends Backbone.Collection
  model: Card

  initialize: (array, @deck, @isDealer) ->

  hit: ->
    @add(@deck.pop())

  hasAce: -> @reduce (memo, card) ->
    memo or card.get('value') is 1
  , 0

  minScore: -> @reduce (score, card) ->
    score + if card.get 'revealed' then card.get 'value' else 0
  , 0

  scores: ->
    # The scores are an array of potential scores.
    # Usually, that array contains one element. That is the only score.
    # when there is an ace, it offers you two scores - the original score, and score + 10.
    [@minScore(), @minScore() + 10 * @hasAce()]
*/

