// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserID = document.getElementById("input-update-user-id");
    let updatedEmail = document.getElementById("input-update-email");
    let updatedPhone = document.getElementById("input-update-Phone");
    

    // Get the values from the form fields
    let userID = inputUserID.value;
    let updatedEmailValue = updatedEmail.value;
    let updatedPhoneValue = updatedPhone.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        userID: userID,
        updatedEmail: updatedEmailValue,
        updatedPhone: updatedPhoneValue
        
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // Add the new data to the table
            updateRow(xhttp.response, userID);
            
            inputUserID.value = '';
            updatedEmail.value = '';
            updatedPhone.value = '';
            console.log("it worked");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }
    

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


function updateRow(data, userID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("user-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == userID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdEmail = updateRowIndex.getElementsByTagName("td")[1];
            let tdPhone = updateRowIndex.getElementsByTagName("td")[2];
            
            

            // This processes response from MySQL server

            tdEmail.innerHTML = parsedData[0].user_email;
            tdPhone.innerHTML = parsedData[0].user_phone;
            
       }
    }
};


