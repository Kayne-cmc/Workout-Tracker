const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let Workout = require('./workout.model');

const workoutRoutes = express.Router();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/workouts', workoutRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/workouts', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log('MongoDB connection successful');
})

workoutRoutes.get('/', (req,res) => {
  Workout.find((err,data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

workoutRoutes.get('/:id', (req,res) => {
  let id = req.params.id;
  Workout.findById(id, (err,data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

workoutRoutes.post('/create', (req,res) => {
  let workout = new Workout(req.body);
  workout.save()
    .then(workout => {
      res.status(200).json({'workout': 'workout added successfully'});
    })
    .catch(() => {
      res.status(400).send('Could not add new workout');
    });
});

workoutRoutes.post('/edit/:id', (req,res) => {
  let id = req.params.id;
  Workout.findById(id, (err,data) => {
    if (!data) {
      res.status(404).send('Workout not found');
    } else {
      data.name = req.body.name;
      data.description = req.body.description;
      data.sets = req.body.sets;
      data.repetitions = req.body.repetitions;
      data.completed = req.body.completed;

      data.save()
        .then(data => {
          res.json('Workout updated');
        })
        .catch(err => {
          res.status(400).send("Could not update workout");
        });
    }
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

