import mysql from 'mysql'

export function dbConnection(){
  const connection = mysql.createConnection(process.env.URI as string)

  return connection
}
