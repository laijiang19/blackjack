var DealerHand = Hand.extend({

  initialize: function(){
    this.handInitialize(); 
    this.dealer = true;
    this.playerCount = 1;
    this.readyCount = 0;
  },

  listenForBust : function(player){
    player.on('standOrBust', function(){
      this.set('readyCount', this.get('readyCount') + 1);
      if (this.get('readyCount') === this.get('playerCount')){
        this.roundOver();
        this.set('readyCount', 0);
      }
    });
  },

  roundOver: function(){
    this.trigger('roundOver');
  }
});
