<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      
        body {
            background:url(img/bgg.jpg); 
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .login-container {
            max-width: 900px; 
            background-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(1px); 
            padding: 19px;
            border-radius: 10px;
            text-align: center;
            color: #333;
  }
         .left-panel {
             background: linear-gradient(280deg, #271939, #ebe8e9); 
             border-radius: 25px; 
         }
         
         .btn-custom-primary {
             background: linear-gradient(150deg, #000000, #ebe8e9); 
             border-color: white;
             color: white;
             border-radius: 30px; 
             padding: 12px; 
             font-size: 1.1rem; 
             transition: background-color 0.3s ease;
         }
         .btn-custom-primary:hover {
          background: linear-gradient(250deg, #000000, #ebe8e9);
             border-color: White;
             color: white;
         }
         
         .forgot-link,
         .form-container a {
             color: #39e10f; 
         }
         
         .text-azure { 
             color: azure;
         }
    </style>
</head>
<body class="d-flex justify-content-center align-items-center min-vh-100 p-4">
    <div class="container login-container">
        <div class="row g-0">
            <div class="col-md-6 left-panel d-flex flex-column justify-content-center align-items-center text-center p-4 text-white">
                <h2 class="fs-2 mb-2">Welcome Back!</h2>
                <p class="fs-6 opacity-75">Please log in using your username.</p>
            </div>

            <div class="col-md-6 form-container d-flex flex-column justify-content-center p-4">
                <h2 class="text-center mb-4" style="color: #ffffff;">Login</h2>

                <form id="loginForm" action="login.php" method="POST">
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Username" name="username" required>
                    </div>
                    <div class="mb-2">
                        <input type="password" class="form-control" placeholder="Password" name="password" required>
                    </div>
                    <div class="text-center mb-3 text-end">
                         <a href="#" class="forgot-link text-decoration-none small">Forgot Password?</a>
                    </div>

                    <button type="submit" id="loginButton" class="btn btn-custom-primary w-100">Login</button>

                    <div class="text-center mt-3 text-azure">
                        Don't have an account? <a href="register_form.php" class="text-decoration-none">Register here</a>
                    </div>
                </form>
            </div>

            
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>