const Users = require('./routes/Users')
const Express = require('express')

const port = 3000
const app = Express()

app.use(Express.json())

app.get('/Users', (req, res) => {
    Users.getAllUsers().then(r => {
        res.send(r)
    })
})

app.get('/User/:firstName', (req, res) => {
    Users.getUserByFirstName(req.params.firstName).then(r => {
        res.status(r.status).send(r.message)
    })
})

app.post('/User',(req, res) => {
    Users.add(req).then(r => {
        res.status(r.status).send(r.message)
    })
})

app.delete('/User/:id', (req, res) => {
    Users.remove(req).then(r => {
        res.status(r.status).send(r.message)
    })
})

app.post('/User/:id', (req, res) => {
    Users.update(req).then(r => {
        res.status(r.status).send(r.message)
    })
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})