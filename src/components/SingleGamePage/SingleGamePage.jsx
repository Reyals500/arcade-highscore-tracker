import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DateTime } from "luxon"
import './SingleGamePage.css'


function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)
    const gameLeaderboard = useSelector((store) => store.gameleaderboardReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const games = useSelector((store) => store.gameReducer)
    const user = useSelector((store) => store.user);
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
                text: "Your score is safe :)",
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


    // const ShowBtn = ({score}) => {
    //     if(user.username === leaderboardgame.username){
    //         return(
    //         <>
    //         <TableCell align='right'><Button id={score.id} onClick={(event) => editScore(event)} sx={{color: 'white'}}>Edit</Button></TableCell>
    //         <TableCell  align='right'><Button id={score.id} onClick={deleteScore} sx={{color: 'white'}}>Delete</Button></TableCell>
    //         </>
    //         );
    //     }else{return null}
        
    // }

    return (
        <div>
        <h3>{gameLeaderboard[0]?.name}</h3>
        <img src={gameLeaderboard[0]?.img_url}/>
        <h4>{gameLeaderboard[0]?.overview_text}</h4>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100,  bgcolor: '#d703d0'}} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{color: 'white', fontSize: 'h6.fontSize'}}>Name</TableCell>
            <TableCell align="right" sx={{color: 'white', fontSize: 'h6.fontSize'}}>Score</TableCell>
            <TableCell align="right" sx={{color: 'white', fontSize: 'h6.fontSize'}}>Time</TableCell>
            <TableCell align="right" sx={{color: 'white', fontSize: 'h6.fontSize'}}>Date</TableCell>
            <TableCell align="right" sx={{color: 'white', fontSize: 'h6.fontSize'}}>Edit</TableCell>
            <TableCell align="right" sx={{color: 'white', fontSize: 'h6.fontSize'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameLeaderboard?.map((score) => (
            <TableRow
              key={score.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{color: 'white'}} component="th" scope="row">
                {score.username}
              </TableCell>
              <TableCell sx={{color: 'white'}} align="right">{score.scores}</TableCell>
              <TableCell sx={{color: 'white'}} align="right">{score.time && DateTime.fromISO(score.time).toFormat('hh:mm a')}</TableCell>
              <TableCell sx={{color: 'white'}} align="right">{score.date && DateTime.fromISO(score.date).toFormat('LLL dd yyyy')}</TableCell>
            {/* <ShowBtn score={score}/> */}
              <TableCell align='right'><Button id={score.id} onClick={(event) => editScore(event)} sx={{color: 'white'}}>Edit</Button></TableCell>
              <TableCell  align='right'><Button id={score.id} onClick={deleteScore} sx={{color: 'white'}}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        <Button variant="outlined" onClick={backPage}>Back</Button>
        </div>
    )
}

export default SingleGamePage 