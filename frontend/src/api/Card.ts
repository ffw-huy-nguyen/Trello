import Base from './Base';

class Card extends Base {
  constructor(private cardPath: string) {
    super(cardPath);
  }

  async createCard({ listId, text }: { listId: string; text: string }) {
    const res = await this.http.post(`/list/${listId}/${this.cardPath}`, { text });
    return res.data;
  }
}

export default new Card('card');
