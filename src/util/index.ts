export async function asyncFind<T = unknown>(arr: T[], fn: (item: T, index: number) => Promise<boolean>): Promise<T> {
  for(let i = 0; i < arr.length; i++) {
    const match = await fn(arr[i], i);
    if (match) return arr[i];
  }
  return null;
}

export function isFunction(v: unknown): boolean {
  return typeof v === 'function';
}

export function isObject(v: unknown): boolean {
  return typeof v === 'object' && v !== null;
}

export function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const $s = document.createElement('script');
    $s.src = url;
    $s.onload = resolve as unknown as GlobalEventHandlers['onload'];
    $s.onerror = reject;
    document.body.appendChild($s);
  });
}

export function loadStyle(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const $s = document.createElement('link');
    $s.href = url;
    $s.rel = 'stylesheet';
    $s.onload = resolve as unknown as GlobalEventHandlers['onload'];
    $s.onerror = reject;
    document.head.appendChild($s);
  });
}


export function loopGetTransfers(v: unknown, transfers: Transferable[]): void {
  if (!isObject(v)) {
    return;
  }
  if (Array.isArray(v)) {
    v.forEach(it => {
      loopGetTransfers(it, transfers);
    });
  } else if (v instanceof ArrayBuffer) {
    transfers.push(v as Transferable);
  } else {
    Object.keys(v).forEach(k => {
      const kv = (v as Record<string, Transferable>)[k];
      loopGetTransfers(kv, transfers);
    });
  }
}