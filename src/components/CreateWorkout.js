import React, { useState } from 'react';
const axios = require('axios');

function CreateWorkout(props) {
  const blankWorkout = {
    name: '',
    description: '',
    sets: 0,
    repetitions: 0,
    completed: false
  }
  
  const [workout, setWorkout] = useState(blankWorkout);

  const changeWorkout = function(e) {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  };

  function submitWorkout(e) {
    e.preventDefault();

    axios.post('http://localhost:4000/workouts/create', workout)
      .then(res => {
          console.log(res.data);
          props.history.push('/');
      })
      .catch(err => console.log(err));

    setWorkout(blankWorkout);
  }

  return(
        <div className='CreateWorkout'>
            <h3>Create Workout</h3>
            <form onSubmit={submitWorkout}>
                <div className='form-group'>
                    <input
                        type='text'
                        value={workout.name}
                        name='name'
                        className='form-control'
                        placeHolder='Name'
                        onChange={changeWorkout} />
                </div>
                <div className='form-group'>
                    <textarea
                        value={workout.description}
                        name='description'
                        className='form-control'
                        placeHolder='Description'
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

            <button type='submit' className='btn btn-outline-primary'>Create Workout</button>
            </form>
      </div>
    
  );
}

export default CreateWorkout;