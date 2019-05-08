context('E2E Rabobank site', () => {
  beforeEach(() => {
    cy.visit('https://www.rabobank.nl/')
  })

    it('kies hypotheken', () => {
      cy.get('.rfs-icon-hypotheken--type-hypotheken').click()
      
    })

})

