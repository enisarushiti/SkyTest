function fillGuide(){
xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","bond.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 
console.log(xmlDoc);
var numberOfChannels = 6;
var x=xmlDoc.getElementsByTagName("movie");
var channels = ["sean_channel", "roger_channel", "roger_channel", "george_channel", "timothy_channel", "pierce_channel", "daniel_channel"];
var channelHasFilm = {};
console.log(x);

for (i=0;i<channels.length;i++){
  $('#'+channels[i]).empty();
}
for (i=0;i<x.length;i++)
  { 
    var channel = x[i].firstElementChild.localName;  
    channelHasFilm[channel] = "1";
    var startTime = x[i].childNodes[0].nextSibling.getElementsByTagName("start_time")[0].childNodes[0].nodeValue;
    var endTime = x[i].childNodes[0].nextSibling.getElementsByTagName("end_time")[0].childNodes[0].nodeValue;
    var filmName = x[i].childNodes[0].nextSibling.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var startTimeInt = returnIntTime(startTime);
    var endTimeInt = returnIntTime(endTime);
    var width = ((endTimeInt - startTimeInt)/15)*100;
    var margLeft = ((1/30)*100)+(1/15)*(startTimeInt-9)*100;


    $('#'+channel).append("<div id = \"" + filmName + "\" class = \"film box\" style=\"width:" + width + "%; margin-left:" + margLeft + "%;\">"+ filmName + "</div>");
  }

for(i=0; i<channels.length; i++){
  if(channelHasFilm[channels[i]] == null){
    $('#'+channels[i]).append("<div class = \"film box empty\" style=\"width:100%; border:0px;  margin-left:-30%;\">No Programmes Avaliable</div>");
  }
}
}




function returnIntTime(time){
    var intTime;
    if(time.slice(-2) == "pm" && time.substring(0,2) != "12"){
        intTime = parseFloat(time.slice(0, -5)) + (parseFloat(time.substring(0, time.length -2).slice(-2))/60) + 12;
    }else{
        intTime = parseFloat(time.slice(0, -5)) + (parseFloat(time.substring(0, time.length -2).slice(-2))/60);
    }
   // console.log("bit = " + parseFloat(time.substring(0, startTime.length -5 )));
    return intTime;
}


function horizontalNavigation(position, event, time) {
    $('html, body').animate({scrollLeft: position}, time);
    event.preventDefault();
}


$('.scroll.left').click(function (event) {
    var screenWidth = $( window ).width();
    var moveAmmount = ((screenWidth -((screenWidth/100)*18-2))/3.500);
    var rightMov = $("body").scrollLeft() -moveAmmount;
    horizontalNavigation(rightMov, event, 200);
});

$('.scroll.right').click(function (event) {
    var screenWidth = $( window ).width();
    var moveAmmount = ((screenWidth -((screenWidth/100)*18-2))/3.5);
    var leftMov = $("body").scrollLeft() + moveAmmount;
    horizontalNavigation(leftMov, event, 200);
});

function addClickableToFilm(){
$('.film:not(.empty)').click(function (event) {
        console.log("film clicked on");
       $('#horizonRecord').css('visibility','visible');
       $('#popUpBox').css('display','block');
       $('#popUpText').empty();
       $('#popUpText').append("<p style=\"color:black\">"+"The James Bond Movie "+this.id+" is set to be recorded</p>");
});
}

$('#close').click(function (event) {
       var currentPos = $("body").scrollLeft();
        $('#horizonRecord').css('visibility','hidden');
       $('#popUpBox').css('display','none');
       horizontalNavigation(currentPos, event, 0);
});


//Turn the side scroll on/off when hovering on/off the area at the sides of the guide
$('.scroll').hover(function() {  
    if($('#popUpBox').css('display') == 'none') {
  $( this ).toggleClass( "active" ).next().stop( true, true ).slideToggle();
}
});


 $('#channel').click(function SelectName() {
       $('#horizonUpload').css('visibility','visible');
       $('#popUpload').css('display','block');
        fillGuide();
        addClickableToFilm();

});

$('#closeUpload').click(function (event) {
       var currentPos = $("body").scrollLeft();
        $('#horizonUpload').css('visibility','hidden');
       $('#popUpload').css('display','none');
       horizontalNavigation(currentPos, event, 0);
});


$( document ).ready(function() {
  var channels = ["sean_channel", "roger_channel", "roger_channel", "george_channel", "timothy_channel", "pierce_channel", "daniel_channel"];
  for(i=0; i<channels.length; i++){
      $('#'+channels[i]).append("<div class = \"film box empty\" style=\"width:100%; border:0px;  margin-left:-30%;\">No Programmes Avaliable</div>");
  }
});






