import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const games = useSelector((store) => store.gameReducer)
  const history = useHistory()

  const handleClick = (event) => {
    console.log("handleClick has been clicked", event.target.id);
    dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: event.target.id})
    history.push('/singleGame')
  }
  useEffect(() => {
    dispatch({type: 'FETCH_GAMES'})
  }, [])
  //set up the search function on this page
  // change this page instead of info page to search page
  return (
    <div className="container">
      <p>Games Page</p>
      <section className='games'>
        {games.map(game => {
          return (
            <div key={game.id}>
              <h2>{game.name}</h2>
              <img onClick={handleClick} id={game.id} src={game.img_url}></img>
              <p>{game.overview_text}</p>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default InfoPage;
