const { faker } = require('@faker-js/faker')

exports.req = {
    'success': {
        body: {
            name: faker.name.fullName(),
            email: 'any@mail.com',
            password: faker.internet.password()

        }
    },
    'invalid-email': {
        body: {
            name: faker.name.fullName(),
            email: 'invalid.email.com',
            password: faker.internet.password()

        }
    }
}

exports.res = {
    status: (status) => {
        console.log('STATUS:', status)
        return {
            json: (data) => {
                console.log('DATA:', data)
            }
        }
    }
}