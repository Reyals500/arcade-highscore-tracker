const gameleaderboardReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_LEADERBOARD':
            return action.payload
        default:
            return state
    }
}
export default gameleaderboardReducer