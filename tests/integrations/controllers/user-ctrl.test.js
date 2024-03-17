const UserController = require('../../../src/controllers/user-ctrl')
const mongoose = require('mongoose')
const { req, res } = require('../../units/mocks/http-mocks')
const User = require('../../../src/schemas/User')


describe('[Integration] Client cotroller tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URL)

        await User.create({
            name: 'Any User',
            email: 'any@mail.com',
            password: 'anypassword'
        })
    })

    afterAll(async () => {
        await User.deleteMany({})
        await mongoose.connection.close()
    })

    test('Should create a new user at database', async () => {
        await UserController.create()

        const resSpy = jest.spyOn(res, 'status')
        await UserController.create(req.success, res)

        expect(resSpy).toHaveBeenCalledWith(200)
    })

    test('Should throw status code 400 if an invalid email is invalid', async () => {
        const resSpy = jest.spyOn(res, 'status')

        await UserController.create(req['invalid-email'], res)

        expect(resSpy).toHaveBeenCalledWith(400)
    })

    test('Should return status code 409 if user already exists', async () => {
        const resSpy = jest.spyOn(res, 'status')

        await UserController.create({
            body: {
                name: 'Any User',
                email: 'any@mail.com',
                password: 'password'
            }
        }, res)

        expect(resSpy).toHaveBeenCalledWith(409)
    })
})