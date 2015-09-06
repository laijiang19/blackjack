var Hand = Backbone.Collection.extend({
  
  model: Card,

  initialize: function(params){
    this.newHand(); 
    this.bankroll = 200; 
    this.bet = this.betArray[this.betIndex]; 
    this.checkForBust();
    this.win = "LOSS"; 
  },

  newHand: function(){
    this.reset();  
    this.busted = false;
    this.isDealer = false;
  },

  hit: function(){
    if(!this.busted){
      this.trigger('hit', this);
    }
  },

  stand: function(){ 
    this.trigger('standOrBust',this, false); 
  },

  handValue: function(){
    var value = 0;
    var aceCnt = 0;

    for (var i = 0; i < this.length; i++){
      if(this.at(i).get('revealed')){
        value += this.at(i).get('value');
        if (this.at(i).get('value') === 11){
          aceCnt++;
        }
      }
    }

    while (value > 21 && aceCnt > 0){
      aceCnt--;
      value -= 10;
    }

    return value;
  },

  checkForBust: function(){
    this.on('add', function(){
      console.log(this.length); 
      if(this.handValue() > 21) {
        console.log("I busted"); 
        this.busted = true; 
        this.trigger('standOrBust', this, true);
      }
      else if (this.length === 5){
        console.log(this);
        console.log("5 cards BOOM"); 
        this.trigger('standOrBust', this, true);
      }
    }, this);
  },

  addCard: function(cards){
    for (var i = 0; i < cards.length; i++){
      this.push(cards[i]);
    }
  },

  changeBankroll: function(betCo){
    if(betCo > 0 ){
      this.win = "WIN"; 
    }
    this.bankroll += this.bet * betCo; 
    console.log(this.bankroll); 
  },

  betArray: [1,2,3,4,5,10,15,20,25,50,75,100,150,200,250,300,350,400,450,500,750,1000,1250,1500,1750,2000,3000,4000,5000,10000],
  betIndex: 0,
  
  changeBet: function(change){
    this.betIndex += change;
    this.betIndex = Math.max(this.betIndex,0);
    this.betIndex = Math.min(this.betIndex, this.betArray.length -1); 
    this.bet = this.betArray[this.betIndex]; 
    while(this.bet > this.bankroll && this.betIndex > 0){
      this.betIndex--; 
      this.bet = this.betArray[this.betIndex]; 
    }
  }
});
