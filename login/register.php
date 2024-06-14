<?php  
 
 $server = "localhost";
 $username = "root";
 $password = "";
 $database = "beatwave";


 $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 
if(isset($_POST['signUp'])){ 
    $Name=$_POST['fName']; 
    // $lastName=$_POST['lName']; 
    $email=$_POST['email'];
    $username = $_POST['usernmae']; 
    $password=$_POST['password']; 
    $password=md5($password); 
 
     $checkEmail="SELECT * From users where email='$email'"; 
     $result=$conn->query($checkEmail); 
     if($result->num_rows>0){ 
        echo "Email Address Already Exists !"; 
     } 
     else{ 
        $insertQuery="INSERT INTO register(Name,email,username,password) 
                       VALUES ('$tName','$email','$username','$password')"; 
            if($conn->query($insertQuery)==TRUE){ 
                header("location: index.php"); 
            } 
            else{ 
                echo "Error:".$conn->error; 
            } 
     } 
    
 
} 
 
if(isset($_POST['signIn'])){ 
   $email=$_POST['email']; 
   $password=$_POST['password']; 
   $password=md5($password) ; 
    
   $sql="SELECT * FROM register WHERE email='$email' and password='$password'"; 
   $result=$conn->query($sql); 
   if($result->num_rows>0){ 
    session_start(); 
    $row=$result->fetch_assoc(); 
    $_SESSION['email']=$row['email']; 
    header("Location: homepage.php"); 
    exit(); 
   } 
   else{ 
    echo "Not Found, Incorrect Email or Password"; 
   } 
 
} 
?>