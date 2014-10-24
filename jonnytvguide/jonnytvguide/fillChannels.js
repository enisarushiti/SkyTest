function returnIntTime(time){
    var intTime;
    if(time.slice(-2) == "pm" && time.substring(0,2) != "12"){
        intTime = parseFloat(time.slice(0, -5)) + (parseFloat(time.substring(0, time.length -2).slice(-2))/60) + 12;
    }else{
        intTime = parseFloat(time.slice(0, -5)) + (parseFloat(time.substring(0, time.length -2).slice(-2))/60);
    }
    console.log("bit = " + parseFloat(time.substring(0, startTime.length -5 )));
    return intTime;
}


xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","bond.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 
var numberOfChannels = 6;
var x=xmlDoc.getElementsByTagName("movie");
var channels = ["sean_channel", "roger_channel", "roger_channel", "george_channel", "timothy_channel", "pierce_channel", "daniel_channel"];
var channelHasFilm = {};
for (i=0;i<x.length;i++)
  { 
    var channel = x[i].childNodes[0].nextSibling.nodeName;  
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




function horizontalNavigation(position, event, time) {
    $('html, body').animate({scrollLeft: position}, time);
    event.preventDefault();
}


$('.scroll.left').click(function (event) {
    var screenWidth = $( window ).width();
    var moveAmmount = ((screenWidth -((screenWidth/100)*18))/3.5);
    var rightMov = $("body").scrollLeft() -moveAmmount;
    horizontalNavigation(rightMov, event, 400);
});

$('.scroll.right').click(function (event) {
    var screenWidth = $( window ).width();
    var moveAmmount = ((screenWidth -((screenWidth/100)*18))/3.5);
    var leftMov = $("body").scrollLeft() + moveAmmount;
    horizontalNavigation(leftMov, event, 400);
});


$('.film:not(.empty)').click(function (event) {
       $('#horizon').css('visibility','visible');
       $('#popUpBox').css('display','block');
       $('#popUpText').empty();
       $('#popUpText').append("<p style=\"color:black\">"+"The James Bond Movie "+this.id+" is set to be recorded</p>");
});

$('#close').click(function (event) {
       var currentPos = $("body").scrollLeft();
        $('#horizon').css('visibility','hidden');
       $('#popUpBox').css('display','none');
       horizontalNavigation(currentPos, event, 0);
});

$('.scroll').hover(function() {  
  $( this ).toggleClass( "active" ).next().stop( true, true ).slideToggle();
});



