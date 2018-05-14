function apiRequestForWidget(){
  var method = 'GET';
  var url = 'https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json';
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
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
    } else {
    }
    $(".initHidden2").toggle();
    generateWidget(data);
  };
  xhr.send();
}
function generateStaticContent(){
  $("#addContentHere").append("<div class='row'><div class='col-md-12'><h3><strong> Book Online </strong></h3><h6><strong><a href='#'> What do we treat </a> &nbsp &nbsp &nbsp &nbsp<a href='#'> How much will it cost?</a></strong></h6><hr><h4><strong> Tomorrow </strong></h4><div class='row' id='timeSlotsDiv'></div></div></div>");

}
function generateWidget(inputData){
  generateStaticContent();
  let timeSlots = inputData.scheduleDays[0].timeSlots;
  for(var i = 0; i < timeSlots.length; i ++){
    if(i > 10){
      $("#timeSlotsDiv").append("<a href='#' class='initHidden'><div class='col-md-3'><button class='btn btn-primary'>" + slotDateTimeFormatter(timeSlots[i].slotDateTime) + "</button></div></a>");
      if(i==11){
        $("#timeSlotsDiv").append("<div class='col-md-3'><button class='btn btn-secondary' id='more'> More </button></div>");
        $("#more").click(function() {
          displayHiddenButtons();
        });
      }
    } else {
      $("#timeSlotsDiv").append("<a href='#'><div class='col-md-3'><button class='btn btn-primary'>" + slotDateTimeFormatter(timeSlots[i].slotDateTime) + "</button></div></a>");
    }
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
    return displayHours%12 + ":" + displayMinutes + "a";
  } else {
    return displayHours%12 + ":" + displayMinutes + "p";
  }
}
function displayHiddenButtons(){
  $("#more").parent().toggle();
  $(".initHidden").toggle();
}
