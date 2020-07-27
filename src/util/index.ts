export async function asyncFind<T = unknown>(arr: T[], fn: (item: T, index: number) => Promise<boolean>): Promise<T> {
  for(let i = 0; i < arr.length; i++) {
    const match = await fn(arr[i], i);
    if (match) return arr[i];
  }
  return null;
}

export function getLocale(): string {
  return location.search.match(/locale=([\w_]+)/)[1];
}

export function getTheme(): string {
  return location.search.match(/theme=([\w_-]+)/)[1];
}

export function isObject(v: unknown): boolean {
  return typeof v === 'object' && v !== null;
}

