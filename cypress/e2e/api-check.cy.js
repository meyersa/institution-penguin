// Since the dataset in Dev is known we should expect these values from the endpoints

describe('API Endpoints', () => {
  it('returns top players from /api/read/topplayers', () => {
    cy.request('/api/read/topplayers')
      .its('body')
      .should('deep.equal', [
        { totalScore: 600, displayName: 'I_have_20_characters', lastActivityDate: '2024-04-04T05:36:39.370Z' },
        { totalScore: 450, displayName: 'Dolor_Sit', lastActivityDate: '2024-04-04T05:36:39.370Z' },
        { totalScore: 150, displayName: 'Amet_Consectetur', lastActivityDate: '2024-04-04T05:36:39.370Z' }
      ])
  })

  it('returns recent scores from /api/read/recentscores', () => {
    cy.request('/api/read/recentscores')
      .its('body')
      .should('deep.equal', [
        { displayName: "Amet_Consectetur", gameName: 'flappypenguin', score: 150, timestamp: '2024-04-04T05:36:39.371Z' },
        { displayName: "Dolor_Sit", gameName: 'flappypenguin', score: 200, timestamp: '2024-04-04T05:36:39.371Z' },
        { displayName: "Lorem_Ipsum", gameName: 'flappypenguin', score: 100, timestamp: '2024-04-04T05:36:39.371Z' }
      ])
  })

  it('returns high scores from /api/read/highscores', () => {
    cy.request('/api/read/highscores')
      .its('body')
      .should('deep.equal', [
        { gameName: 'triviapenguin', maxScore: 600, displayName: 'I_have_20_characters', timestamp: '2024-02-04T05:36:39.371Z' },
        { gameName: 'triviapenguin', maxScore: 250, displayName: 'Dolor_Sit', timestamp: '2024-03-04T05:36:39.371Z' },
        { gameName: 'flappypenguin', maxScore: 200, displayName: 'Dolor_Sit', timestamp: '2024-04-04T05:36:39.371Z' }
      ])
  })

  it('returns 404 error from /api/read/abc', () => {
    cy.request({ url: '/api/read/abc', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
  })

  it('returns profile information for profile ID 1 from /api/read/profile/1', () => {
    cy.request('/api/read/profile/OG_Penguin')
      .its('body')
      .should('deep.equal', {
        playerInfo: { displayName: 'OG_Penguin', creationDate: '2024-04-03T13:37:10.000Z', lastActivityDate: '2024-04-03T13:37:10.000Z' },
        globalRank: 1,
        globalScore: 100,
        recentScores: [{ value: 100, gameName: 'flappypenguin', timestamp: '2024-04-03T13:37:10.000Z' }]
      })
  })

  it('returns 404 error for non-existent profile from /api/read/profile/abcd', () => {
    cy.request({ url: '/api/read/profile/abcd', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
  })
})
