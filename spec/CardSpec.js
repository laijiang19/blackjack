
describe('Card', function() {
  var app, card;

  beforeEach(function() {
    card = new Card({rank: 12, suit: 2});
  });

  it('should be Clubs', function(){
    var suitName = card.get('suitName');
    expect(suitName).to.equal('Clubs');
  });

  it('should be Queen with a value of 10', function(){
    expect(card.get('rankName')).to.equal('Queen');
    expect(card.get('value')).to.equal(10);
  });

  it('should flip successfully', function(){
    expect(card.get('revealed')).to.equal(true);
    card.flip();
    expect(card.get('revealed')).to.equal(false);
  });

});