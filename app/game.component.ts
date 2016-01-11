import {Component} from 'angular2/core';
import {Deck, Card, NullCard} from './deck';
import {Player, HumanPlayer, ComputerPlayer} from './player'

@Component({
    selector: 'game-body',
    template: ` <section>
                    <h2>Deck</h2>
                    <button id="restart" (click)="restart()">Restart</button>
                    <button id="draw" (click)="humanDraw()">Draw</button>
                    <ul><li *ngFor="#card of deck.getCards()">{{card.toString()}}</li></ul>
                </section>
                <section>
                    <h2>Active card</h2>
                    <div>{{activeCard.toString()}}</div>
                </section>
				<section>
					<h2>Human player</h2>
					<!-- TODO only make throwable cards a link -->
					<ul><li *ngFor="#card of humanHand" class="card"><a href="#" (click)="humanThrow(card)">{{card.toString()}}</a></li></ul>
				</section>
				<section>
					<h2>Computer player</h2>
					<ul><li *ngFor="#card of computerHand">{{card.toString()}}</li></ul>
				</section>
				<section class="messages-container">
					<ul><li *ngFor="#message of messages">{{message}}</li></ul>
				</section>`

})
/**
 * TODO
 * - GUI: visual cards instead of textual ones
 * - A2: create a card component
 * - OOAD: create a player class
 * - GUI: better change hints
 * - GUI: better alert dialog
 * - AI: smarter decision which cards to throw
 * - TESTS: functional, integration and units
 * - I18N: message bundles
 */
export class GameComponent {

	public deck:Deck = new Deck();
	public computerHand:Card[] = [];
	public humanHand:Card[] = [];
	public activeCard: Card = new NullCard();
	public messages: string[] = [];

    constructor() {}

	ngOnInit() {
		console.log("GameComponent.onInit()");
		this.deck = new Deck();
		this.computerHand = this.deck.deal(7);
		this.humanHand = this.deck.deal(7);
		this.activeCard = new NullCard();
		this.messages = [];
		this.turn();
	}

	public humanDraw() : void {
		this.draw(this.humanHand);
		this.computerThrow();
	}

	public restart() : void {
		this.ngOnInit();
	}

	public humanThrow(card:Card) : void {
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
		} else {
			this.messages.push("human, your move is not allowed");
		}
	}

	private computerThrow() : void {
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
			} else {
				this.messages.push("computer, your move is not allowed");
			}
		}
		this.draw(this.computerHand);
		this.messages.push("turn goes to computer player");
	}

	private turn() : void {
		this.activeCard = this.deck.shift() || new NullCard();
		this.messages.push("turned first card: " + this.activeCard.toString());
	}

	private draw(hand: Card[]) : void {
		hand.push(this.deck.shift());
		this.messages.push("a player draws a card");
		this.messages.push("turn goes to another player");
	}

	private static removeCardFromHand(card:Card, hand:Card[]):void {
		for (var i = hand.length - 1; i >= 0; i--) {
			if (card.equals(hand[i])) {
				hand.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * First put the previous active card back at the bottom of the deck
	 *  then set the new active card
	 * @param card
	 */
	private setActiveCard(card:Card):void {
		if (this.activeCard) {
			this.deck.push(this.activeCard);
		}
		this.activeCard = card;
	}
}