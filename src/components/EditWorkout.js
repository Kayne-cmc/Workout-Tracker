import axios from "axios";
import { useEffect, useState } from "react";
import './EditWorkout.css';

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
      const { name, value } = e.target;
      const newWorkout = {...workout};
      newWorkout[name] = value;
      setWorkout(newWorkout);
  }

  const changeCompleted = function(e) {
      const { name, checked } = e.target;
      const newWorkout = {...workout};
      newWorkout[name] = checked;
      setWorkout(newWorkout);
  }

  function submitChanges(e) {
    axios
        .post('http://localhost:4000/workouts/edit/'+props.match.params.id, workout)
        .then((res) => {
            console.log(res.data);
            props.history.push('/');
        })
        .catch((err) => console.log(err));
  }

  return(
    <div className='EditWorkout'>
        <h3>Edit Workout</h3>
        <form>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    value={workout.name}
                    id ='name'
                    name='name'
                    className='form-control'
                    onChange={changeWorkout} />
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                    value={workout.description}
                    id ='description'
                    name='description'
                    className='form-control'
                    rows='5'
                    onChange={changeWorkout} />
            </div>
            <div className='form-group'>
                <label htmlFor='sets'>Sets</label>
                <input
                    type='number'
                    id='sets'
                    name='sets'
                    value={workout.sets}
                    className='form-control'
                    onChange={changeWorkout} />
            </div>
            <div className='form-group'>
                <label htmlFor='repetitions'>Repetitions</label>
                <input
                    type='number'
                    id='repetitions'
                    name='repetitions'
                    value={workout.repetitions}
                    className='form-control'
                    onChange={changeWorkout} />
            </div>
            <div className='form-group'>
                <label htmlFor='Complete' style={{marginRight: '0.2em'}}>Completed</label>
                <input type='checkbox'
                    id='Complete'
                    name='completed'
                    value={workout.completed}
                    checked={workout.completed}
                    onChange={changeCompleted} />
            </div>
            <button
                type='button'
                className='btn btn-outline-primary'
                onClick={() => submitChanges()}
                >Save Changes
            </button>
        </form>
    </div>
  );
}

export default EditWorkout;