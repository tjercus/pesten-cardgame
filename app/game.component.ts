import {Component} from 'angular2/core';
import {Deck, Card, NullCard} from './deck';
import {Player, HumanPlayer, ComputerPlayer} from './player'
import {CardComponent} from './card.component'
import {Labels} from './labels'
import {Input} from "angular2/core";

@Component({
    selector: 'game-body',
	directives: [CardComponent],
    template: ` <aside class="menu" id="toolbar">
                    <button id="restart" (click)="restart()" class="button">{{labels.button.restart}}</button>
                    <button id="draw" (click)="humanDraw()" class="button button-primary">{{labels.button.draw}}</button>
                    <button id="toggle-language" (click)="toggleLanguage()" class="button">{{labels.toggle.language}}</button>
                    <label><input type="checkbox" id="show-computer" (click)="toggleComputerHand()" /> {{labels.toggle.computerhand}}</label>
                </aside>
                <section>
                    <h2>{{labels.header.activecard}}</h2>
                    <card [card]="activeCard"></card>
                </section>
				<section>
					<h2>{{labels.header.humanplayer}}</h2>
					<!-- TODO only make throwable cards a link -->
					<ul><li *ngFor="#card of humanHand" class="card" (click)="humanThrow(card)"><div class="{{card.suit}}"></div>{{card.rank}}</li></ul>
				</section>
				<section class="messages-container">
					<h2>{{labels.header.messages}}</h2>
					<ul><li *ngFor="#message of messages">{{message}}</li></ul>
				</section>
				<section id="computerhand" *ngIf="showComputerHand">
					<h2>{{labels.header.computerplayer}}</h2>
					<ul><li *ngFor="#card of computerHand" class="card"><div class="{{activeCard.suit}}"></div>{{card.rank}}</li></ul>
				</section>
				`
})
/**
 * TODO
 * - GUI: suits as a graphic
 * - A2: create a card component
 * - OOAD: create a player class
 * - GUI: better change hints
 * - GUI: better alert dialog
 * - AI: smarter decision which cards to throw
 * - TESTS: functional, integration and units
  * - GUI: logo/favicon etc.
 */
export class GameComponent {

	public deck:Deck = new Deck();
	public computerHand:Card[] = [];
	public humanHand:Card[] = [];
	public activeCard: Card = new NullCard();
	public messages: string[] = [];
	private showComputerHand: boolean = false;

	private labels: any = {};
	// TODO observable property?
	private language: string = "nl";

    constructor() {}

	ngOnInit() {
		console.log("GameComponent.onInit()");
		this.labels = (new Labels(this.language)).get();

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
		if (confirm(this.labels.messages.confirmrestart)) {
			this.ngOnInit();
		}
	}

	public toggleComputerHand() : void {
		this.messages.push(this.labels.messages.showcomputerhand);
		this.showComputerHand = !this.showComputerHand;
	}

	public toggleLanguage() : void {
		(this.language === "en") ? this.language = "nl" : this.language = "en";
		this.labels = (new Labels(this.language)).get();
	}

	public humanThrow(card:Card) : void {
		if (card.canBeThrownOn(this.activeCard)) {
			GameComponent.removeCardFromHand(card, this.humanHand);
			this.setActiveCard(card);
			this.messages.push(this.labels.messages.humanthrows + this.activeCard.toString());
			if (this.humanHand.length === 0) {
				this.messages.push(this.labels.messages.humanwins);
				alert(this.labels.messages.humanwins);
				return;
			}
			this.computerThrow();
		} else {
			this.messages.push(this.labels.messages.humannotallowed);
		}
	}

	private computerThrow() : void {
		for (var i = 0, len = this.computerHand.length; i < len; i++) {
			if (this.computerHand[i].canBeThrownOn(this.activeCard)) {
				this.setActiveCard(this.computerHand[i]);
				this.messages.push(this.labels.messages.computerthrows + this.activeCard.toString());
				GameComponent.removeCardFromHand(this.computerHand[i], this.computerHand);
				if (this.computerHand.length === 0) {
					this.messages.push(this.labels.messages.computerwins);
					alert(this.labels.messages.computerwins);
					return;
				}
				this.messages.push(this.labels.messages.turngoesto + this.labels.player.human);
				return;
			} else {
				this.messages.push(this.labels.messages.computernotallowed);
			}
		}
		this.draw(this.computerHand);
		this.messages.push(this.labels.messages.turngoesto + this.labels.player.computer);
	}

	private turn() : void {
		this.activeCard = this.deck.shift() || new NullCard();
		this.messages.push(this.labels.messages.firstcard + this.activeCard.toString());
	}

	private draw(hand: Card[]) : void {
		var card: Card = this.deck.shift();
		hand.push(card);
		this.messages.push(this.labels.messages.carddraw + card.toString());
		this.messages.push(this.labels.messages.turnover);
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
