//getting objects

let updatePersonForm = document.getElementById("update-actor-form-ajax");

updatePersonForm.addEventListener("submit", function(e) {

    // prevent form from submitting
    e.preventDefault();

    //getting forms

    let inputFullName = document.getElementById("mySelect");
    let inputBirthDate = document.getElementById("input-birthdate-update");
    let inputActorID = document.getElementById("input-update-actor-id");

    //getting values from the fields
    let actorID = inputActorID.value;
    let fullNameValue = inputFullName.options[inputFullName.selectedIndex].text;
    let birthDateValue = inputBirthDate.value;
    

    /*if (isNaN(Date.parse(birthDateValue))) {
        console.log("Invalid date format");
        return;
    }*/

    let data = {

        fullName: fullNameValue,
        birthDate: birthDateValue,
        actorID: actorID

    };

    //let actorId = inputFullName.options[inputFullName.selectedIndex].value;

    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/update-actor-ajax" , true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {

        //add the new data
        if(xhttp.readyState == 4 && xhttp.status == 200){

            updateRow(xhttp.response, actorID);
            inputActorID.value = '';
            fullName.value = '';
            birthDate.value = '';

        }else if(xhttp.readyState == 4 && xhttp.status != 200){

            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));


});

function updateRow(data, actorID) {
    console.log(data);
    let parsedData = JSON.parse(data);
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == actorID) {
 
             // Get the location of the row where we found the matching person ID
             let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td of homeworld value
             let tdbirthday = updateRowIndex.getElementsByTagName("td")[4];
            
             tdbirthday.innerHTML = parsedData[0].birthday;
        }
     }
 };
 

