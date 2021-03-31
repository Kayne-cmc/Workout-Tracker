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
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setWorkout(blankWorkout);

    props.history.push('/');
  }

  return(
    <form onSubmit={submitWorkout}>
      <input type='text' name='name' placeholder='Name' onChange={changeWorkout}></input><br></br>
      <input type='text' name='description' placeholder='Description' onChange={changeWorkout}></input><br></br>

      <label htmlFor='Sets'>Sets</label>
      <input type='number' id='Sets' name='sets' placeholder='0' onChange={changeWorkout}></input><br></br>
      <label htmlFor='Repetitions'>Repetitions</label>
      <input type='number' id='Repetitions' name='repetitions' placeholder='0' onChange={changeWorkout}></input><br></br>

      <button type='submit'>Create Workout</button>
    </form>
  );
}

export default CreateWorkout;