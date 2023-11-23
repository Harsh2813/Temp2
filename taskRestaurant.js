let totalValue = parseFloat(localStorage.getItem("totalValue")) || 0;
let form = document.getElementById("expense-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let amount = document.getElementById("Eamount").value;
  let description = document.getElementById("description").value;

  let details = {
    amount: amount,
    description: description,
  }; // instead of storing to local storage we save to backend server using crudcrud

  axios
    .post(
      "https://crudcrud.com/api/955f6416b57d4cd4a7a446bcd81e6820/expenseTracker",
      details
    )
    .then((res) => {
      showDetails(res.data);
      totalValue += parseFloat(amount);
      updateTotalValue();
    })
    .catch((err) => {
      console.log(err);
    });
  // let detailsJSON = JSON.stringify(details);
  // localStorage.setItem('details', detailsJSON);
  // console.log("Expense Details stored in local storage", detailsJSON);
  document.getElementById("Eamount").value = "";
  document.getElementById("description").value = "";

  //showDetails(details);
});
// window.addEventListener('DOMContentLoaded', ()=>{// this is for tracking page load or refresh but this not wrking
//     axios.get("https://crudcrud.com/api/2a1d31e4d9214c6ba4013caa224ecf16/expenseTracker")
//     .then((res) =>{
//         console.log(res);
//         for(let i=0; i<res.length; i++){
//             showDetails(res[i]);
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })
window.onload = () => {
  // Wait 1 second before checking the page navigation type.
  setTimeout(function () {
    const navigationEntries = performance.getEntriesByType("navigation"); // this is performance API to track page reload performance.getEntriesByType('navigation'). This method returns an array of navigation performance entries.We check if there are any navigation entries (navigationEntries.length > 0) and if the type of the first entry (navigationEntries[0].type) is 'reload'
    if (
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload"
    ) {
      // Run the loadDataAfterReload function.
      loadDataAfterReload();
    }
  }, 1000);
};

async function loadDataAfterReload() {
  try {
    const res = await axios.get("https://crudcrud.com/api/955f6416b57d4cd4a7a446bcd81e6820/expenseTracker");
    
    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(res.data.map(showDetails));

    // Now that all details are processed, update the total value
    updateTotalValue();
  } catch (err) {
    console.log(err);
  }
}

function showDetails(details) {
  let parent = document.getElementById("summary");
  let child = document.createElement("li");
  child.textContent = `${details.amount} ${details.description}`;

  let deleteBtn = document.createElement("input");
  deleteBtn.value = "delete";
  deleteBtn.type = "button";

  deleteBtn.onclick = (details) => {
    // Delete fn
    axios
      .delete(
        `https://crudcrud.com/api/955f6416b57d4cd4a7a446bcd81e6820/expenseTracker/655f81b2f3272103e862e00d/`
      )
      .then((res) => {
        parent.removeChild(child);
        totalValue -= parseFloat(details.amount);
        updateTotalValue();
      })
      .catch((err) => {
        console.log(err);
      });
    //localStorage.removeItem('details');
    //parent.removeChild(child);
  };

  child.appendChild(deleteBtn);
  parent.appendChild(child);
  updateTotalValue();
}
function updateTotalValue() {
  // Convert totalValue to a number if it's not already
  totalValue = parseFloat(totalValue);

  // Now that totalValue is a number, format it with two decimal places
  document.getElementById("total-value").textContent = totalValue.toFixed(2);
  localStorage.setItem("totalValue", totalValue);
}