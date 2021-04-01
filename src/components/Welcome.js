import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dumbell from '../dumbell.png';
import './Welcome.css';

function Welcome() {

  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    axios
        .get('http://localhost:4000/workouts')
        .then((res) => {
            setWorkoutList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);

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
            <th className='center'>Sets</th>
            <th className='center'>Repetitions</th>
            <th className='center'>Status</th>
            <th className='center'>Actions</th>
          </tr>
        </thead>
        <tbody>
            {workoutList[0] &&
                workoutList.map((workout, index) => (
                    <tr className = {workout.completed ? 'table-success' : ''}>
                        <td>{workout.name}</td>
                        <td>{workout.description}</td>
                        <td className='center'>{workout.sets}</td>
                        <td className='center'>{workout.repetitions}</td>
                        <td className='center'>{workout.completed ? 'Done' : 'Incomplete'}</td>
                        <td className='center'>
                            <Link to={'/edit/'+workout._id} style={{textDecoration: "none", marginRight:'10px'}}>Edit</Link>
                            <input
                                type='checkbox'
                                value={workout.completed}
                                checked={workout.completed}
                                onChange={(e) => {
                                    const newWorkoutList = [...workoutList];
                                    newWorkoutList[index].completed = e.target.checked;
                                    setWorkoutList(newWorkoutList);
                
                                axios
                                    .post('http://localhost:4000/workouts/edit/'+workout._id, newWorkoutList[index])
                                    .then((res) => console.log(res.data))
                                    .catch((err) => console.log(err));
                            }} />
                        </td>
                    </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;