const SessionController = require('../../../src/controllers/session-ctrl');
const Email = require('../../../src/utils/email-validator');
const UserService = require('../../../src/services/user-service');
const SessionService = require('../../../src/services/session-service');

// jest.mock('../../../src/utils/email-validator');
jest.mock('../../../src/services/user-service')
jest.mock('../../../src/services/session-service');

describe('SessionController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Validar recursos de SessionController', () => {
        test('should return 400 if email is invalid', async () => {
            req.body.email = 'invalidEmail';
            req.body.password='test';
            await SessionController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Email inválido');
        });

        test('should return 400 if password is not provided', async () => {
            req.body.email = 'validemail@example.com';
            await SessionController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Senha inválida');
        });

        test('should return 404 if user does not exist', async () => {
            req.body.email = 'validemail@example.com';
            req.body.password = 'validPassword';
            UserService.userExistsAndCheckPassword.mockResolvedValue(false);
            await SessionController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('Usuário não encontrado');
        });

        test('should return 500 if an unexpected error occurs', async () => {
            req.body.email = 'validemail@example.com';
            req.body.password = 'validPassword';
            UserService.userExistsAndCheckPassword.mockRejectedValue(new Error('Server Error'));
            await SessionController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Server Error');
        });

        test('should return token if everything is valid', async () => {
            req.body.email = 'validemail@example.com';
            req.body.password = 'validPassword';
            UserService.userExistsAndCheckPassword.mockResolvedValue(true);
            SessionService.generateToken.mockResolvedValue('generatedToken');
            await SessionController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'generatedToken' });
        });
    });
});