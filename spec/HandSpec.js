describe('Hand', function() {
  var hand, card1, card2, card3, card4, card5, card6;

  beforeEach(function() {
    hand = new Hand();
    card1 = new Card({rank: 8, suit: 1});
    card2 = new Card({rank: 11, suit: 3});
    card3 = new Card({rank: 1, suit: 2});
    card4 = new Card({rank: 13, suit: 0});
    card5 = new Card({rank: 1, suit: 3});
    card6 = new Card({rank: 6, suit: 3});
  });

  it('should be able to add cards', function(){
    hand.addCard([card1]);
    expect(hand.length).to.equal(1);
    hand.addCard([card2, card3]);
    expect(hand.length).to.equal(3);
  });

  it('Be able to tally value', function(){
    hand.addCard([card1, card2, card4]);
    expect(hand.handValue()).to.equal(28); 
  });

  it('should know what value of ace to use', function(){
    hand.addCard([card1,card3]);
    expect(hand.handValue()).to.equal(19);
    hand.addCard([card5, card6]);
    expect(hand.handValue()).to.equal(16);
  });
});