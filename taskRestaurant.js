let totalValue = 0;
let form = document.getElementById("expense-form");
let editId = null; // Variable to store the ID of the expense being edited

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let amount = document.getElementById("Eamount").value;
  let description = document.getElementById("description").value;

  let details = {
    amount: amount,
    description: description,
  }; // instead of storing to local storage, we save to the backend server using crudcrud

  try {
    if (editId) {
      // If editId is present, update the existing expense
      const response = await axios.patch(
        `https://pay-me-7bba7-default-rtdb.firebaseio.com/Restaurant/${editId}.json`,
        details
      );
      // Update the UI with edited details
      const child = document.getElementById(editId);
      totalValue -= parseFloat(child.textContent.split(' ')[0]); //suppose '50 food' this was our targeted list of edit then we taken its id in child and child.textcontent gives whole content of that id like here 50 food, now we use split(This splits the text content into an array of substrings using a space character'') it using '' so it becomes aray of subtring like ['50', 'food'] now by [0] it is index of first element 50 so we changed it using parseFloat and subtracted it by our total value and added new amount below in total value.

      child.textContent = `${details.amount} ${details.description}`;
      totalValue += parseFloat(details.amount); // Add new amount after subtracting old amount above


      editId = null; // Reset editId after updating
    } else {
      // Otherwise, add a new expense
      const res = await axios.post(
        `https://pay-me-7bba7-default-rtdb.firebaseio.com/Restaurant.json`,
        details
      );
      showDetails(res.data.name, details);
      totalValue += parseFloat(amount);
    }

    await updateTotalValue();
  } catch (err) {
    console.log(err);
  }

  document.getElementById("Eamount").value = "";
  document.getElementById("description").value = "";
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
    const res = await axios.get(
      `https://pay-me-7bba7-default-rtdb.firebaseio.com/Restaurant.json`
    );

    let data = res.data;
    // Reset total value before loading data
    totalValue = 0;

    // Process each expense item and update total value
    for (let key in data) {
      showDetails(key, {
        // Pass the ID as the first parameter
        amount: data[key].amount,
        description: data[key].description,
      });
      totalValue += parseFloat(data[key].amount);
    }
    // Update total value after all expenses are processed
    await updateTotalValue();
  } catch (err) {
    console.log(err);
  }
}

async function showDetails(id, details) {
  let parent = document.getElementById("summary");
  let child = document.createElement("li");
  child.id = id; // Set id for the child element
  child.textContent = `${details.amount} ${details.description}`;

  let deleteBtn = document.createElement("input");
  deleteBtn.value = "delete";
  deleteBtn.type = "button";

  deleteBtn.onclick = async () => {
    // Delete fn
    try {
      await axios.delete(
        `https://pay-me-7bba7-default-rtdb.firebaseio.com/Restaurant/${id}.json`
      );
      parent.removeChild(child);
      totalValue -= parseFloat(details.amount);
      await updateTotalValue();
    } catch (err) {
      console.log(err);
    }

    // localStorage.removeItem('details');
    // parent.removeChild(child);
  };

  let editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "edit";
  editBtn.onclick = () => {
    // Set editId to the ID of the expense being edited
    editId = id;
    // Populate input fields with existing details
    document.getElementById("Eamount").value = details.amount;
    document.getElementById("description").value = details.description;
  };

  child.appendChild(deleteBtn);
  child.appendChild(editBtn);
  parent.appendChild(child);
}

function updateTotalValue() {
  // Convert totalValue to a number if it's not already
  totalValue = parseFloat(totalValue);

  // Now that totalValue is a number, format it with two decimal places
  document.getElementById("total-value").textContent = totalValue.toFixed(2);
}
