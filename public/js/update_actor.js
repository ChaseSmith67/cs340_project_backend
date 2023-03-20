//getting objects
//update for actors page
let updatePersonForm = document.getElementById("update-actor-form-ajax");

updatePersonForm.addEventListener("submit", function(e) {

    // prevent form from submitting
    e.preventDefault();

    //getting forms
    
    let inputFirstName = document.getElementById("input-update-firstname");
    let inputLastName = document.getElementById("input-update-lastname");
    let inputBirthDate = document.getElementById("input-birthdate-update");
    let inputActor_ID = document.getElementById("input-update-actor-id");

    //getting values from the fields
    let actorID_Value = inputActor_ID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let birthDateValue = inputBirthDate.value;
    


    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        actor_birth_date: birthDateValue,
        actor_ID: actorID_Value
        
    };
    console.log(firstNameValue);
    
    //let actorId = inputFullName.options[inputFullName.selectedIndex].value;

    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/update-actor-ajax" , true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {
        
        //add the new data
        if(xhttp.readyState == 4 && xhttp.status == 200){
            
            updateRow(xhttp.response, actorID_Value);
    
        }else if(xhttp.readyState == 4 && xhttp.status != 200){

            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));


});

function updateRow(data, actorID) {
    
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == actorID) {
 
             // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td of homeworld value
            
            let tdfirstname = updateRowIndex.getElementsByTagName("td")[1];
            console.log(tdfirstname);
            let tdlastname = updateRowIndex.getElementsByTagName("td")[2];
            let tdbirthday = updateRowIndex.getElementsByTagName("td")[3];

           
            tdbirthday.innerHTML = parsedData[0].birthday;
            tdfirstname.innerHTML = parsedData[0].first_name;
            tdlastname.innerHTML = parsedData[0].last_name;
        }
     }
 };
 
