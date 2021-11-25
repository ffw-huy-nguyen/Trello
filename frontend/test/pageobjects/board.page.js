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
}

module.exports = new BoardPage();
