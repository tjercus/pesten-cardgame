export enum Suit {
    CLUBS,
    DIAMONDS,
    HEARTS,
    SPADES
}

export class Card {
    constructor(private suit: Suit, private rank: number) {
        //
    }
    toString() {
        return this.suit.substring(0, 1) + " " + this.rank;
    }

	canBeThrownOn(activeCard:Card): boolean {
		return (this.suit === activeCard.suit || this.rank === activeCard.rank);
	}

	equals(anotherCard : Card) : boolean {
		return (this.suit === anotherCard.suit && this.rank === anotherCard.rank);
	}
}

export class NullCard extends Card {
	constructor() {
		super(null, null);
	}
	toString() {
		return 'no card';
	}
}

export class Deck {
    private cards: Card[] = [];
    
    constructor() {
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
    
    public shuffle() : void {
        var counter = this.cards.length,
            temp, index;
        // While there are elements in the this.cards
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            // And swap the last element with it
            temp = this.cards[counter];
            this.cards[counter] = this.cards[index];
            this.cards[index] = temp;
        }
        console.log("The 13th card in this shuffeled deck is: "  + this.cards[12].toString());
    }

	// TODO immutable
    public getCards() : Array<Card> {
        return this.cards;
    }

	/**
	 * Add to the bottom of the cards
	 * @param card
	 */
	public push(card: Card) : void {
		this.cards.push(card);
	}

	/**
	 * pulls the bottom off of the cards and returns it.
	 * @returns {Card|T}
	 */
	public pop(): Card {
		return this.cards.pop();
	}

	/**
	 * pulls the first element off of the given array and returns it
	 */
	public shift(): Card {
		return this.cards.shift();
	}

	public deal(size:number):Card[] {
		console.log("deal");
		return this.cards.splice(0, size);
	}
}
