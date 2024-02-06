import { AuthGuard } from './authguard.guard';

describe('AuthguardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
