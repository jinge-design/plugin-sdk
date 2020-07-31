/* eslint-disable no-console */
import {
  isObject, loopGetTransfers
} from '../util';
import {
  coreArgs
} from './common';
import {
  ApiCallFn, ApiCallData, ApiCallFnMap, CoreArgs, ApiReturnData
} from './type';
import {
  rpc, convertRPCArgs, JINGE_DESIGN_ORIGIN
} from './rpc';

const listeners = {
  cmd: new Map<string, ApiCallFn>(),
  load: null as ApiCallFn,
};

export function onCommand(cmd: string, listener: ApiCallFn): void {
  if (location.origin !== 'null') {
    // 在对话框中不能使用 onCommand 函数，事实上宿主端不会向对话框发送执行 command 的消息。
    // 当 location.origin 存在时证明是在通过 src 指定的 dialog 类型的 iframe 中，反之 location.origin = 'null' 表明是在
    // 通过 srcdoc 渲染出来的 script 类型的 iframe 中。
    throw new Error('onCammand can not use in dialog.');
  }
  if (listeners.cmd.has(cmd)) {
    throw new Error('command listener exist');
  }
  listeners.cmd.set(cmd, listener);
}

export function onLoad(listener: ApiCallFn): void {
  if (listeners.load) {
    throw new Error('onload listener exist');
  }
  listeners.load = listener;
}

const __fns__: ApiCallFnMap = {
  _init_: async function(args: CoreArgs): Promise<void> {
    if (!args.plugin || !args.locale || !args.theme) {
      console.error('bad initialize args:', args);
      return;
    }
    Object.assign(coreArgs, args);
    if (listeners.load) {
      await listeners.load();
    }
  },
  _cmd_: async function(cmd: string): Promise<void> {
    const fn = listeners.cmd.get(cmd);
    if (!fn) {
      throw new Error(`handler for command: "${cmd}" not found.`);
    }
    await fn();
  }
};

async function __call__(info: ApiCallData): Promise<void> {
  const args = convertRPCArgs(info.args);
  let msg: ApiReturnData;
  let transfers: Transferable[] = undefined;
  try {
    const result = await __fns__[info.fn](...args);
    transfers = [];
    loopGetTransfers(result, transfers);
    msg = {
      act: 'rtn',
      id: info.id,
      ret: result
    };
  } catch(err) {
    // eslint-disable-next-line no-console
    console.error('plugin failed to call:' + info.fn, err);
    msg = {
      act: 'rtn',
      id: info.id,
      err: err.message || err.toString()
    };
  }
  rpc._p(msg, transfers);
}

window.addEventListener('message', evt => {
  if (JINGE_DESIGN_ORIGIN !== '*' && evt.origin !== JINGE_DESIGN_ORIGIN) {
    // 线上环境 JINGE_DESIGN_ORIGIN 一定是 https://jinge.design，保证只接收来自 jinge design 的消息。
    // 研发环境 JINGE_DESIGN_ORIGIN 是 '*'，允许任何来源的消息。
    return;
  }
  const data = evt.data;
  if (!isObject(data) || !data.act) {
    return;
  }
  if (data.act === 'call') {
    if (!data.fn || !(data.fn in __fns__)) {
      console.error('rpc function name required');
      return;
    }
    if (data.fn !== '_init_' && !coreArgs.plugin) {
      console.error('initialize required');
      return;
    }
    __call__(data).catch(err => {
      console.error(err);
    });
  } else if (coreArgs.plugin) {
    rpc.om(data);
  } else {
    console.error('initialize required');
  }
});
