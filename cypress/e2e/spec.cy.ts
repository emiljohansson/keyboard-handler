describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5173')
	})

	it('keyIsDown should print key value for arrow up', () => {
		cy.get('input').type('{upArrow}')
		cy.get('#key-down').contains('keyIsDown: ArrowUp')
	})

	it('keyPressed should print every key pressed', () => {
		cy.get('input').type('{upArrow}')
		cy.get('#pressed').contains('keyPressed: ArrowUp')
		cy.get('input').type('{enter}')
		cy.get('#pressed').contains('keyPressed: Enter')
		cy.get('input').type('{k}')
		cy.get('#pressed').contains('keyPressed: k')
	})

	it('keyReleased should print every key released', () => {
		cy.get('input').type('{upArrow}')
		cy.get('#released').contains('keyReleased: ArrowUp')
		cy.get('input').type('{enter}')
		cy.get('#released').contains('keyReleased: Enter')
		cy.get('input').type('{k}')
		cy.get('#released').contains('keyReleased: k')
	})

	it('keysAreDown should print a result when all matching keys are pressed', () => {
		cy.get('input').type('{shift+E}')
		cy.get('#keys-down').contains('keysAreDown: Shift, E')
	})
})
