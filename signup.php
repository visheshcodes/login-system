<?php
//error_reporting(0);

include_once("utility/setupDB.php");
include_once("utility/getToken.php");

if(isset($_POST["username"]) && isset($_POST["password"])){
	$user = $_POST["username"];
	$pass = $_POST["password"];
}else{
	die('{"loginStatus": "variables not set"}');
}

$conn = new mysqli("localhost", "root");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error . ", errno: " . $conn->connect_errno);
}

setupDB($conn);

$sql = "SELECT userid FROM userdata WHERE userid LIKE '$user'";
$result = $conn->query($sql);

if($result && $result->num_rows > 0 && $row = $result->fetch_assoc()){
	die('{"loginStatus": "userExists"}');
}

echo "\nuser does not exists\n";

$sql = "insert into userdata(userid, password) values('$user', '$pass')";

if($conn->query($sql) === TRUE){
	echo '{"loginStatus": "signed up"}';
} else {
	die($conn->error);
}
	
if($token = getToken($conn)){
	$sql = "insert into usertoken(userid, token) values('$user', '$token')";

	if($conn->query($sql) === TRUE){
		echo "Cookie has been set\n";
	} else {
		die("Error storing token: " . $conn->error);
	}

	setcookie("token", $token, time() + 3600, "/");
}

$conn->close();
?>