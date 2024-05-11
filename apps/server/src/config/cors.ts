import { CorsOptions } from 'cors'

/*
|============================================
| Origins Whitelist
|============================================
*/
function getOrigin(): string[] | '*' {
  // sample compose for Whitelist
  /*

  const whiteList = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://example.com', // sample frontend web application
  ] // alllowing whitelisted origins only

  return whiteList

  */

  // default: allowing all
  return '*'
}

/*
|============================================
| @CORS Options
| * Whitelist the origins
| * Add more options as needed
|============================================
*/
const corsOptions: CorsOptions = {
  origin: getOrigin(),
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // methods: '', // GET, POST, etc.
  // allowedHeaders: [] // 'X-API-SECRET', etc.
}

export default corsOptions
