import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import './UserPage.css';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function UserPage() {
  const dispatch = useDispatch()
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  //this is where the const leaderboard is going
  const leaderboard = useSelector((store) => store.leaderboardReducer)
  
  const Chart = () => {
    const labels = leaderboard?.map(entry => entry.name);
    const dataPoints = leaderboard?.map(entry => entry.scores);
    const data = {
    labels: labels,
    datasets: [{
      label: `${user.username}'s Scores`,
      data: dataPoints,
      fill: false,
      borderColor: 'rgb(215, 3, 208)',
      tension: 0.1
    }]
  }; const config = {
      type: 'line',
      data: data,
    };
    return (
      <div style={{ height: "500px", width: "500px" }}>
      <Line data={data} options={config} />
    </div>
    )
    }


  useEffect(() => {
    dispatch({type: 'FETCH_LEADERBOARD'})
  }, [])
  return (
    <div className="container">
    <h2>Welcome, {user.username}!</h2>
      <img src='/documentation/images/Arcade_Emporium.jpeg'></img>
      <div key={leaderboard.id}>
        {leaderboard.map(leader => {
          return (
            <div >
              <h4>{leader.name}: {leader.scores}</h4>
            </div>
          )
        })}
      </div>
      <Chart />
      <LogOutButton className="btn1" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
