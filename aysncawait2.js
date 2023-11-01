const posts = [];

function createPost(newPost) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(newPost);
      console.log(posts);
      resolve(newPost); // Resolve with the new post
    }, 1000);
  });
}

function updateLastUserActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let time = new Date().getTime();
      console.log(time);
      resolve(time); // Resolve with the time
    }, 1000);
  });
}

function deletePost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        const poppedElement = posts.pop();
        resolve(poppedElement); // Resolve with the deleted post
      } else {
        reject("ERROR: ARRAY IS EMPTY");
      }
    }, 1000);
  });
}

async function main() {
    try {
      const newPost = await createPost({ title: 'Post Five', body: 'This is Post Five' });
      const lastActivityTime = await updateLastUserActivityTime();
  
      console.log("All promises resolved:");
      console.log("Posts:", posts);
      console.log("Last Activity Time:", lastActivityTime);
  
      const deletedPost = await deletePost();
      console.log("Deleted Post:", deletedPost);
      console.log("Remaining Posts:", posts);
    } catch (error) {
      console.error(error);
    }
}
  
main();