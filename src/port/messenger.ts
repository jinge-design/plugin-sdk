export type MsgHandler = (...args: unknown[]) => void;
export class Messenger {
  lis: Map<string, MsgHandler[]>;

  constructor() {
    this.lis = new Map();
  }

  on(msg: string, handler: MsgHandler) {
    let arr = this.lis.get(msg);
    if (!arr) {
      this.lis.set(msg, arr = []);
    }
    if (arr.indexOf(handler) < 0) {
      arr.push(handler);
    }
  }

  off(msg: string, handler: MsgHandler) {
    const arr = this.lis.get(msg);
    if (!arr) return;
    const i = arr.indexOf(handler);
    if (i >= 0) {
      arr.splice(i, 1);
    }
  }
}

export const coreMessenger = new Messenger();
