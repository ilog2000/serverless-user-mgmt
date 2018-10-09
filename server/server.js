const app = require('./app.js');

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(`The server is running on port ${process.env.PORT}`);
});
