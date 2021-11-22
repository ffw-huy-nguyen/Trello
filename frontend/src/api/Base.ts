import axios from 'axios';
import config from '../../config';

class Base {
  http = axios.create({
    baseURL: config.apiUrl
  });
  constructor(private path: string) {}

  async getItems<R>(): Promise<R> {
    const res = await this.http.get(`/${this.path}`);
    return res.data;
  }

  async getItem<R>(uuid: string): Promise<R> {
    const res = await this.http.get(`/${this.path}/${uuid}`);
    return res.data;
  }

  async updateItem<R, D>(uuid: string, data: D): Promise<R> {
    const res = await this.http.put(`/${this.path}/${uuid}`, data);
    return res.data;
  }

  async createItem<R, D>(data: D): Promise<R> {
    const res = await this.http.post(`/${this.path}`, data);
    return res.data;
  }

  async deleteItem(uuid: string): Promise<void> {
    await this.http.delete(`/${this.path}/${uuid}`);
  }
}

export default Base;
