import Base from './Base';

class Repo extends Base {
  constructor() {
    super('repo');
  }

  async moveCard(cardId?: string, destinationId?: string, sourceId?: string, repoId?: string) {
    const res = await this.http.post(`/repo/${repoId}/move-card`, {
      cardId,
      destinationId,
      sourceId,
      repoId
    });
    return res.data;
  }
}

export default new Repo();
