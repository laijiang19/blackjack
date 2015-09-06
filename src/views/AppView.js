var AppView = Backbone.View.extend({
  templateString: '<div id = "table">' + 
  '<div class="dealer-hand-container"></div>' +
    '<div class="player-hand-container"></div>' +
    '<button class="hit-button">hit</button>' +
    '<button class="stand-button">stand</button>' +
    '<button class="playing-button">deal new hand</button>' +
    '<button class="bet-button">' +
    '<img id=minus src={{this.minus}}></img>' +
    '<div id=bet>{{this.bet}}</div>' +
    '<img id=plus src={{this.plus}}></img>' +
    '</button>' +
    '<button class="history-button">show history</button>' +
    '</div>', 

  initialize: function(){
    this.dealerView = new HandView({collection: this.model.get('dealerHand')});
    this.handView = new HandView({collection: this.model.get('playerHand')});
    this.bet = this.model.getBet();
    this.plus = "./img/up-arrow.png"; 
    this.minus = "./img/down-arrow.png"; 
    this.render();
    this.model.on('change:playing', function(){
      this.render();
    }, this);
  },

  id: 'app', 

  events: {
    'click .hit-button': function(){this.model.get('playerHand').hit();},
    'click .stand-button': function(){this.model.get('playerHand').stand();},
    'click .playing-button': function(){
      this.model.set('playing', true);
      this.model.newHand();
    }, 
    'click .bet-button #plus': function(){
      this.model.changeBet(1);
      this.bet = this.model.getBet();
      this.render();
    },
    'click .bet-button #minus': function(){
      this.model.changeBet(-1);
      this.bet = this.model.getBet();
      this.render();
    },
    'click .history-button': function(){
      this.model.toggleHistory();
    },
  },

  render: function(){
    this.$el.children().detach();
    this.$el.html(Handlebars.compile(this.templateString)(this));
    if (!this.model.get('playing')){
      this.$('.hit-button').hide();
      this.$('.stand-button').hide();
    }
    else {
      this.$('.playing-button').hide();
      this.$('.bet-button').hide();
      this.$('.history-button').hide();
    }
    this.$('.dealer-hand-container').html(this.dealerView.render());
    this.$('.player-hand-container').html(this.handView.render());
    
    return this.$el; 
  }

});

