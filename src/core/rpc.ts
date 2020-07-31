import {
  loopGetTransfers, isFunction, isObject
} from '../util';
import {
  ApiReturnData
} from './type';
import {
  coreArgs
} from './common';

type CallbackFn<T = unknown> = (err?: string, result?: T) => void;

export const JINGE_DESIGN_ORIGIN = '*';

let INCREMENT = 0;
function aid() {
  return (INCREMENT++).toString(32);
}

type CallInfo = {
  id: string; 
  fn: string;
  args: unknown[];
  cbs: string[];
  resolve: (result?: unknown) => void;
  reject: (err: Error) => void;
};

class RPC {
  /**
   * wait
   */
  private _w: Map<string, CallInfo>;
  /**
   * callbacks
   */
  private _c: Map<string, CallbackFn>;


  constructor() {
    this._w = new Map();
    this._c = new Map();
  }

  /**
   * onMessage handler, handle rpc function return.
   */
  om(data: ApiReturnData): void {
    if (data.act === 'cb') {
      const fn = this._c.get(data.id);
      if (!fn) return;
      fn(data.err, data.ret);
      return;
    } else if (data.act === 'rtn') {
      const info = this._w.get(data.id);
      if (!info) {
        return;
      }
      if (data.err) {
        info.reject(new Error(data.err));
      } else {
        info.resolve(data.ret);
      }
      this._clear(info);
    }
  }

  private _clear(info: CallInfo): void {
    this._w.delete(info.id);
  
    if (info.cbs) {
      info.cbs.forEach(cbId => this._c.delete(cbId));
      info.cbs = null;
    }
    info.args =
      info.resolve = 
      info.reject = null;
  }

  /**
   * call function
   */
  cfn<T = void>(functionName: string, ...args: unknown[]): Promise<T> {
    const id = aid();
    const info: CallInfo = {
      id, fn: functionName,
      cbs: null,args: null,
      resolve: null, reject: null
    };
    args = args.map(arg => {
      if (isFunction(arg)) {
        const id = aid();
        this._c.set(id, arg as CallbackFn);
        if (!info.cbs) info.cbs = [];
        info.cbs.push(id);
        return {
          __$callback$__: id
        };
      } else {
        return arg;
      }
    });
    info.args = args;
    const p = new Promise<T>((resolve, reject) => {
      info.resolve = resolve;
      info.reject = reject;
    });
    this._w.set(id, info);

    const transfers: Transferable[] = [];
    loopGetTransfers(args, transfers);
    const data = {
      act: 'call', id, fn: functionName, args
    };
    this._p(data, transfers);
    return p;
  }

  /**
   * postMessage to remote.
   */
  _p(data: unknown, transfers: Transferable[]): void {
    window.parent.postMessage(
      Object.assign({
        plug: coreArgs.plugin,
        dia: coreArgs.dialog
      }, data),
      JINGE_DESIGN_ORIGIN,
      transfers
    );
  }
}

export function convertRPCArgs(args: unknown[]): unknown[] {
  return (Array.isArray(args) ? args : []).map(arg => {
    if (isObject(arg) && arg.__$callback$__) {
      const cbId = arg.__$callback$__;
      const fn = function(err?: Error, result?: unknown) {
        const transfers: Transferable[] = [];
        loopGetTransfers(result, transfers);
        rpc._p({
          act: 'cb',
          id: cbId,
          err: err ? (err.message || err.toString()) : null,
          ret: result
        }, transfers);
      };
      return fn;
    } else {
      return arg;
    }
  });
}

/**
 * @internal
 */
export const rpc = new RPC();
