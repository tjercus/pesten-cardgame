System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Suit, Card, NullCard, Deck;
    return {
        setters:[],
        execute: function() {
            (function (Suit) {
                Suit[Suit["CLUBS"] = 0] = "CLUBS";
                Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
                Suit[Suit["HEARTS"] = 2] = "HEARTS";
                Suit[Suit["SPADES"] = 3] = "SPADES";
            })(Suit || (Suit = {}));
            exports_1("Suit", Suit);
            Card = (function () {
                function Card(suit, rank) {
                    this.suit = suit;
                    this.rank = rank;
                    //
                }
                Card.prototype.toString = function () {
                    return this.suit + " " + this.rank;
                };
                Card.prototype.canBeThrownOn = function (activeCard) {
                    return (this.suit === activeCard.suit || this.rank === activeCard.rank);
                };
                Card.prototype.equals = function (anotherCard) {
                    return (this.suit === anotherCard.suit && this.rank === anotherCard.rank);
                };
                return Card;
            })();
            exports_1("Card", Card);
            NullCard = (function (_super) {
                __extends(NullCard, _super);
                function NullCard() {
                    _super.call(this, null, null);
                }
                NullCard.prototype.toString = function () {
                    return 'no card';
                };
                return NullCard;
            })(Card);
            exports_1("NullCard", NullCard);
            Deck = (function () {
                function Deck() {
                    this.cards = [];
                    // init cards in order
                    // TODO something with higher order functions
                    for (var suit in Suit) {
                        if (Suit.hasOwnProperty(suit) && (isNaN(parseInt(suit)))) {
                            for (var i = 1, len = 14; i < len; i++) {
                                this.cards.push(new Card(suit, i));
                            }
                        }
                    }
                    console.log("init deck with: " + this.cards.length);
                    this.shuffle();
                }
                Deck.prototype.shuffle = function () {
                    var counter = this.cards.length, temp, index;
                    // While there are elements in the this.cards
                    while (counter > 0) {
                        index = Math.floor(Math.random() * counter);
                        counter--;
                        // And swap the last element with it
                        temp = this.cards[counter];
                        this.cards[counter] = this.cards[index];
                        this.cards[index] = temp;
                    }
                    console.log("The 13th card in this shuffeled deck is: " + this.cards[12].toString());
                };
                // TODO immutable
                Deck.prototype.getCards = function () {
                    return this.cards;
                };
                /**
                 * Add to the bottom of the cards
                 * @param card
                 */
                Deck.prototype.push = function (card) {
                    this.cards.push(card);
                };
                /**
                 * pulls the bottom off of the cards and returns it.
                 * @returns {Card|T}
                 */
                Deck.prototype.pop = function () {
                    return this.cards.pop();
                };
                /**
                 * pulls the first element off of the given array and returns it
                 */
                Deck.prototype.shift = function () {
                    return this.cards.shift();
                };
                Deck.prototype.deal = function (size) {
                    console.log("deal");
                    return this.cards.splice(0, size);
                };
                return Deck;
            })();
            exports_1("Deck", Deck);
        }
    }
});
//# sourceMappingURL=deck.js.map