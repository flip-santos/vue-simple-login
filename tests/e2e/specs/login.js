describe('Login.vue', () => {

  const email_selector = '[data-e2e="email-input"]',
        password_selector = '[data-e2e="password-input"]',
        login_btn_selector = '[data-e2e="submit-btn"]',
        logout_btn_selector = '[data-e2e="logout-btn"]',
        invalid_user = 'not_a_valid_user@email.com',
        valid_user = 'test@test.com',
        invalid_password = 'not_a_valid_password',
        valid_password = 'password';

  context('Unit testing', () => {

    before(() => {
      cy.visit('/')
      cy.wait(1000)
    })

    it('Renders all interactive elements', () => {
      cy.get(email_selector).should('have.attr', 'type', 'email')
      cy.get(password_selector).should('have.attr', 'type', 'password')
      cy.get(login_btn_selector).should('have.attr', 'type', 'button')
    })

    it('Has email validation', () => {
      cy.get(email_selector)
        .type('wrong@email')
        .closest('.v-input').find('.v-messages__message')
        .contains('E-mail must be valid')
    })

    it('Has password validation', () => {
      cy.get(password_selector)
        .type('111')
        .closest('.v-input').find('.v-messages__message')
        .contains('Password must be valid')
    })
  });

  context('Login.vue Integration testing', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.wait(1000)
    })
    
    it(`Can't login with an invalid user`, () => {
      cy.get(email_selector).type(invalid_user)
      cy.get(password_selector).type(invalid_password)
      cy.get(login_btn_selector).click()
      cy.wait(3000)
      cy.get('.v-alert__content').contains('Error: Request failed with status code 404')
    })

    it(`Can't login with an invalid password`, () => {
      cy.get(email_selector).type(valid_user)
      cy.get(password_selector).type(invalid_password)
      cy.get(login_btn_selector).click()
      cy.wait(3000)
      cy.get('.v-alert__content').contains('Error: Request failed with status code 403')
    })

    it('Redirect to /logged-in after login', () => {
      cy.get(email_selector).type(valid_user)
      cy.get(password_selector).type(valid_password)
      cy.get(login_btn_selector).click()
      cy.wait(3000)
      cy.url().should('include', '/logged-in')
    })

  })

  context('LoggedIn.vue integration testing', () => {
    it('Redirect back to login after logout', () => {
      cy.visit('/')
      cy.wait(1000)
      cy.get(email_selector).type(valid_user)
      cy.get(password_selector).type(valid_password)
      cy.get(login_btn_selector).click()
      cy.wait(3000)
      cy.get(logout_btn_selector).click()
      cy.wait(500)
      cy.get(email_selector)
    })
  })
})
