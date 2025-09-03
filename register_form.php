    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url(img/bgg.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        .register-container {
            max-width: 1000px;
            background-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(0.5px);
            padding: 19px;
            border-radius: 5px;
        }

        .left-panel {
            background: linear-gradient(80deg, #271939, #ebe8e9);
            border-radius: 25px;
        }

         .form-container h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #66a6ff;
        }

        .btn-custom-primary {
            background-color: #66a6ff;
            border-color: #66a6ff;
            color: white;
            border-radius: 30px;
            padding: 12px;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
        }
        .btn-custom-primary:hover {
            background-color: #4d94ff;
            border-color: #4d94ff;
            color: white;
        }

         .form-container a {
             color: #66a6ff;
             text-decoration: none;
         }
          .forgot-link:hover {
             text-decoration: underline;
          }

         .text-azure {
             color: azure;
         }

         .register-container .row > .left-panel {
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
          }
           .register-container .row > .form-container {
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
               border-top-left-radius: 0;
               border-bottom-left-radius: 0;
           }


    </style>
</head>
<body class="d-flex justify-content-center align-items-center min-vh-100 p-4">
    <div class="container register-container">
        <div class="row g-0">
            <div class="col-md-6 left-panel d-flex flex-column justify-content-center align-items-center text-center p-4 text-white">
                <h2 class="fs-2 mb-2">Hello, Friend!</h2>
                <p class="fs-6 opacity-75">Enter your details and start your journey with us.</p>
            </div>

            <div class="col-md-5 form-container d-flex flex-column justify-content-center p-4">
                <h2 class="text-center mb-4" style="color: #66a6ff;">Register</h2>

                <form action="register.php" method="POST">
                    
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Username" name="username" required>
                    </div>
                    <div class="mb-4">
                         <input type="password" class="form-control" placeholder="Password" name="password" required>
                    </div>

                    <button type="submit" class="btn btn-custom-primary w-100">Register</button>

                    <div class="text-center mt-3 text-azure">
                         Already have an account?
                         <a href="index.php" class="text-decoration-none" style="color: #66a6ff;">Login here</a>
                    </div>
                </form>
            </div>
            
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>