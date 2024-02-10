import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import axios from 'axios'

const EditForm = () => {
    const editScore = useSelector((store) => store.editReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const dispatch = useDispatch();
    const history = useHistory()

    const handleChange = (event) => {
        event.preventDefault()
        console.log("EditScore - handleChange():", event.target.value)
        dispatch({
            type: 'EDIT_SCORE',
            payload: { property: 'scores', value: event.target.value }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("done")
        console.log("editScore.id", editScore[0]?.id)

        // ! Axios put request to send over edited student info
        axios.put(
            `/api/leaderboardGame/${editScore[0].id}`,
            editScore
        ).then(response => {
            console.log("Success Sending Score Update")
            dispatch({type: 'EDIT_CLEAR'})
            dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: leaderboardgame})
            history.push('/singleGame')
        }).catch(error => {
            console.log("Error sending student update:", error)
        })
    }


    return(
        <div>
        <h1>EDIT PAGE!!</h1>
        <p>We are editing {editScore[0]?.username}, Score: {editScore[0]?.scores}</p>
        <form
            onSubmit={handleSubmit}
        >
            <input
                onChange={(event) => handleChange(event)}
                placeholder='Score'
                value={editScore.scores}
            />
            <input type='submit' value='Update Score' />
        </form>
        </div>

    )
}

export default EditForm


