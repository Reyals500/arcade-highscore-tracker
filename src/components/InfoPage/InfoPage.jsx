import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const games = useSelector((store) => store.gameReducer)
  const history = useHistory()
  const gameOptions = games.map((game) => ({ id: game.id, name: game.name }));

  const handleClick = (event) => {
    console.log("handleClick has been clicked", event.target.id);
    dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: event.target.id})
    history.push('/singleGame/')
  }
  useEffect(() => {
    dispatch({type: 'FETCH_GAMES'})
  }, [])
  //set up the search function on this page
  // change this page instead of info page to search page
  return (
    <div className="container">
      <h3>Games</h3>
      <FormControl>
        <FormLabel>Search games</FormLabel>
        <Autocomplete
          placeholder="Search anything"
          type="search"
          freeSolo
          disableClearable
          id="game-search"
          options={gameOptions}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => {
            if (value) {
              console.log('Selected game ID:', value.id);
              // Perform actions with the selected game ID
              dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: value.id})
              history.push('/singleGame')
            }
          }}
        />
      </FormControl>
      <section className='games'>
        {games.map(game => {
          return (
            <div key={game.id}>
              <h2>{game.name}</h2>
              <img onClick={handleClick} id={game.id} src={game.img_url}></img>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default InfoPage;
