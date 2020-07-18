describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Mikael Kosola',
            username: 'niilo22',
            password: 'pengalintiikeri'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function() {
        cy.contains('Log in to application')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('niilo22')
            cy.get('#password').type('pengalintiikeri')
            cy.get('#login-button').click()

            cy.contains('Mikael Kosola logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('niilo22')
            cy.get('#password').type('bengalintiikeri')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'niilo22', password: 'pengalintiikeri' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#author').type('Onni Suoraan Maagista')
            cy.get('#title').type('Morjesta')
            cy.get('#url').type('www...')
            cy.get('#create-button').click()

            cy.contains('Morjesta')
        })

    })
    describe('and a blog exists', function () {
        beforeEach(function () {
            cy.login({ username: 'niilo22', password: 'pengalintiikeri' })
            cy.createNote({ title: 'Morjesta', author:'Onni Suoraan Maagista', url:'www...' })
            cy.createNote({ title: 'En mun mielestä', author:'Onni Suoraan Maagista', url:'www...' })
            cy.createNote({ title: 'this is the bad coffee', author:'Mikael', url:'www...' })
        })

        it('it can be liked', function () {

            cy.contains('this is the bad coffee')
                .contains('show')
                .click()

            cy.contains('this is the bad coffee')
                .contains('like')
                .click()

            cy.contains('this is the bad coffee').contains('likes 1')
        })
        it('A blog can be removed by the adder', function() {
            cy.contains('Morjesta')
                .contains('show')
                .click()

            cy.contains('Morjesta')
                .contains('remove')
                .click()

        })
    })
})