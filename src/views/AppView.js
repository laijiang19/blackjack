var AppView = Backbone.View.extend({
  template: _.template ('<button class="hit-button">Hit</button>' +
    '<button class="stand-button">Stand</button>' +
    '<div class="player-hand-container"></div>' +
    '<div class="dealer-hand-container"></div>'), 

  events: {
    //'click .hit-button': this.model.get('playerHand').hit(),
    //'click .stand-button': this.model.get('playerHand').stand()
  },

  initialize: function(){
    console.log(this.model);
    this.render();
    // this.handView = new HandView({colleciton: this.model.get('playerHand')});
    // this.dealerView = new DealerView({colleciton: this.model.get('dealerHand')});
  },

  render: function(){
    this.$el.children().detach();
    this.$el.html(this.template);
    // this.$('.player-hand-container').html(this.handView.render());
    // this.$('.dealer-hand-container').html(this.dealerView.render());
    return this.$el; 
  }

});

