const leaderboardgameReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_ID':
            return action.payload
        default:
            return state
    }
}
export default leaderboardgameReducer