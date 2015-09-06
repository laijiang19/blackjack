var DealerHand = Hand.extend({

  initialize: function(params){
    this.checkForBust();
    this.newHand(); 
  },

  newHand: function(){
    this.reset();  
    this.busted = false;
    this.isDealer = true;
    this.playerCount = 1;
    this.readyCount = 0;
  },

  listenForBust : function(player){
    player.on('standOrBust', function(player, busted){
      this.readyCount++;
      if (this.readyCount === this.playerCount){
        this.readyCount = 0;
        if(!busted){
          this.reveal();
          setTimeout(this.drawMore.bind(this),1000); 
        }
        else{
          this.trigger('roundOver',false);
        }
      }
    }, this);
  },

  reveal: function(){
    this.each(function(element){
      element.set('revealed',true); 
    }); 
    //trigger in 2 seconds
  },

  drawMore: function(){
    if(this.handValue() < 17){
      this.hit(); 
      setTimeout(this.drawMore.bind(this),1000); 
    }
    else{
      var cb = function(){
        this.trigger('roundOver');
      };
      setTimeout(cb.bind(this), 1300);
    }
  }, 
  
  checkForBust: function(){
    this.on('add', function(){
      if(this.handValue() > 21) {
        console.log("I busted"); 
        this.busted = true; 
        this.trigger('standOrBust', this, true);
      }
    }, this);
  },
});
