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
    };
    let detailsJSON = JSON.stringify(details);
    localStorage.setItem('details', detailsJSON);
    console.log("Expense Details stored in local storage", detailsJSON);
    document.getElementById("Eamount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("catogery").value = "";

    showDetails(details);
});

function showDetails(details){
    let parent = document.getElementById("summary");
    let child = document.createElement('li');
    child.textContent = `${details.amount} ${details.description} ${details.catogery}`;

    let deleteBtn = document.createElement('input');
    deleteBtn.value = 'delete';
    deleteBtn.type = 'button';

    deleteBtn.onclick = () =>{
        localStorage.removeItem('details');
        parent.removeChild(child);
    };

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'edit';
    editBtn.onclick = () => {
        localStorage.removeItem('details');
        parent.removeChild(child);

        document.getElementById("Eamount").value = details.amount;
        document.getElementById("description").value = details.description;
        document.getElementById("catogery").value = details.catogery;
    }
    child.appendChild(deleteBtn);
    child.appendChild(editBtn);
    parent.appendChild(child);
}
