require('dotenv').config()

const app = require('./api/server')
const defaults = require('./config/defaults')


app.listen(defaults.port, () => console.log(`**** Server is listening on port ${defaults.port}****`))