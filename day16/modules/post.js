const fs = require ('fs')
const path = require ('path');
const { json } = require('stream/consumers');



const filePath = path.join(__dirname,'../data/post.js');


function generateId () {
  return Date.now().toString() + Math.floor(Math.random()*9999).toString();
}
function readPostFile() {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

function writePostsFile(data){
  const data = fs .readFileSync(filePath,'utf-8')
  return JSON.parse(data)
}

exports.getallposts = () => {
  return readPostFile();
}
exports.createPost = (post) => {
  const posts = readPostFile();
  const newPost = {id:generateId(), ...post,createdAt: new Date().toISOString()}
  posts.push(newPost)
  writePostsFile(posts)
  return newPost
}

exports.updatePost = (id,updatedPost) => {
  const posts = readPostFile();
  const index = posts.findIndex(post => post.id === id );
  b 
}