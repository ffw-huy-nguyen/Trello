/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const RepoPage = require('../pageobjects/repo.page');
const BoardPage = require('../pageobjects/board.page');
const LIST = require('../list').LIST;
describe('Board page', () => {
  it('should create new card ', async () => {
    await RepoPage.open();
    await RepoPage.createRepo('New repo');
    await RepoPage.viewBoard();

    // Create card in Open List
    let currentCardNumber = await BoardPage.countCard();
    await BoardPage.createCard('Card');
    expect(await BoardPage.countCard()).toEqual(currentCardNumber + 1);

    // Create card in Confirmed list
    let listName = LIST.CONFIRMED;
    currentCardNumber = await BoardPage.countCard(listName);
    await BoardPage.createCard(`Card - ${listName}`, listName);
    expect(await BoardPage.countCard(listName)).toEqual(currentCardNumber + 1);

    // Create card in False Positive list
    listName = LIST.FALSE;
    currentCardNumber = await BoardPage.countCard(listName);
    await BoardPage.createCard(`Card - ${listName}`, listName);
    expect(await BoardPage.countCard(listName)).toEqual(currentCardNumber + 1);

    // Create card in Fixed list
    listName = LIST.FIXED;
    currentCardNumber = await BoardPage.countCard(listName);
    await BoardPage.createCard(`Card - ${listName}`, listName);
    expect(await BoardPage.countCard(listName)).toEqual(currentCardNumber + 1);
  });
});
