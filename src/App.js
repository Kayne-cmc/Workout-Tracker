import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Welcome from './components/Welcome';
import CreateWorkout from './components/CreateWorkout';
import EditWorkout from './components/EditWorkout';

function App() {
  return (
    <div className="App">
      <Router>
        <ul className='nav justify-content-end'>
          <li className='nav-item'>
            <Link to='/' className='nav-link active'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/create' className='nav-link active'>Create Workout</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/create' component={CreateWorkout} />
          <Route path='/edit/:id' component={EditWorkout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
