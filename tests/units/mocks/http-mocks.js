const { faker } = require('@faker-js/faker')

exports.req = {
    'success': {
        body: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
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