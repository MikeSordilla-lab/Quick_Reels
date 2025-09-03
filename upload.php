<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Video with Sidebar</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Ensure html and body take full viewport height */
        html, body {
            height: 100%;
            /* Allow body to scroll if the app-container's content overflows */
            overflow: auto;
            /* Prevent horizontal scroll */
            overflow-x: hidden;
            font-family: sans-serif; /* Added font family */
            line-height: 1.6; /* Added line height */
            color: #333; /* Added default text color */
        }

        body {
            /* Removed centering styles as grid handles main layout */
            min-height: 100vh;
        }

        /* App Container using Grid */
        .app-container {
            display: grid;
            height: 100vh; /* Full viewport height */
            grid-template-columns: 250px 1fr; /* Fixed sidebar width, flexible main content */
            grid-template-rows: 1fr; /* Single row taking available height */
            grid-template-areas:
                "sidebar main"; /* Define grid areas */
            gap: 0;
            width: 100%;
            /* Allow individual grid areas to scroll, not the container */
            overflow: hidden;
        }

        /* Left Sidebar Styling */
        .left-sidebar {
            grid-area: sidebar; /* Assign to sidebar grid area */
            background-color: #f8f8f8; /* Light background */
            padding: 20px;
            box-shadow: 2px 0 5px rgba(0,0,0,0.05); /* Subtle shadow on the right edge */
            overflow-y: auto; /* Add scrollbar if content overflows vertically */
        }

        /* Styling for sidebar content */
        .left-sidebar h2, .left-sidebar h3 { margin-top: 0; margin-bottom: 15px; color: #555; }
        .left-sidebar nav ul, .left-sidebar ul { list-style: none; padding: 0; margin-bottom: 20px; }
        .left-sidebar li { margin-bottom: 10px; }
        .left-sidebar a { text-decoration: none; color: #333; display: block; padding: 5px 0; transition: color 0.2s ease; }
        .left-sidebar a:hover { color: #007bff; }
        .left-sidebar hr { border: none; height: 1px; background-color: #eee; margin: 20px 0; }

        /* Main Content Area (for the upload form) */
        .main-content {
            grid-area: main; /* Assign to main grid area */
            padding: 20px;
            overflow-y: auto; /* Add scrollbar if content overflows vertically */
            display: flex; /* Use flexbox to center the upload container */
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
             /* min-height: 100%; */
        }

        /* Styles for the Upload Form Container */
        .upload-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px; /* Limit the max width of the upload box */
            text-align: center;
            /* margin: auto; removed as flexbox centering is used */
        }

        .upload-container h2 {
            margin-top: 0;
            margin-bottom: 20px;
            color: #333;
        }

        /* Style the form itself */
        .upload-form {
             /* Keeping flexbox from original for simple file input alignment */
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px; /* Add space between form elements */
        }

        /* Style the default file input */
         .upload-form input[type="file"] {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%; /* Make file input take full width of container */
         }

        /* Style the submit button */
        .upload-button {
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
            width: 100%; /* Make button take full width of container */
        }

        .upload-button:hover {
            background-color: #0056b3;
        }

        /* Optional: Style for messages - kept but not used by simple form */
        .message {
            margin-top: 20px;
            padding: 10px;
            border-radius: 4px;
            font-size: 0.9em;
        }

        .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

    </style>
</head>
<body>
    <div class="app-container">
        <aside class="left-sidebar">
            <h2>QuickReels</h2>
            <nav>
                <ul>
                    <li><a href="welcome.php">FYP</a></li>
                    <li><a href="profile.php">Profile</a></li>
                    <li><a href="upload.php">Upload</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <div class="upload-container">
                <h2>Upload Your Video</h2>
                <form class="upload-form" action="uploadb.php" method="post" enctype="multipart/form-data">

                    <input type="file" name="my_video" accept="video/*">

                    <input type="submit" name="submit" class="upload-button" value="Upload Video">

                </form>
                 <div id="uploadMessage" class="message"></div>
            </div>
        </main>
    </div>

    </body>
</html>