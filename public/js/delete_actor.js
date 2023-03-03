
function deleteActor(actor_id) {
    let link = '/delete-actor-ajax/';
    let data = {
      id: actor_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(actor_id);
      }
    });
  }

  function deleteRow(actor_id){

    let table = document.getElementById("people-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == actor_id) {
            table.deleteRow(i);
            break;
       }
    }
}