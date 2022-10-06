const express = require('express')
const app = express();

// YOUR CODE GOES IN HERE
app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello World')
})

const fs = require("fs");

app.post('/blogs', (req, res) => {
  const { title, content } = req.body
  fs.writeFileSync(title, content);
  res.end('ok')
})

app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  const { title, content } = req.body
  // What if the request does not have a title and/or content?
  const checkFile = fs.existsSync(title)
  if (!checkFile) {
    return res.send('This post does not exist!')
  }
  fs.writeFileSync(title, content);
  res.end('ok')
})

app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.body.title;
  const checkFile = fs.existsSync(title)
  if (checkFile) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.send("no file to be deleted")
  }
})
app.get('/blogs/:title', (req, res) => {
  const title = req.body.title
  const checkFile = fs.existsSync(title)
  if (checkFile) {
    const post = fs.readFileSync(title);
    res.send(post)
  } else {
    res.send("no file to be read")
  }
})
app.listen(3000)