import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function EditWorkout(props) {
  const [workout, setWorkout] = useState({
    name: '',
    description: '',
    sets: 0,
    repetitions: 0,
    completed: false
  });

  useEffect(() => {
    axios.get('http://localhost:4000/workouts/'+props.match.params.id)
      .then(res => {
        setWorkout(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const changeWorkout = function(e) {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  }

  const changeCompleted = function(e) {
    setWorkout({
      ...workout,
      completed: e.target.checked
    });
  }

  function submitChanges(e) {
    e.preventDefault();

    axios.post('http://localhost:4000/workouts/edit/'+props.match.params.id, workout)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    props.history.push('/');
  }

  return(
    <div>
      <h3>Edit Workout</h3>
      <form>
        <input type='text' value={workout.name} name='name' onChange={changeWorkout}></input><br></br>
        <input type='text' value={workout.description} name='description'onChange={changeWorkout}></input><br></br>

        <label htmlFor='Sets'>Sets</label>
        <input type='number' id='Sets' name='sets' value={workout.sets} onChange={changeWorkout}></input><br></br>
        <label htmlFor='Repetitions'>Repetitions</label>
        <input type='number' id='Repetitions' name='repetitions' value={workout.repetitions} onChange={changeWorkout}></input><br></br>

        <input type='checkbox'
               id='Complete'
               name='completed'
               value={workout.completed}
               checked={workout.completed}
               onChange={changeCompleted} />
        <label htmlFor='Complete'>Completed</label><br></br>

        <Link to={'/'}><button type='submit' onClick={(e) => submitChanges(e)}>Save Changes</button></Link>
      </form>
    </div>
  );
}

export default EditWorkout;