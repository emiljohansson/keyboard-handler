describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5173')
	})

	it('keyIsDown should print key value for arrow up', () => {
		cy.get('#enter').type('{upArrow}')
		cy.get('#key-down').should('have.value', 'keyIsDown: ArrowUp')

		// cleanup
		cy.get('#remove-events').click()
		cy.get('#clear-texts').click()
		cy.wait(500)

		cy.get('#enter').type('{upArrow}')
		cy.get('#key-down').should('have.value', '')
	})

	it('keyPressed should print every key pressed', () => {
		cy.get('#enter').type('{upArrow}')
		cy.get('#pressed').should('have.value', 'keyPressed: ArrowUp')
		cy.get('#enter').type('{enter}')
		cy.get('#pressed').should('have.value', 'keyPressed: Enter')
		cy.get('#enter').type('{r}')
		cy.get('#pressed').should('have.value', 'keyPressed: r')

		// remove event
		cy.get('#clear-texts').click()
		cy.get('#remove-events').click()
		cy.get('#enter').type('{r}')
		cy.get('#pressed').should('have.value', '')
	})

	it('keyReleased should print every key released', () => {
		cy.get('#enter').type('{upArrow}')
		cy.get('#released').should('have.value', 'keyReleased: ArrowUp')
		cy.get('#enter').type('{enter}')
		cy.get('#released').should('have.value', 'keyReleased: Enter')
		cy.get('#enter').type('{k}')
		cy.get('#released').should('have.value', 'keyReleased: k')
	})

	it('keysAreDown should print a result when all matching keys are pressed', () => {
		cy.get('#enter').type('{shift+E}')
		cy.get('#keys-down').should('have.value', 'keysAreDown: Shift, E')
	})
})
