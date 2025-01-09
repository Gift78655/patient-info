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
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'mthombenigift45@', // Your MySQL password
  database: 'healthcare_management_system', // Your database name
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
  const query = `SELECT * FROM Patients WHERE patient_id = ?`;

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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
