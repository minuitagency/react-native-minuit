// @ts-ignore
import Button from './Button';
// @ts-ignore
import IconButton from './IconButton';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export {Button, IconButton};
