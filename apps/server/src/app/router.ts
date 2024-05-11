import { Router } from 'express'

const globalRouter = Router() // Express.Router instance

/*
|========================================================
| @Router GlobalRouter 
| * Registry of all routes for this application
|========================================================
*/

globalRouter.get('/', (_, res) => {
  res.json({ hello: 'world!' })
})

// ==================================================== //
// =============== DONT CHANGE BELOW ================== //
// ==================================================== //

globalRouter.get('/healthcheck', (req, res) => {
  res.json({
    status: 'ok',
    requestedBy: [req.ip, req.ips],
  })
})

export default globalRouter
