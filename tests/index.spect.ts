import { helloWorld } from '../src/index';

describe('index', () => {
  it('should return Hello, World!', async () => {
    expect(helloWorld()).toBe('Hello, world!');
  });
});
