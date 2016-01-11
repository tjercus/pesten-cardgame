System.register(['angular2/core', './deck'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, deck_1;
    var GameComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (deck_1_1) {
                deck_1 = deck_1_1;
            }],
        execute: function() {
            GameComponent = (function () {
                function GameComponent() {
                    this.deck = new deck_1.Deck();
                    this.computerHand = [];
                    this.humanHand = [];
                    this.activeCard = new deck_1.NullCard();
                    this.messages = [];
                }
                GameComponent.prototype.ngOnInit = function () {
                    console.log("GameComponent.onInit()");
                    this.deck = new deck_1.Deck();
                    this.computerHand = this.deck.deal(7);
                    this.humanHand = this.deck.deal(7);
                    this.activeCard = new deck_1.NullCard();
                    this.messages = [];
                    this.turn();
                };
                GameComponent.prototype.humanDraw = function () {
                    this.draw(this.humanHand);
                    this.computerThrow();
                };
                GameComponent.prototype.restart = function () {
                    this.ngOnInit();
                };
                GameComponent.prototype.humanThrow = function (card) {
                    if (card.canBeThrownOn(this.activeCard)) {
                        GameComponent.removeCardFromHand(card, this.humanHand);
                        this.setActiveCard(card);
                        this.messages.push("human throws: " + this.activeCard.toString());
                        if (this.humanHand.length === 0) {
                            this.messages.push("human, you win!");
                            alert("human, you win!");
                            return;
                        }
                        this.computerThrow();
                    }
                    else {
                        this.messages.push("human, your move is not allowed");
                    }
                };
                GameComponent.prototype.computerThrow = function () {
                    for (var i = 0, len = this.computerHand.length; i < len; i++) {
                        if (this.computerHand[i].canBeThrownOn(this.activeCard)) {
                            this.setActiveCard(this.computerHand[i]);
                            this.messages.push("computer throws: " + this.activeCard.toString());
                            GameComponent.removeCardFromHand(this.computerHand[i], this.computerHand);
                            if (this.computerHand.length === 0) {
                                this.messages.push("computer, you win!");
                                alert("computer, you win!");
                                return;
                            }
                            this.messages.push("turn goes to human player");
                            return;
                        }
                        else {
                            this.messages.push("computer, your move is not allowed");
                        }
                    }
                    this.draw(this.computerHand);
                    this.messages.push("turn goes to computer player");
                };
                GameComponent.prototype.turn = function () {
                    this.activeCard = this.deck.shift() || new deck_1.NullCard();
                    this.messages.push("turned first card: " + this.activeCard.toString());
                };
                GameComponent.prototype.draw = function (hand) {
                    hand.push(this.deck.shift());
                    this.messages.push("a player draws a card");
                    this.messages.push("turn goes to another player");
                };
                GameComponent.removeCardFromHand = function (card, hand) {
                    for (var i = hand.length - 1; i >= 0; i--) {
                        if (card.equals(hand[i])) {
                            hand.splice(i, 1);
                            return;
                        }
                    }
                };
                /**
                 * First put the previous active card back at the bottom of the deck
                 *  then set the new active card
                 * @param card
                 */
                GameComponent.prototype.setActiveCard = function (card) {
                    if (this.activeCard) {
                        this.deck.push(this.activeCard);
                    }
                    this.activeCard = card;
                };
                GameComponent = __decorate([
                    core_1.Component({
                        selector: 'game-body',
                        template: " <section>\n                <h2>Deck</h2>\n                <button id=\"restart\" (click)=\"restart()\">Restart</button>\n                <button id=\"draw\" (click)=\"humanDraw()\">Draw</button>\n                <ul><li *ngFor=\"#card of deck.getCards()\">{{card.toString()}}</li></ul>\n                </section>\n                <section>\n                <h2>Active card</h2>\n                <div>{{activeCard.toString()}}</div>\n                </section>\n\t\t\t\t<section>\n\t\t\t\t<h2>Human player</h2>\n\t\t\t\t<!-- TODO only make throwable cards a link -->\n\t\t\t\t<ul><li *ngFor=\"#card of humanHand\"><a href=\"#\" (click)=\"humanThrow(card)\">{{card.toString()}}</a></li></ul>\n\t\t\t\t</section>\n\t\t\t\t<section>\n\t\t\t\t<h2>Computer player</h2>\n\t\t\t\t<ul><li *ngFor=\"#card of computerHand\">{{card.toString()}}</li></ul>\n\t\t\t\t</section>\n\t\t\t\t<section class=\"messages-container\">\n\t\t\t\t<ul><li *ngFor=\"#message of messages\">{{message}}</li></ul>\n\t\t\t\t</section>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], GameComponent);
                return GameComponent;
            })();
            exports_1("GameComponent", GameComponent);
        }
    }
});
//# sourceMappingURL=game.component.js.map