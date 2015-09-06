var HistoryView = Backbone.View.extend({

  id: 'history',

  //template: _.template('<%= rankName %> of <%= suitName %>'),
  templateString: 
    '<div id=histHeader>{{#each this.keys}}<div class=histHeader>{{this}}</div class=cell>{{/each}}</div>' +
    '<div id=histBody>{{#each this.obj}}<div class=histRow>{{#each this}}<div class=cell>{{this}}</div>{{/each}}</div>{{/each}}</div>',

  initialize: function(){
    this.render();
    this.model.on("toggleHistory",function(){
      this.render(); 
      this.$el.slideToggle(); 
    }, this); 
  },

  render: function(){
    this.obj = this.model.getHistory(); 
    if (this.obj != false){
      this.keys = Object.keys(this.obj[this.obj.length-1]);
      this.keys = _.map(this.keys, function(item){return item.toUpperCase();});
    }

    this.$el.children().detach();
    this.$el.html(Handlebars.compile(this.templateString)(this));
    return this.$el; 
  }
});
