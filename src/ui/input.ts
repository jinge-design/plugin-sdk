import { rpc } from '../core/rpc';

export enum UIInputType {
  'string', 'selection'
}
export interface UIInputOptions {
  description?: string;
  type?: UIInputType;
  initialValue?: string;
  possibleValues?: string[];
  numberOfLines?: number;
}
export function getInputFromUser(options: UIInputOptions): Promise<[Error, string]> {
  return rpc.cfn('uiPrompt', options);
}
