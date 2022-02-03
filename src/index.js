import server from './server'
server.listen(process.env.PORT, () => {
  console.log('Subscription API running!')
})
