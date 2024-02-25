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
    meta_key: 'caregivers',
    meta_value: '{"FirstName":"Ambiores","LastName":"Sanchez","MiddleName":"Lara","AideInitial":"SA","Gender":"MALE","DateofBirth":"05\\/13\\/1981","AideCode":"1036","IVREmployee ID":"100036","ALternateAideCode":"","Ethnicity":"","SSN":"486-91-1614","MaritalStatus":"","Discipline":"HHA","Dependents":"","AidePicture":"No","CountryofBirth":"","RehireDate":"","MobileID":"0","MobileIDStatus":"","CaregiverMobileAppAvailability":"No","ReferralSource":"","ReferralPerson":"","ApplicationDate":"01\\/01\\/1900","HiringStatus":"Employee","Status":"Terminated","Reference1":"","Reference2":"","TerminatedDate":"","Sent105":"NO","FirstWorkDate":"02\\/06\\/2021","LastWorkDate":"04\\/13\\/2021","StateRegistry":"","RegistryDate":"01\\/01\\/1900","Location":"","Branch":"","CaregiverTeam":"","Employee ID":"","Address1":"341 E Wyoming St.","Address2":"","City":"Philadelphia","State":"","ZipCode":"19120","Phone":"267-804-1488","Phone2":"","Phone3":"","Zip4":"","Emergency1Name":"","Emergency1Relationship":"","Emergency1Address":"","Emergency1Phone1":"","Emergency1phone2":"","Emergency2Name":"","Emergency2Relationship":"","Emergency2Address":"","Emergency2Phone1":"","Emergency2Phone2":"","Language1":"","Language2":"","Language3":"","Language4":"","DocumentAB":"","DocumentC":"","I9FormExpirationDate":"","I9Notes":"","CriminalBackgroundSentOutDate":"","CriminalBackgroundSentOutResult":"","SentOutReceivedOn":"","CriminalBackgroundSecondSubmissionDate":"","CriminalBackgroundSecondSubmissionResult":"","SecondSubmissionReceivedOn":"","CriminalBackgroundThirdSubmissionDate":"","CriminalBackgroundThirdSubmissionResult":"","ThirdSubmissionReceivedOn":"","LastEmploymentAgency":"","LastEmploymentDateFrom":"","LastEmploymentDateTo":"","CoCode":"","FedExemption":"","RateType":"","PensionProfitSharing":"","ExemptionFromOvertime":"","DirectDeposit":"","NycResident":"","Employee1099":"","UnionReduction":"","MedicalDeductionCode":"","PayCycle":"","PreferredContactMethod":"","NotificationEmail":"","NotificationTextMessaging":"","NotificationVoiceMail":""}',
    status: 1,
    endpoint: 'addcaregiv',
    datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')

};


// Insert user data into user_info table
const query = 'INSERT INTO caregivers SET ?';
connection.query(query, userData, (error, results) => {
  if (error) {
    console.error('Error on insert: ', error.message);
  } else {
    console.log('Insert successful, ID of the new record is: ', results.insertId);
  }
  // Close the connection
  connection.end();
});
