import { helloWorld } from '../src/index';

// Mocking console.log to test its call
const mockLog = jest.spyOn(console, 'log').mockImplementation();

describe('Hello World', () => {
  afterEach(() => {
    // Clear all mocks after each test
    mockLog.mockClear();
  });

  it('should log "Hello, World!"', async () => {
    helloWorld(); // Call the function
    expect(mockLog).toHaveBeenCalledWith('Hello, world!'); // Check if console.log was called with 'Hello, World!'
  });
});
