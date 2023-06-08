/* eslint-disable prettier/prettier */
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000
const db = mysql.createConnection({
  user: 'adgcoth_root',
  host: 'ns13.hostinglotus.net',
  password: 'Pa$$w0rd',
  database: 'adgcoth_001',
  port: '3306',
})

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database = ', err)
    return
  }
  console.log('MySQL successfully connected!')
})

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM Emp_Info', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.post('/create', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const wage = req.body.wage

  db.query(
    'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    },
  )
})

app.put('/update', (req, res) => {
  const id = req.body.id
  const wage = req.body.wage
  db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(3001, () => {
  console.log('Yey, your server is running on port 3001', PORT)
})
