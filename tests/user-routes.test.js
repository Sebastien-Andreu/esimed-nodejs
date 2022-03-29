const request = require('supertest');

let token;

describe('Login', () => {

    test('valid Token', () => {
        return request(apiUrl)
            .post('/login')
            .send({
                firstName: 'admin',
                password: 'admin',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
            })
    });

    test('valid unvalid token wrong password', () => {
        return request(apiUrl)
            .post('/login')
            .send({
                firstName: 'admin',
                password: 'member',
            })
            .then((response) => {
                expect(response.statusCode).toBe(500);
            })
    });

    test('valid unvalid token wrong firstName', () => {
        return request(apiUrl)
            .post('/login')
            .send({
                firstName: 'member',
                password: 'admin',
            })
            .then((response) => {
                expect(response.statusCode).toBe(500);
            })
    });

    test('valid unvalid token missing firstName', () => {
        return request(apiUrl)
            .post('/login')
            .send({
                password: 'admin',
            })
            .then((response) => {
                expect(response.statusCode).toBe(400);
            })
    });
});

describe('GET /users', () => {

    beforeAll((done) => {
        request(apiUrl)
            .post('/login')
            .send({
                firstName: 'admin',
                password: 'admin',
            })
            .end((err, response) => {
                token = response.text; // save the token!
                done();
            });
    });
    // token not being sent - should respond with a 401
    test('It should require authorization', () => {
        return request(apiUrl)
            .get('/users')
            .then((response) => {
                expect(response.statusCode).toBe(500);
                expect(response.text).toBe('No authorization token was found');
            });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(apiUrl)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    });
});

describe('POST /users', () => {

    beforeAll((done) => {
        request(apiUrl)
            .post('/login')
            .send({
                firstName: 'admin',
                password: 'admin',
            })
            .end((err, response) => {
                token = response.text; // save the token!
                done();
            });
    });

    test('post user without token', () => {
        return request(apiUrl)
            .post('/users')
            .send({
                firstName: 'member',
                password: 'member',
                role:'member'
            })
            .then((response) => {
                expect(response.statusCode).toBe(500);
                expect(response.text).toBe('No authorization token was found');
            });
    });

    test('post user with token error with password and requirement', () => {
        return request(apiUrl)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'member',
                password: 'member',
                role:'member'
            })
            .then((response) => {
                expect(response.statusCode).toBe(400);
                expect(response.type).toBe('application/json');
                expect(response.body.errors[0].msg).toBe('lastName is require')
                expect(response.body.errors[1].msg).toBe('8 length minimum')
            });
    });

    test('post user with token error with password', () => {
        return request(apiUrl)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'member',
                lastName: 'member',
                password: 'member',
                role:'member'
            })
            .then((response) => {
                expect(response.statusCode).toBe(400);
                expect(response.type).toBe('application/json');
                expect(response.body.errors[0].msg).toBe('8 length minimum')
            });
    });

    test('post user with token error with password', () => {
        return request(apiUrl)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'member',
                lastName: 'member',
                password: 'password',
                role:'member'
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    });

    test('It responds with JSON', () => {
        return request(apiUrl)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body[1].firstName).toBe('member')
            });
    });
});
