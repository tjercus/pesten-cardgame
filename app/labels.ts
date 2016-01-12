
export class Labels {
	constructor(public lang: string) {}

	get() {
		if (this.lang === "en") {
			return this.en;
		} else {
			return this.nl;
		}
	}

	public en: any = {
		"button": {"restart": "Restart", "draw": "Draw"},
		"toggle": {"computerhand": "Show computer hand?", "language": "Other language"},
		"header": {"activecard": "Active card", "humanplayer": "Player", "computerplayer": "Computer", "messages": "Messages"},
		"player": {"human": "human", "computer": "player"},
		"messages": {
			"showcomputerhand": "Show computer hand",
			"humanwins": "player, you win!",
			"computerwins": "computer, you win!",
			"humanthrows": "player throws ",
			"computerthrows": "computer throws ",
			"humannotallowed": "human, your move is not allowed",
			"computernotallowed": "computer, your move is not allowed",
			"turngoesto": "turn goes to ",
			"firstcard": "turned first card ",
			"carddraw": "a player draws ",
			"turnover": "turn goes to another player",
			"confirmrestart": "are you sure you want to restart?"
		},
	}

	public nl: any = {
		"button": {"restart": "Opnieuw starten", "draw": "Kaart trekken"},
		"toggle": {"computerhand": "Kaarten van de computer zien?", "language": "Andere taal"},
		"header": {"activecard": "Draaikaart", "humanplayer": "Speler", "computerplayer": "Computer", "messages": "Meldingen"},
		"player": {"human": "speler", "computer": "computer"},
		"messages": {"showcomputerhand": "Toon de kaarten van de computer",
			"humanwins": "speler, jij wint!",
			"computerwins": "computer, jij wint!",
			"humanthrows": "speler gooit ",
			"computerthrows": "computer gooit ",
			"humannotallowed": "speler, jouw actie is niet toegestaan",
			"computernotallowed": "computer, jouw actie is niet toegestaan",
			"turngoesto": "de beurt gaat naar ",
			"firstcard": "de eerste kaart is ",
			"carddraw": "iemand trekt ",
			"turnover": "de beurt gaat over",
			"confirmrestart": "weet je zeker dat opnieuw wil beginnen?"
		}
	}

}
