const { faker } = require('@faker-js/faker')

const UserService = require('../../../src/services/user-service')
const ConflictException = require('../../../src/utils/errors/confict-exception')
const User = require('../../../src/schemas/User')

const UserMock = {
    findOne: async () => null,
    findOneWithFoundUser: async () => ({ id: faker.database.mongodbObjectId() }),
    create: async () => ({ id: faker.database.mongodbObjectId() })
}

const user = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

describe('User service tests', () => {
    test('Should return an ID when a new user is created', async () => {
        jest.spyOn(User, 'findOne').mockImplementationOnce(UserMock.findOne)
        const createSpy = jest.spyOn(User, 'create').mockImplementationOnce(UserMock.create)

        const userCreated = await UserService.createUser(user)

        expect(userCreated).toHaveProperty('id')
        expect(createSpy).toHaveBeenCalledWith(user)
        expect(createSpy).toHaveBeenCalledTimes(1)

    }) // FUNCIONOU

    test('Should throws if theres is an user in db with same email', async () => {
        jest.spyOn(User, 'findOne')
            .mockImplementationOnce(UserMock.findOneWithFoundUser)

        try {
            await UserService.userExistsAndCheckPassword(user)
        } catch (error) {
            expect(error).toBeInstanceOf(ConflictException)
        }
    }) // FUNCIONOU
})