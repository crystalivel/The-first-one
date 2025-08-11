const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/posts.json');
function readPostsFromFile() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading posts:', err);
    return [];
  }
}
function writePostsToFile(posts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing posts:', err);
  }
}

exports.getAllPosts = () => {
  return readPostsFromFile();
};
exports.createPost = (postData) => {
  const posts = readPostsFromFile();

  const newPost = {
    id: Date.now(),
    title: postData.title,
    content: postData.content
  };

 posts.push(newPost);
  writePostsToFile(posts);
  return newPost;
};
exports.getPostById = (id) => {
  const posts = readPostsFromFile();
  return posts.find(post => post.id === id);
};
exports.deletePost = (id) => {
  let posts = readPostsFromFile();
  const originalLength = posts.length;
  posts = posts.filter(post => post.id !== id);

  if (posts.length < originalLength) {
    writePostsToFile(posts);
    return true;
  }

  return false;
};