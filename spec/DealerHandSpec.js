describe('Dealer Hand', function() {
  var dealHand, card1, card2, card3, card4, card5, card6;

  beforeEach(function() {
    dealHand = new DealerHand();
    card1 = new Card({rank: 8, suit: 1});
    card2 = new Card({rank: 11, suit: 3});
    card3 = new Card({rank: 1, suit: 2});
    card4 = new Card({rank: 13, suit: 0});
    card5 = new Card({rank: 1, suit: 3});
    card6 = new Card({rank: 6, suit: 3});
  });

  it('should be able to add cards', function(){
    expect(dealHand.doge).to.equal(true);
    dealHand.addCard([card1]);
    expect(dealHand.length).to.equal(1);
    dealHand.addCard([card2, card3]);
    expect(dealHand.length).to.equal(3);
  });

  it('Be able to tally value', function(){
    dealHand.addCard([card1, card2, card4]);
    expect(dealHand.handValue()).to.equal(28); 
  });

  it('should know what value of ace to use', function(){
    dealHand.addCard([card1,card3]);
    expect(dealHand.handValue()).to.equal(19);
    dealHand.addCard([card5, card6]);
    expect(dealHand.handValue()).to.equal(16);
  });
});