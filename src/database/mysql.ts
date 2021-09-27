import mysql from 'mysql'

export function dbConnection(){
  const connection = mysql.createConnection('mysql://uelkttxyfpccpuo5:VkSSnDDZTlKeDkAnxR0U@bgskmcbzawljkedzpaw4-mysql.services.clever-cloud.com:3306/bgskmcbzawljkedzpaw4' || process.env.URI as string)

  return connection
}
