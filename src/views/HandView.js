var HandView = Backbone.View.extend({
  className: 'hand',

  templateString: 
    '<h2>' + 
      '{{#if this.collection.isDealer}}' +
        'DEALER' +
      '{{else}}' +
        'PLAYER' +
      '{{/if}}' +
      '    (<span class="score"></span>)' +
      '{{#unless this.collection.isDealer}}' +
        '<div id = bankroll>' + 
          '${{this.collection.bankroll}}' + 
        '</div>' +
      '{{/unless}}' +
    '</h2>',

  initialize: function(){
    this.collection.on('add remove change',this.render,this);
    this.render();  
  },

  render: function(){
    this.$el.children().detach(); 
    this.$el.html(Handlebars.compile(this.templateString)(this));
    this.$el.append(this.collection.map(function(card){
      return new CardView({model: card}).render();
    }));
    this.$('.score').text(this.collection.handValue());
    return this.$el; 
  }
});
