

function getFormXml(){
    var sXml;
    var sType;
    var sValue;
    var channelName;
    var filmEl;
    var movieEl =xmlDoc.createElement("movie");
    var nameEl =xmlDoc.createElement("name");
    var startEl =xmlDoc.createElement("start_time");
    var endEl =xmlDoc.createElement("end_time");
    var nameText, startText, endText;
    sXml = "<movie>" + "\n"
    $( "form input" ).each(function() {
        sType = $(this).attr("name");
        sValue = $(this).val();
        if(sType == "actor") {
            console.log($(this).prop("checked"));
            if($(this).prop("checked") == true){
               sXml = sXml + "<" +sValue+">\n"; 
               channelName = sValue;
               filmEl=xmlDoc.createElement(sValue);
            }
        } else if(sType == "name"){
            sValue = $(this).val();
            sXml = sXml + "<" + sType + ">" + sValue + "</" + sType + ">\n";
            nameText =xmlDoc.createTextNode(sValue);
            nameEl.appendChild(nameText);
        } 
        else if(sType == "start_time"){
            sValue = $(this).val();
            sXml = sXml + "<" + sType + ">" + sValue + "</" + sType + ">\n";
            startText =xmlDoc.createTextNode(sValue);
            startEl.appendChild(startText);
        }   
        else if(sType == "end_time"){
            sValue = $(this).val();
            sXml = sXml + "<" + sType + ">" + sValue + "</" + sType + ">\n";
            endText =xmlDoc.createTextNode(sValue);
            endEl.appendChild(endText);
        }     
    });
    sXml = sXml + "</" + channelName + ">\n";
    sXml = sXml + "</movie>" + "\n";
    x=xmlDoc.getElementsByTagName('movie_data');
    movieEl.appendChild(filmEl);
    filmEl.appendChild(nameEl);
    filmEl.appendChild(startEl);
    filmEl.appendChild(endEl);
    x[0].appendChild(movieEl);
    drawTable(xmlDoc);
}

$( document ).ready(function() {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","bond.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    drawTable(xmlDoc);
});

function drawTable(xmlDoc){
    $("#filmTable").empty();
    $("#filmTable").append("<table id='table' border='1'></table>");
    var x=xmlDoc.getElementsByTagName("movie");
        console.log(xmlDoc);
        console.log( x);
    for (i=0;i<x.length;i++)
      { 

          $("#table").append("<tr><td>" + x[i].firstElementChild.localName + 
            "</td><td>" + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + 
            "</td><td>" + x[i].getElementsByTagName("start_time")[0].childNodes[0].nodeValue+"</td><td>"
                + x[i].getElementsByTagName("end_time")[0].childNodes[0].nodeValue+"</td></tr>");
      }

}

function sendDoc() {
        if (window.opener != null && !window.opener.closed) {
            window.close();
            console.log("1");
        }
        window.close();
    }

window.onunload = function (e) {
    opener.somefunction(xmlDoc); //or
    opener.document.getElementById('someid').innerHTML = 'update content of parent window';
};


function getFormXmlOld(){
    var sXml;
    var sType;
    var sValue;
    sXml = "<movie>" + "\n"
    $( "form input" ).each(function() {
        sType = $(this).attr("type");
        sValue = $(this).val();
        if(sType == "checkbox" || sType == "radio") {
            sXml = sXml + "<input type='" + $(this).attr("type") + "' checked='" + $(this).prop("checked") + "'>" + sValue + "</input>" + "\n";
        } else {
            sValue = $(this).val();
            sXml = sXml + "<input type='" + $(this).attr("type") + "'>" + sValue + "</input>" + "\n";
        }   
    });
    sXml = sXml + "</movie>" + "\n";
    alert(sXml);
}