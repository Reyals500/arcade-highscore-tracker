import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)

    return (
        <div>
        <h3>Your on the Single Game Page!</h3>
        
        {/* <div>
            {leaderboard?.map(score => {
                return(
                    <div key={score.id}>
                    <h3>{score.name}</h3>
                    <img src={score.img_url}/>
                    </div>
                    
                )
                
            })}
        </div> */}
        </div>
    )
}

export default SingleGamePage