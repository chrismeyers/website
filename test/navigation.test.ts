import { describe, expect, it } from 'vitest';
import { isNavCurrent, NAVIGATION } from '../src/navigation.ts';

const item = (name: string) => NAVIGATION.find((i) => i.name === name)!;

describe('isNavCurrent', () => {
  it('matches About at /', () => {
    expect(isNavCurrent('/', item('About'))).toBe(true);
  });

  it('matches Resume with or without trailing slash', () => {
    expect(isNavCurrent('/resume', item('Resume'))).toBe(true);
    expect(isNavCurrent('/resume/', item('Resume'))).toBe(true);
  });

  it('matches Projects and Builds under child paths', () => {
    expect(isNavCurrent('/projects/1', item('Projects'))).toBe(true);
    expect(isNavCurrent('/builds/1/', item('Builds'))).toBe(true);
  });
});
