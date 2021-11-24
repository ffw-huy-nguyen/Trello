import Base from './Base';

class Repo extends Base {
  constructor() {
    super('repo');
  }

  async moveCard(
    cardId?: string,
    destination?: { droppableId: string; index: number },
    source?: { droppableId: string; index: number },
    repoId?: string
  ) {
    const res = await this.http.post(`/repo/${repoId}/move-card`, {
      cardId,
      destination,
      source,
      repoId
    });
    return res.data;
  }
}

export default new Repo();
