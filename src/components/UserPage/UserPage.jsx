import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

function UserPage() {
  const dispatch = useDispatch()
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  //this is where the const leaderboard is going
  const leaderboard = useSelector((store) => store.leaderboardReducer)
  useEffect(() => {
    dispatch({type: 'FETCH_LEADERBOARD'})
  }, [])
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
        {leaderboard.map(leader => {
          return (
            <div key={leader.id}>
              <h4>{leader.name}: {leader.scores}</h4>
            </div>
          )
        })}
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
