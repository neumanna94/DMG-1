function apiRequestForWidget(){
  var method = 'GET';

  var url = 'https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json';

    console.log(url);

  var xhr = new XMLHttpRequest();

  if(!('withCredentials' in xhr)) {
    console.log("Browser does not support CORS");
    alert('Browser does not support CORS.');
    return;
  }

  xhr.open(method, url);

  xhr.oneerror = function() {
    console.log("oneerror");
    alert('There was an error.');
  };

  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    console.log("Data below");
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
    } else {
      console.log("else");
    }
    generateWidget(data);
  };
  xhr.send();
}
function generateWidget(inputData){
  let timeSlots = inputData.scheduleDays[0].timeSlots;
  console.log(timeSlots);
  for(var i = 0; i < timeSlots.length; i ++){
    $("#timeSlotsDiv").append("<div class='col-md-3'><button class='btn btn-primary'>" + slotDateTimeFormatter(timeSlots[i].slotDateTime) + "</button></div>");
  }
}

function slotDateTimeFormatter(inputSlotDateTime){
  //Converting timeslot into a date object.
  let inputDate = new Date(inputSlotDateTime);

  let displayHours = inputDate.getHours();
  let displayMinutes = inputDate.getMinutes();

  //Conditional Logic for display to meet prompt.
  if(displayMinutes == 0){
    displayMinutes = "00";
  }
  if(inputDate.getHours() < 12){
    return displayHours + ":" + displayMinutes + "a";
  } else {
    return displayHours + ":" + displayMinutes + "p";
  }
}

apiRequestForWidget();
