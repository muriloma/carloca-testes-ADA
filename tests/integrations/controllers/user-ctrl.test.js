require('dotenv').config()
const UserController = require('../../../src/controllers/user-ctrl')
const mongoose = require('mongoose')
const { req, res } = require('../../units/mocks/http-mocks')
const User = require('../../../src/schemas/User')


describe('[Integration] Client cotroller tests', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_DB_URL)
        await User.create({
            name: 'Any User',
            email: 'any@mail.com',
            password: 'anypassword'
        })
    })

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    })

    test('Should create a new user at database', async () => {
        const resSpy = jest.spyOn(res, 'status');
        await UserController.create(req.success, res);

        expect(resSpy).toHaveBeenCalledWith(200);
    })

    test('Should throw status code 400 if an invalid email is used', async () => {
        const resSpy = jest.spyOn(res, 'status')

        await UserController.create(req['invalid-email'], res)

        expect(resSpy).toHaveBeenCalledWith(400)
    })
})