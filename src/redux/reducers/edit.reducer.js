const editReducer = (state = {}, action) => {
    if (action.type === 'SET_EDIT') {
        console.log("SET EDIT", action.payload);
        return action.payload
            
    } else if(action.type === 'EDIT_SCORE'){
        return{
            ...state,
            [action.payload.property]: action.payload.value
        }
    } else if(action.type === 'EDIT_CLEAR'){
        return {scores: ''}
    }
    return state
}
export default editReducer