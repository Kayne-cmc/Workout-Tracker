import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dumbell from '../dumbell.png';
import './Welcome.css';

function Workout(props) {

  const [workout, setWorkout] = useState({
    _id: props.workout._id,
    name: props.workout.name,
    description: props.workout.description,
    sets: props.workout.sets,
    repetitions: props.workout.repetitions,
    completed: props.workout.completed
  });

  return(
    <tr className = {props.workout.completed ? 'table-success' : ''}>
      <td>{workout.name}</td>
      <td>{workout.description}</td>
      <td>{workout.sets}</td>
      <td>{workout.repetitions}</td>
      <td>{workout.completed ? 'Done' : 'Incomplete'}</td>
      <td>
        <Link to={'/edit/'+workout._id} style={{textDecoration: "none"}}>Edit</Link>
        <input type='checkbox' value={workout.completed} checked={workout.completed} onChange={(e) => {

          const newWorkout = {
            ...workout,
            completed: e.target.checked
          }

          setWorkout(newWorkout);

          axios.post('http://localhost:4000/workouts/edit/'+workout._id, newWorkout)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }} />
      </td>
    </tr>
  );
}

function Welcome() {

  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/workouts')
    .then(res => {
      setWorkoutList(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  });

  return(
    <div className='Welcome'>
      <div className='title'>
        <img src={Dumbell} alt='Dumbell' style={{width: '40px', height: '40px', marginRight: '15px'}}/>
        <h2 style={{margin: '0'}}>Welcome to your Workout Tracker! Here are your workouts:</h2>
      </div>
      
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sets</th>
            <th>Repetitions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workoutList.map((workout, index) => (
            <Workout workout={workout} key={index}></Workout>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;