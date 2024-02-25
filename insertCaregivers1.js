const mysql = require('mysql2');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Meta value template
const metaValueTemplate = {
  "FirstName": "",
  "LastName": "",
  "MiddleName": "",
  "AideInitial": "",
  "Gender": "",
  "DateofBirth": "",
  "AideCode": "",
  "IVREmployee ID": "",
  "ALternateAideCode": "",
  "Ethnicity": "",
  "SSN": "",
  "MaritalStatus": "",
  "Discipline": "",
  "Dependents": "",
  "AidePicture": "",
  "CountryofBirth": "",
  "RehireDate": "",
  "MobileID": "",
  "MobileIDStatus": "",
  "CaregiverMobileAppAvailability": "",
  "ReferralSource": "",
  "ReferralPerson": "",
  "ApplicationDate": "",
  "HiringStatus": "",
  "Status": "",
  "Reference1": "",
  "Reference2": "",
  "TerminatedDate": "",
  "Sent105": "",
  "FirstWorkDate": "",
  "LastWorkDate": "",
  "StateRegistry": "",
  "RegistryDate": "",
  "Location": "",
  "Branch": "",
  "CaregiverTeam": "",
  "Employee ID": "",
  "Address1": "",
  "Address2": "",
  "City": "",
  "State": "",
  "ZipCode": "",
  "Phone": "",
  "Phone2": "",
  "Phone3": "",
  "Zip4": "",
  "Emergency1Name": "",
  "Emergency1Relationship": "",
  "Emergency1Address": "",
  "Emergency1Phone1": "",
  "Emergency1phone2": "",
  "Emergency2Name": "",
  "Emergency2Relationship": "",
  "Emergency2Address": "",
  "Emergency2Phone1": "",
  "Emergency2Phone2": "",
  "Language1": "",
  "Language2": "",
  "Language3": "",
  "Language4": "",
  "DocumentAB": "",
  "DocumentC": "",
  "I9FormExpirationDate": "",
  "I9Notes": "",
  "CriminalBackgroundSentOutDate": "",
  "CriminalBackgroundSentOutResult": "",
  "SentOutReceivedOn": "",
  "CriminalBackgroundSecondSubmissionDate": "",
  "CriminalBackgroundSecondSubmissionResult": "",
  "SecondSubmissionReceivedOn": "",
  "CriminalBackgroundThirdSubmissionDate": "",
  "CriminalBackgroundThirdSubmissionResult": "",
  "ThirdSubmissionReceivedOn": "",
  "LastEmploymentAgency": "",
  "LastEmploymentDateFrom": "",
  "LastEmploymentDateTo": "",
  "CoCode": "",
  "FedExemption": "",
  "RateType": "",
  "PensionProfitSharing": "",
  "ExemptionFromOvertime": "",
  "DirectDeposit": "",
  "NycResident": "",
  "Employee1099": "",
  "UnionReduction": "",
  "MedicalDeductionCode": "",
  "PayCycle": "",
  "PreferredContactMethod": "",
  "NotificationEmail": "",
  "NotificationTextMessaging": "",
  "NotificationVoiceMail": ""
};


// Function to ask questions based on meta value template
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => resolve(input));
  });
}

// Function to collect user input for each field in the meta value template
async function collectUserInputs(template) {
  let responses = {};
  for (const key of Object.keys(template)) {
    const answer = await askQuestion(`Enter ${key}: `);
    responses[key] = answer;
  }
  return responses;
}

// Database connection configuration
const dbConfig = {
  host: '104.238.131.15',
  port: 9001,
  user: 'clqzol2m3003u9ns3ffargnxm',
  password: 'tg0WBGzjhlhstQv1wBZxldp3',
  database: 'clqzol2m4003w9ns3gdtg7icn'
};

// Main function to run the script
async function main() {
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

  // Collect user inputs
  const metaValueInputs = await collectUserInputs(metaValueTemplate);

  // User data to insert, now including dynamic meta_value
  const userData = {
    meta_key: 'caregivers',
    meta_value: JSON.stringify(metaValueInputs), // Convert collected inputs into a JSON string
    status: 1,
    endpoint: 'addcaregiv',
    datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  };

  // Insert user data into caregivers table
  const query = 'INSERT INTO caregivers SET ?';
  connection.query(query, userData, (error, results) => {
    if (error) {
      console.error('Error on insert: ', error.message);
    } else {
      console.log('Insert successful, ID of the new record is: ', results.insertId);
    }
    // Close the connection and readline interface
    connection.end();
    rl.close();
  });
}

main();
