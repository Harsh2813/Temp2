let form = document.getElementById("expense-form");
form.addEventListener('submit', function(e){
    e.preventDefault();
    let amount = document.getElementById("Eamount").value;
    let description = document.getElementById("description").value;
    let catogery = document.getElementById("catogery").value;

    let details = {
        amount : amount,
        description : description,
        catogery : catogery
    };// instead of storing to local storage we save to backend server using crudcrud

    axios.post("https://pay-me-7bba7-default-rtdb.firebaseio.com/expenseTracker.json", details)
    .then((res) => {
        showDetails(details);
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    // let detailsJSON = JSON.stringify(details);
    // localStorage.setItem('details', detailsJSON);
    // console.log("Expense Details stored in local storage", detailsJSON);
    document.getElementById("Eamount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("catogery").value = "";

    //showDetails(details);
});
// window.addEventListener('DOMContentLoaded', ()=>{// this is for tracking page load or refresh but this not wrking
//     axios.get("https://crudcrud.com/api/85d5963841734e2d960d4171f631292b/expenseTracker")
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
    setTimeout(function() {
        const navigationEntries = performance.getEntriesByType('navigation');// this is performance API to track page reload performance.getEntriesByType('navigation'). This method returns an array of navigation performance entries.We check if there are any navigation entries (navigationEntries.length > 0) and if the type of the first entry (navigationEntries[0].type) is 'reload'
        if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
            // Run the loadDataAfterReload function.
            loadDataAfterReload();
        }
    }, 1000);
};

function loadDataAfterReload(){
    axios.get("https://pay-me-7bba7-default-rtdb.firebaseio.com/expenseTracker.json")
    .then((res => {
        let data = res.data;
        for(let key in data){
            showDetails({
                amount: data[key].amount,
                description: data[key].description,
                catogery: data[key].catogery
            })
        }
        console.log(res);
    }))
    .catch((err) => {
        console.log(err);
    });
}

function showDetails(details){
    let parent = document.getElementById("summary");
    let child = document.createElement('li');
    child.textContent = `${details.amount} ${details.description} ${details.catogery}`;

    let deleteBtn = document.createElement('input');
    deleteBtn.value = 'delete';
    deleteBtn.type = 'button';

    deleteBtn.onclick = (details) =>{// Delete fn
        axios.delete(`https://pay-me-7bba7-default-rtdb.firebaseio.com/expenseTracker.json`)
        .then((res) => {
            showDetails(res)
            console.log(res)
            parent.removeChild(child)
        })
        .catch((err) => {
            console.log(err);
        })
        //localStorage.removeItem('details');
        //parent.removeChild(child);
    };

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'edit';
    editBtn.onclick = (id) => {
        const updatedDetails = {
            amount: "free" // You can update other fields here as needed
        };
        axios.patch(`https://pay-me-7bba7-default-rtdb.firebaseio.com/expenseTracker.json`, updatedDetails)
        .then((res) => {
            parent.removeChild(child)
            showDetails(res)
            console.log(res)
        })
        .catch((err) =>{
            console.log(err)
        })
        //localStorage.removeItem('details');
        //parent.removeChild(child);

        document.getElementById("Eamount").value = details.amount;
        document.getElementById("description").value = details.description;
        document.getElementById("catogery").value = details.catogery;
    }
    child.appendChild(deleteBtn);
    child.appendChild(editBtn);
    parent.appendChild(child);
}
