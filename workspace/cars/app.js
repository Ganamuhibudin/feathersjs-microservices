const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
// const socketio = require('@feathersjs/socketio');
const cors = require('cors')

const PORT = 3031;

// A cars service that allows to create new
// and return all existing cars
class CarService {
  constructor() {
    this.cars = [];
  }

  async find () {
    // Just return all our cars
    return this.cars;
  }

  async create (data) {
    // The new message is the data merged with a unique identifier
    // using the cars length since it changes whenever we add one
    const message = {
      id: this.cars.length,
      name: data.name
    }

    // Add new message to the list
    this.cars.push(message);

    return message;
  }
}

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
// app.configure(socketio());
// Register an in-memory cars service
app.use('/cars', new CarService());
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

app.use(cors())

// Add any new real-time connection to the `everybody` channel
// app.on('connection', connection =>
//   app.channel('everybody').join(connection)
// );
// Publish all events to the `everybody` channel
// app.publish(data => app.channel('everybody'));

// Start the server
app.listen(PORT).on('listening', () =>
  console.log(`Feathers server listening on localhost:${PORT}`)
);

// For good measure let's create a message
// So our API doesn't look so empty
app.service('cars').create({
  name: 'Toyota Avanzax'
});