import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'


function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)
    const gameLeaderboard = useSelector((store) => store.gameleaderboardReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const games = useSelector((store) => store.gameReducer)
    const [newScore, setNewScore] = useState({game_id: '', scores: '', date: '', time: '' })
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    

    const handleScoreChange = (event) => {
        setNewScore({
            ...newScore,
            scores: event.target.value
        })
    }
    const handleDateChange = (event) => {
        setNewScore({
            ...newScore,
            date: event.target.value
        })
    }
    const handleTimeChange = (event) => {
        setNewScore({
            ...newScore,
            time: event.target.value
        })
    }
    const addNewScore = (event) => {
        event.preventDefault();
        const payload = {
            game_id: leaderboardgame, 
            scores: newScore.scores, 
            date: newScore.date,
            time: newScore.time
        }
        dispatch({type: 'ADD_SCORE', payload})
        setNewScore({game_id: '', scores: '', date: '', time: '' })
    }
    const deleteScore = (event) => {
        console.log("Clicked the delete button!", event.target.id);
        const payload = event.target.id
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              dispatch({type: 'DELETE_SCORE', payload})
              dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: leaderboardgame})
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });


    }   
    const editScore = (event) => {
        console.log("Clicked the edit button!", event.target.id);
        const payload = event.target.id
        dispatch({type: 'FETCH_UPDATE', payload})
        history.push('/editScore')
    }
    const backPage = () => {
        history.push('/info')
    }    

    return (
        <div>
        <h3>{gameLeaderboard[0]?.name}</h3>
        <img src={gameLeaderboard[0]?.img_url}/>
        <h4>{gameLeaderboard[0]?.overview_text}</h4>
        
        <div>
            {gameLeaderboard?.map(score => {
                return(
                    <div>
                    <h3>{score.username}: {score.scores}</h3>
                    <h5>Time: {score.time} Date:{score.date} </h5>
                    <button id={score.id} onClick={(event) => editScore(event)}>Edit</button>
                    <button id={score.id} onClick={deleteScore}>Delete</button>
                    </div>
                )
            })}
        </div>
        <Button variant="outlined" onClick={handleClickOpen}>
        Add New Score
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            addNewScore(event);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Time to add in that awesome new score, or if you don't want to you can click the cancel button.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="score"
            label="Score"
            type="number"
            onChange={handleScoreChange}
            value={newScore.scores}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="date"
            label="Date"
            type="date"
            onChange={handleDateChange}
            value={newScore.date}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="time"
            label="Time"
            type="time"
            onChange={handleTimeChange}
            value={newScore.time}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Score</Button>
        </DialogActions>
        </Dialog>
        <Button onClick={backPage}>Back</Button>
        </div>
    )
}

export default SingleGamePage 