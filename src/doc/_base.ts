export class BaseLayer {
  static async create(...args: unknown[]): Promise<BaseLayer> {
    return null;
  }

  async get(...props: unknown[]): Promise<unknown | unknown[]> {
    return null;
  }
}