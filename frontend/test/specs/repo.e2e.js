/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const RepoPage = require('../pageobjects/repo.page');
const config = require('../../wdio.conf');
describe('Repo page', () => {
  it('should create new repo', async () => {
    await RepoPage.open();
    const currentRepos = await RepoPage.repoItems.length;
    await RepoPage.createRepo('New repo');
    expect(await RepoPage.repoItems.length).toEqual(currentRepos + 1);
  });

  it('should show alert if create repo withou name', async () => {
    await RepoPage.open();
    await RepoPage.createRepo('');
    await expect(browser.isAlertOpen()).toBeTruthy();
  });

  it('should update repo', async () => {
    await RepoPage.open();
    const updatedName = 'Updated name';
    await RepoPage.updateRepo(updatedName);
    expect(await RepoPage.repoDetailName).toEqual(updatedName);
  });

  it('should go to detail board ', async () => {
    await RepoPage.open();
    const link = await RepoPage.boardDetailLink;
    await RepoPage.viewBoard();
    await expect(browser).toHaveUrl(`${config.config.baseUrl}/${link}`);
  });

  it('should remove repo', async () => {
    await RepoPage.open();
    const currentRepos = await RepoPage.repoItems.length;
    await RepoPage.removeRepo();
    await browser.acceptAlert();
    expect(await RepoPage.repoItems.length).toEqual(currentRepos - 1);
  });
});
