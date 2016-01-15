import {Component} from "angular2/core";
import {Card} from "./deck";

@Component({
	selector: 'card',
	template: `<div class="card"><div class="{{card.suit}}"></div>{{card.rank}}</div>`,
	inputs: ['card']
})
export class CardComponent {
	public card: Card;

	ngOnInit() {
		console.log("GameComponent.onInit()");
	}
}