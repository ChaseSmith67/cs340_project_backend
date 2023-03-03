//getting objects

let updatePersonForm = document.getElementById("update-actor-form-ajax");

updatePersonForm.addEventListener("submit", function(e) {

    // prevent form from submitting
    e.preventDefault();

    //getting forms

    let inputFullName = document.getElementById("mySelect");
    let inputBirthDate = document.getElementById("input-birthdate-update");

    //getting values from the fields

    let fullNameValue = inputFullName.value;
    let birthDateValue = inputBirthDate.value;

    if(isNaN(fullNameValue)){

        return;
    }

    let data = {
        firstName: fullNameValue,
        birthDate: birthDateValue,

    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/put-person-ajax", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {

        //add the new data
        if(xhttp.readyState == 4 && xhttp.status == 200){

            updateRow(xhttp.response, fullNameValue);
            //updateRow(xhttp.response, birthDateValue);

        }else if(xhttp.readyState == 4 && xhttp.status != 200){

            console.log("There was an error with the input.")
        }
    }

    xhttp.send(json.stringify(data));


})

function updateRow(data, actorID){

    let parsedData = json.parse(data);
    let table = document.getElementById("actor-table");
    var counter;

    //for loop to iterate

    for(var i = 0, row; row = table.rows[i]; i++){

        if(table.row[i].getAttribute("data-value") == actorID){
            var counter = i;

            let currentTable = document.getElementById("actor-table");
            //find location of id and get td of names

            let updatedRowIndex = currentTable.getElementsByTagName("tr")[counter];
            let td = updatedRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].birthDate;
            
        }
    }
}