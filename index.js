const serverOne = require("./server");
const port = 8080

serverOne.listen(port, (req,res) => {
  console.log(`Example app listening at http://localhost:${port}`)
})

