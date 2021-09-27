import { Router } from "express";
import { dbConnection } from "../database/mysql";

const routes = Router()

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
}

routes.get('/', (req, res) => {
  const conn = dbConnection()

  conn.connect()

  conn.query('SELECT * FROM `contacts`', (err, result, fields) => {
    conn.end()

    if(err) {
      return res.status(400).json({
        err,
      })
    }

    res.json({
      contacts: result,
    })
  })
  
})

routes.post('/set', (req, res) => {
  const { name, email, message } = req.body

  if(!name || name.trim() === '') {
    return res.status(400).json({
      message: '"name" is a required parameter in body'
    })
  }

  if(!email || email.trim() === '') {
    return res.status(400).json({
      message: '"email" is a required parameter in body'
    })
  }

  if(!message || message.trim() === '') {
    return res.status(400).json({
      message: '"message" is a required parameter in body'
    })
  }

  const conn = dbConnection()

  conn.connect()

  conn.query(`INSERT INTO \`contacts\` (\`name\`, \`email\`, \`message\`) VALUES (?, ?, ?)`, [name, email, message], (err, result, fields) => {
    conn.end()
    
    if(err) {
      return res.status(400).json({
        err,
      })
    }

    res.json({
      message: 'Contact added with success',
      contact: {
        name,
        email,
        message,
      }
    })
  })

})

export { routes }
