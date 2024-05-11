import { Router } from 'express'

const globalRouter = Router() // Express.Router instance

/*
|========================================================
| @Router GlobalRouter 
| * Registry of all routes for this application
|========================================================
*/

// Register API routes
globalRouter.use('/api', require('./api.router').default)

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

// 404 Not Found
globalRouter.get('*', (_, res) => {
  res.status(404).json({ message: 'Not Found!' })
})

export default globalRouter
