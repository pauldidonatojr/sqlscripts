const mysql = require('mysql2/promise');
const readline = require('readline');



// Function to create a MySQL connection
async function createConnection() {
    const connection = await mysql.createConnection({
         host: '104.238.131.15',
         port: 9001,
         user: 'clqzol2m3003u9ns3ffargnxm',
         password: 'tg0WBGzjhlhstQv1wBZxldp3',
        database: 'clqzol2m4003w9ns3gdtg7icn'
    });
    return connection;
}

// Function to retrieve all data from caregivers table
async function getAllData(connection) {
    const [rows] = await connection.query('SELECT * FROM caregivers');
    return rows;
}

// Function to retrieve data based on a specific ID
async function getDataById(connection, id) {
    const [rows] = await connection.query('SELECT * FROM caregivers WHERE id = ?', [id]);
    return rows;
}

// Function to prompt user for input
function promptUser() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter 1 to get all data, 2 to get data by ID: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Main function
async function main() {
    try {
        const connection = await createConnection();
        const choice = await promptUser();

        if (choice === '1') {
            const allData = await getAllData(connection);
            console.log(allData);
        } else if (choice === '2') {
            const id = await promptUserForId();
            const dataById = await getDataById(connection, id);
            console.log(dataById);
        } else {
            console.log('Invalid choice!');
        }

        connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to prompt user for specific ID
async function promptUserForId() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter the ID: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

main();
