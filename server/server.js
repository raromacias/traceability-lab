const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '7cd0512abee348eb83f177f22c188f6a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const { editMuse, deleteMuse, createMuse, getMuses, getCompliment, getRandomFortune } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortunes", getRandomFortune);
app.get(`/api/muses`, getMuses)
app.post(`/api/muses`, createMuse)
app.delete(`/api/muses/:id`, deleteMuse)
app.put(`/api/muses/:id`, editMuse)







try {
    nonExistentFunction();
  } catch (error) {
    rollbar.error('There is nothing here')
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  
const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))

// app.listen(4000, () => console.log("Server running on 4000"));