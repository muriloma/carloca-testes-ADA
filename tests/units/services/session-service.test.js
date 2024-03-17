///test unitario

const SessionService = require('./session-service');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Session Service', () => {
  describe('generateToken', () => {
    test('should generate a token', () => {
      const mockEmail = 'test@example.com';
      const mockToken = 'mockToken';

      jwt.sign.mockReturnValueOnce(mockToken);

      const result = SessionService.generateToken({ email: mockEmail });

      expect(result).toEqual(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith({ email: mockEmail }, process.env.SECRET_KEY, { expiresIn: '30s' });
    });
  });
});
