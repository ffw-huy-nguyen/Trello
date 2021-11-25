/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Page = require('./page');

class HomePage extends Page {
  get inputRepoName() {
    return $('[data-testid="input-field"]');
  }

  get btnSubmit() {
    return $('[data-testid="save-button"]');
  }

  get repoItems() {
    return $$('.repo-detail');
  }

  async createRepo(repoName) {
    await this.inputRepoName.setValue(repoName);
    await this.btnSubmit.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new HomePage();
