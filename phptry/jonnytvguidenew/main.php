<?php

   require_once 'google/appengine/api/cloud_storage/CloudStorageTools.php';
   use google\appengine\api\cloud_storage\CloudStorageTools;

   $options = [ 'gs_bucket_name' => 'jonnytvguidenew.appspot.com' ];
   $upload_url = CloudStorageTools::createUploadUrl('/upload', $options);

?>
<!DOCTYPE html>
<html>
<head>
<title></title>
</head>
<body>
<?php

if(isset($_POST['do-upload']) AND $_POST['do-upload'] === "yes"){

   $yesupload = $_POST['do-upload'];
   preg_match("/yes/", "".$yesupload."");

   $filename = $_FILES['testupload']['name'];
   
   $gs_name = $_FILES['testupload']['tmp_name'];
   move_uploaded_file($gs_name, 'gs://jonnytvguidenew.appspot.com/'.$filename.'');

?>
<div class="contentArea">
<?php
   echo "<p class=\"SomeSpaceDude\">Hey file is uploaded, Yes! ".$yesupload." !</p>";
   echo "<p class=\"SomeSpaceDude\">This is the file name: ".$filename."</p>";
   }
   
   echo "</div>";
?>
<form class="SomeSpaceDude" action="<?php echo $upload_url?>" enctype="multipart/form-data" method="post">
   <p>Files to uploads: </p> <br>
   <input type="hidden" name="do-upload" value="yes">
   <input class="SomeSpaceDude topcoat-button" type="file" name="testupload" >
   <input class="SomeSpaceDude topcoat-button" type="submit" value="Upload">
</form>
</div>
</body>
</html>