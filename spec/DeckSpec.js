describe('Deck', function() {
  var deck;

  beforeEach(function() {
    deck = new Deck();
  });

  it('should include 52 cards', function(){
    expect(deck.length).to.equal(52);
  });
  it('should have 13 spades', function(){
    var count = 0; 
    for(var i = 0; i < deck.length; i++){
      if(deck.at(i).get('suitName') === "Spades"){
        count++; 
      }
    }
    expect(count).to.equal(13);
  });

  it('should deal a card', function(){
    var results = deck.deal([true,false]); 
    expect(results[0].constructor).to.equal(Card);
    expect(results[0].get('revealed')).to.equal(true); 
    expect(deck.length).to.equal(50);
  });

  it('should deal a card if no paramaters are passed', function(){
    var results = deck.deal();
    console.log(results); 
    expect(results[0].constructor).to.equal(Card); 
    expect(deck.length).to.equal(51);
  });

  it('should deal a card', function(){
    var card = deck.deal()[0];
    deck.newDeck(); 
    expect(card).to.not.equal(deck.deal()[0]);
  });
});