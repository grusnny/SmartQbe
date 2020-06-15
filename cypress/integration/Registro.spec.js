describe('Registro',function () {

    it('Home', function () {
        cy.visit('http://localhost:3000/loginp?');
        cy.get('.active > .nav-link').click();
        cy.get(':nth-child(1) > :nth-child(1) > .card > .card-body > form > .btn').click();
        cy.get('.active > .nav-link').click();
        cy.get(':nth-child(2) > :nth-child(1) > .card > .card-body > form > .btn').click();
        cy.get('.active > .nav-link').click();

    });

    it(' Inicio de sesion ', function () {

        cy.get(':nth-child(4) > .nav-link').click();
        cy.get('div > .btn').click();
    });

})
