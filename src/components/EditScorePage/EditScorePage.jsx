import { useDispatch, useSelector } from "react-redux"
import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'

const EditForm = () => {
    const editScore = useSelector((store) => store.editReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const [formState, setFormState] = useState({
        id: editScore.id,
        scores: editScore.scores,
        date: editScore.date,
        time: editScore.time
      });
    const dispatch = useDispatch();
    const history = useHistory()

    const handleChange = (id) => {
        const formData = new FormData();
        formData.append("scores", formState.scores);
        formData.append("date", formState.date);
        formData.append("time", formState.time)
        console.log("EditScore - handleChange():", formData)
        axios
        .put(`/api/evidence/update/${id}`, formData, {
          headers: {
            "Content-Type": "form-data",
          },
        })
        .then(() => fetchEvidence())
        .catch((error) => console.error("Error updating evidence:", error));
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("done")
        console.log("editScore.id", formState)

        // ! Axios put request to send over edited student info
        axios.put(
            `/api/leaderboardGame/${editScore[0].id}`,
            formState
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
        <p>We are editing {editScore[0]?.id}, {editScore[0]?.username}, Score: {editScore[0]?.scores}, Date: {editScore[0]?.date}, Time: {editScore[0]?.time}</p>
        <form
            onSubmit={handleSubmit}
        >
            <input
                onChange={(event) => setFormState({ ...formState, scores: event.target.value })}
                placeholder='Score'
                value={editScore.scores}
            />
            <input
                onChange={(event) => setFormState({ ...formState, date: event.target.value })}
                placeholder='Date'
                value={editScore.date}
            />
            <input
                onChange={(event) => setFormState({ ...formState, time: event.target.value })}
                placeholder='Time'
                value={editScore.time}
            />
            <button onClick={() => handleChange(editScore.id)}>Update Info</button>
        </form>
        </div>

    )
}

export default EditForm


