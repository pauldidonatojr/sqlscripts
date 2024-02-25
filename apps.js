const mysql = require('mysql2');

// Database connection configuration
const dbConfig = {
  host: '104.238.131.15',
  port: 9001,
  user: 'clqzol2m3003u9ns3ffargnxm',
  password: 'tg0WBGzjhlhstQv1wBZxldp3',
  database: 'clqzol2m4003w9ns3gdtg7icn'
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }
  console.log('Connected to database with ID: ' + connection.threadId);
});

// User data to insert
const userData = {
  meta_key: 'auth',
  meta_value: '{"type":"createuser","type_id":"2","user_id":"new_user","first_name":"FirstName","last_name":"LastName","pwd":"password","email":"email@example.com"}',
  status: 1,
  endpoint: 0,
  datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')
};


// Insert user data into user_info table
const query = 'INSERT INTO user_info SET ?';
connection.query(query, userData, (error, results) => {
  if (error) {
    console.error('Error on insert: ', error.message);
  } else {
    console.log('Insert successful, ID of the new record is: ', results.insertId);
  }
  // Close the connection
  connection.end();
});
