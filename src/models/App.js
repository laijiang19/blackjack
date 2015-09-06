var App = Backbone.Model.extend({

  initialize: function(){
    this.set('deck', new Deck());
    this.set('dealerHand', new DealerHand());
    this.set('playerHand', new Hand());

    this.get('dealerHand').on('roundOver', this.roundOver, this);
    this.get('playerHand').on('hit', this.hit, this);
    this.get('dealerHand').on('hit', this.hit, this);
    this.get('dealerHand').listenForBust(this.get('playerHand')); 

    this.set('bankroll', 200); 
    this.set('bet', 1);
    this.set('playing', false);

    if (localStorage.history === undefined || localStorage.history === ''){
      localStorage.history = JSON.stringify([]);  //'[]'
    }

    this.set('history', []);

    this.dealBlanks(); 
  },

  hit: function(hand, array){
    var results = this.get('deck').deal(array); 
    hand.addCard(results); 
  },
  
  roundOver: function(){
    if(this.get('playerHand').length === 5 && !this.get('playerHand').busted){
      this.get('playerHand').changeBankroll(2); 
      }
    else{
      if(this.get('playerHand').busted){ //player busted
        //player loses
      }
      else {
        if(this.get('dealerHand').busted){ //dealer busted
          this.get('playerHand').changeBankroll(2); 
        }
        else {
          if(this.get('dealerHand').handValue() < this.get('playerHand').handValue()){ //player wins
            this.get('playerHand').changeBankroll(2); 
          }
          else { //player loses
          }
        }
      }
    }
    var cb = function(){
      this.set('playing', false); 
      this.dealBlanks();
    };
    this.storeRound();
    console.log(localStorage.history);
    setTimeout(cb.bind(this), 1000);
  },

  newHand: function(){
    console.log("new hand ---"); 
    this.set('playing', true); 
    this.get('deck').newDeck();
    this.get('playerHand').changeBankroll(-1); 
    this.get('dealerHand').newHand(); 
    this.get('playerHand').newHand();
    this.hit(this.get('dealerHand'),[false, true]);
    this.hit(this.get('playerHand'),[true, true]); 
  },

  dealBlanks: function(){
    this.get('dealerHand').reset(); 
    this.get('playerHand').reset(); 
    this.hit(this.get('dealerHand'),[false, false]);
    this.hit(this.get('playerHand'),[false, false]); 
  },

  changeBet: function(change){
    this.get('playerHand').changeBet(change); 
  },

  getBet: function(){
    return this.get('playerHand').bet;  
  },

  storeRound: function(){
    var temp = JSON.parse(localStorage.history);
    var obj = {
      'hand #' : temp.length, 
      'dealer hand': this.get('dealerHand').handValue(),
      'player hand': this.get('playerHand').handValue(),
      'bet': this.getBet(),
      'bankroll': this.get('playerHand').bankroll,
      'win/loss': this.get('playerHand').win
    };
    temp.push(obj);
    localStorage.history = JSON.stringify(temp);
  },

  getHistory: function(){
    return JSON.parse(localStorage.history);
  },

  toggleHistory: function(){
    this.trigger("toggleHistory"); 
  }
});