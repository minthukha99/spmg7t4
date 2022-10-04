const express = require('express');
const mongoose = require("mongoose");
const { route } = require('./router');
const router = require('./router');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/', router);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://spmg7t4:vewg10lvgiipAXWn@cluster0.upxbtmt.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(8000, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();