const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./src/database/db');
const Task = require('./src/database/models/tareas')
const Stock = require('./src/database/models/stock')
const Consultas = require('./src/database/models/consultas')
const Medication = require('./src/database/models/medicacionesrec')
const Catering = require('./src/database/models/catering')
const Permanencia = require('./src/database/models/permanencia')
const Dereva = require('./src/database/models/dereva')


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Handle cors
app.use(cors());

// Example route for testing root URL
app.get('/', (req, res) => {
  res.send('Test!');
});

// Route for '/users'
app.use('/users', require('./src/services/cognito'));
app.use('/stock', require('./src/routes/stock'));
app.use('/tareas', require('./src/routes/tasks'));
app.use('/consultas', require('./src/routes/consults'));
app.use('/reportes', require('./src/routes/reports'));
app.use('/dereva', require('./src/routes/dereva'));


// Start the server
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);    
  await sequelize.sync({force: false}).then(()=>{

      console.log('Connection to DB \'SEQUELIZE\' confirmed');
      /*User.count().then(result=>{
          if(result===0){
              User.create({
                  username:'admin',
                  hashedPass:process.env.ADMIN_PASSWORD,
                  role: 1
              }).catch(error=>console.log(error.name));
              User.create({
                  username:'client',
                  hashedPass:process.env.CLIENT_PASSWORD,
                  role: 0
              }).catch(error=>console.log(error.name));;
          }
      })  
  }).catch(error=>{
      console.log('Failed connection:',error)*/
  })
});
