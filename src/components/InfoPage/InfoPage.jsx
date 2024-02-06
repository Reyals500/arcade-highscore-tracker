import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const games = useSelector((store) => store.gameReducer)

  useEffect(() => {
    dispatch({type: 'FETCH_GAMES'})
  }, [])
  return (
    <div className="container">
      <p>Info Page</p>
      <section className='games'>
        {games.map(game => {
          return (
            <div key={game.id}>
              <h2>{game.name}</h2>
              <img src={game.img_url}></img>
              <p>{game.overview_text}</p>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default InfoPage;
