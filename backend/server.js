const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: '34.35.53.111', // Google Cloud SQL public IP
  user: 'app-user',      // Your MySQL username
  password: 'mthombenigift45@', // Your MySQL password
  database: 'healthcare_management_system', // Your database name
  port: 3306,           // Default MySQL port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to the MySQL database.');
  }
});

// Route to fetch patient details by ID
app.get('/api/patient/:id', (req, res) => {
  const patientId = req.params.id;
  const query = `SELECT * FROM patients WHERE patient_id = ?`; // Correct table name

  db.query(query, [patientId], (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(result[0]);
    }
  });
});

// Route to fetch all patients
app.get('/api/patients', (req, res) => {
  const query = `SELECT * FROM patients`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(result);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Patient Info API!');
});


// Route to fetch appointments by patient ID
app.get('/api/appointments/:patient_id', (req, res) => {
  const patientId = req.params.patient_id;
  const query = `SELECT * FROM appointments WHERE patient_id = ?`;

  db.query(query, [patientId], (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'No appointments found for this patient' });
    } else {
      res.json(result);
    }
  });
});

// Route to fetch all healthcare institutions
app.get('/api/healthcare_institutions', (req, res) => {
  const query = `SELECT * FROM healthcare_institutions`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(result);
    }
  });
});

// Route to fetch feedback
app.get('/api/feedback', (req, res) => {
  const query = `SELECT * FROM feedback`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(result);
    }
  });
});

// Route to fetch all regions
app.get('/api/regions', (req, res) => {
  const query = `SELECT * FROM regions`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Database query error:', err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(result);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use Render's dynamic port or default to 5000
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
