/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Page = require('./page');

class RepoPage extends Page {
  get inputRepoName() {
    return $('[data-testid="input-field"]');
  }

  get btnSubmit() {
    return $('[data-testid="save-button"]');
  }

  get btnUpdate() {
    return $('[data-testid="update-btn"]');
  }

  get repoItems() {
    return $$('.repo-detail');
  }

  get repoDetailName() {
    return $('[data-testid="repo-name"]').getText();
  }

  get boardDetail() {
    return $('[data-testid="repo-name"] a');
  }

  get boardDetailLink() {
    return $('[data-testid="repo-name"] a').getAttribute('href');
  }

  get btnRemove() {
    return $('[data-testid="delete-btn"]');
  }

  async createRepo(repoName) {
    await this.inputRepoName.setValue(repoName);
    await this.btnSubmit.click();
  }

  async updateRepo(repoName) {
    await this.btnUpdate.click();
    await this.inputRepoName.setValue(repoName);
    await this.btnSubmit.click();
  }

  async removeRepo() {
    await this.btnRemove.click();
  }

  async viewBoard() {
    await this.boardDetail.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new RepoPage();
