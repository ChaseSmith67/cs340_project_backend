// Get the objects we need to modify
let updateUserForm = document.getElementById("update-age-form-ajax");

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAgeID = document.getElementById("input-update-age-id");
    let updatedDescription= document.getElementById("input-update-description");
    
    

    // Get the values from the form fields
    let ageID = inputAgeID.value;
    let updatedDescriptionValue = updatedDescription.value;
    
    
    // Put our data we want to send in a javascript object
    let data = {
        ageID: ageID,
        updatedDescription: updatedDescriptionValue
        
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-age-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // Add the new data to the table
            updateRow(xhttp.response, userID);
            
            inputAgeID.value = '';
            updatedDescription.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }
    

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


function updateRow(data, ageID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("age-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == ageID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdDescription = updateRowIndex.getElementsByTagName("td")[1];
            
            

            // This processes response from MySQL server

            tdDescription.innerHTML = parsedData[0].age_rating_description;
            
            
       }
    }
};
