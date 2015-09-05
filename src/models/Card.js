var Card = Backbone.Model.extend({
  initialize: function(params){
    this.set('revealed', true);
    var tValue = params.rank > 10 ? 10 : params.rank; 
    if(tValue === 1){
      tValue = 11; 
    }
    this.set('value', tValue); 
    this.set('suitName', ['Spades', 'Diamonds', 'Clubs', 'Hearts'][params.suit]);
    var tRankName = ''; 
    switch (params.rank){
      case 1:
      tRankName = 'Ace';
      break;

      case 11:
      tRankName = 'Jack'; 
      break;

      case 12:
      tRankName = 'Queen';
      break;

      case 13:
      tRankName = 'King';
      break;

      default:
      tRankName = params.rank;
    }
    this.set('rankName', tRankName); 
  },

  flip: function(){
    this.set('revealed', !this.get('revealed'));
  }
});