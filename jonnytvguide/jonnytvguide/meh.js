function returnIntTime(time){
    var intTime;
    if(time.slice(-2) == "pm"){
        intTime = parseFloat(time.substring(0, startTime.length -2 )) + 12;
    }else{
        intTime = parseFloat(time.substring(0, startTime.length -2 ))
    }
    return intTime;
}




  console.log("hi");
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET","bond.xml",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML; 

var x=xmlDoc.getElementsByTagName("movie");
for (i=0;i<x.length;i++)
  { 
    var channel = x[i].childNodes[0].nextSibling.nodeName;  
    var startTime = x[i].childNodes[0].nextSibling.getElementsByTagName("start_time")[0].childNodes[0].nodeValue;
    var endTime = x[i].childNodes[0].nextSibling.getElementsByTagName("end_time")[0].childNodes[0].nodeValue;
    var filmName = x[i].childNodes[0].nextSibling.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var startTimeInt = returnIntTime(startTime);
    console.log("start time = " + startTimeInt);
    var endTimeInt = returnIntTime(endTime);
    console.log("end time = " + endTimeInt);
    var width = ((endTimeInt - startTimeInt)/7);
    console.log("width = " + width);
    var margLeft = (1/7)*(startTimeInt-21);
    console.log("margLeft = " + width);



    
    $('#'+channel).append("<div class = \"film box\" style=\"width:" + width + "%; margin-left:" + margLeft + "%;\"> "+ filmName + "</div>");
  /*document.write("<tr><td>");
  document.write(x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue);
  document.write("</td><td>");
  document.write(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);
  document.write("</td></tr>");*/
  }
