export default class CardsModule {
  constructor() {
    this._cards = [];
  }

  getCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  updateCard(id, card) {
    const cardIndex = this._cards.findIndex((it) => it.id === id);

    if (cardIndex === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, cardIndex), card, this._cards.slice(cardIndex + 1));

    return true;
  }
}
