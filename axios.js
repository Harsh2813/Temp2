// AXIOS GLOBALS
axios.defults.headers.common['Authorization-Token'] = 'any url--- token';

// GET REQUEST = to get data from server. Remember axios is a library by which we r interacting to backend api data
function getTodos() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5"), {timeout: 5000} // ?_limit=5 in last is param or parameter
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST for posting data to sever
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      // we have to pass data as parameter here
      title: "new Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST for change or update data
function updateTodo() {
  // axios.put("https://jsonplaceholder.typicode.com/todos/1", {//in put we have to pass all parameters other wise only those thing we will see which we pass not all
  //     title : "updated todo",
  //     completed : true
  // })
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      //in patch we can pass only that which we want to update it means we use put for changing whole thing and patch for some update
      title: "updated todo",
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA for using more than one api url
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    // .then(res => { // instead of doing this console we can use spread operator by passing function
    //     console.log(res[0]);// we are taking array of api inside axios.all that's why for console.log we have denote
    //     console.log(res[1]);// its indices by [0] and [1]
    //     showOutput(res[1]);// and here we are showing one of the index response
    // })
    .then(axios.spread((todos, posts) => showOutput(posts))) // posts will show if we pass todos so it will show
    .catch((err) => console.error(err));
}

// CUSTOM HEADERS for printing in header so that at every get or post we get that same thing in header
function customHeaders() {
    const config = { // iside config object we have headers object 
        headers : {
            'content-type' : 'application/Json',
            Authorization : 'someToken'
        }
    }
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      // we have to pass data as parameter here
      title: "new Todo",
      completed: false,
    }, config) // passed config as third paramater
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES like for small case to uper case some data
function transformResponse() {
  const option = {
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/posts',
    data : {
        title : 'Hello World'
    }, transformResponse: axios.defults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
    })
  };
  axios(option).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/posts'), {
    ValidityStatus: function(status){
        return status < 500; // reject only if status is greater or equal to 500
    }
  }
  .catch(err => {
    if(err.response){// if server responded with satatus other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        if(err.response.status === 404){
            alert("Error: Page not found");
        }
    }
    else if(err.request){// request was made but no response
        console.error(err.request);
    }
    else{
        console.error(err.message);
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.cancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/posts', {
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
        console.log('request canceled', thrown.message);
    }
  })
  if(true){
    source.cancel('request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES to show something about data
axios.interceptors.request.use(
  // we are printing for method that this url sent at this time
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (erro) => {
    return Promse.reject(error);
  }
);

// AXIOS INSTANCES
const axiosinstances = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});
//axiosinstances.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);


//question 1 = we need headers becuase it is main and common part of every data which we fetch from server like if we want to pass a common thing to all post method we can use header so set it in header
// question2 = Axios is just a library of platform by which we can interact to backend and fetch data from server
// question3 = some of the common problems which we face while network call like 404 error payload error wrong url etc. we have to do error handling for this and we have to use postman to check for 404 error