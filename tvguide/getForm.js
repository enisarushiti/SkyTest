function getFormXml(){
    var sXml;
    var sType;
    var sValue;
    sXml = "<xml>" + "\n"
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
    sXml = sXml + "</xml>" + "\n";
    alert(sXml);
}