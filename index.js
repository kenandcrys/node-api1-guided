// import the server and start it!
const server = require('./api/server')


const port = 9000;


server.listen(port, () =>{
    console.log(`Server listening on http://localhost:${port}`)
})  