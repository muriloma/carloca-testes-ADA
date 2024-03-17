const { faker } = require('@faker-js/faker')
const UserController = require('../../../src/controllers/user-ctrl')
const Email = require('../../../src/utils/email-validator')
const UserService = require('../../../src/services/user-service')
const { req, res } = require('../mocks/http-mocks')

const UserServiceMock = {
    create: () => ({ id: faker.database.mongodbObjectId() })
}

describe('Client controller tests', () => {
    test('Should return status 200 for a new user created', async () => {
        jest.spyOn(Email, 'isValid').mockImplementationOnce(() => true)
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.create)

        const resStatusSpy = jest.spyOn(res, 'status')

        await UserController.create(req.success, res)

        expect(resStatusSpy).toHaveBeenCalledWith(200)
    })
})