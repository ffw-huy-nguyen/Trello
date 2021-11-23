import Base from './Base';

class List extends Base {
  constructor(private listPath: string) {
    super(listPath);
  }

  async createList({ repoID, title }: { repoID: string; title: string }) {
    const res = await this.http.post(`/repo/${repoID}/${this.listPath}`, { title });
    return res.data;
  }
}

export default new List('list');
