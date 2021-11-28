
// Require mongoose
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://mirana85:hX79IQ9yYlxGpZ3S@sophk.nes68.mongodb.net/e-store?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  }
);

// Explore mongoose
module.exports = mongoose.connection;