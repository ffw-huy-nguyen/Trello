/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Page = require('./page');

class BoardPage extends Page {
  async createCard(cardName, listName = 'Open') {
    const inputCard = await $(`[data-testid="${listName}"] [data-testid="input-field"]`);
    const btnSubmit = await $(`[data-testid="${listName}"] [data-testid="save-button"]`);
    await inputCard.setValue(cardName);
    await btnSubmit.click();
  }

  async countCard(listName = 'Open') {
    const cards = await $$(`[data-testid="${listName}"] .card-detail`);
    return cards.length;
  }

  get btnUpdate() {
    return $('[data-testid="update-btn"]');
  }

  get btnSubmit() {
    return $('[data-testid="card-detail"] [data-testid="save-button"]');
  }

  get cardDetailName() {
    return $('[data-testid="card-detail"] [data-testid="card-name"]').getText();
  }

  async updateCard(cardName) {
    await this.btnUpdate.click();
    const inputCard = await $(`[data-testid="card-detail"] [data-testid="input-field"]`);
    await inputCard.setValue(cardName);
    await this.btnSubmit.click();
  }
}

module.exports = new BoardPage();
