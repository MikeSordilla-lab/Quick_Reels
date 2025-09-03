<?php
session_start(); // Start the session at the very beginning

// Check if the user is logged in, if not then redirect to login page
if (!isset($_SESSION['username'])) {
    header("Location: index.php");
    exit;
}

$loggedInUsername = $_SESSION['username']; // Get username from session
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickReels - TikTok Style</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container" id="appSection"> <aside class="left-sidebar">
            <h2>QuickReels</h2>
            <nav>
                <ul>
                    <li><a href="#">For You</a></li>
                    <li><a href="upload.php">Upload</a></li>
                    <li><a href="profile.php">Profile</a></li>
                    
                </ul>
            </nav>
            <hr>
            <div class="user-info-sidebar">
                 <p>Logged in as: <strong id="loggedInUsername"><?php echo htmlspecialchars($loggedInUsername); ?></strong></p>
                 <button id="logoutButton" class="auth-button">Logout</button>
            </div>
        </aside>

        <main class="main-content" id="mainContent">
            <?php
            // Ensure db_con.php or db.php path is correct
            $db_con_path = "db_con.php"; 
            if (file_exists($db_con_path)) {
                include $db_con_path;
                if (isset($conn)) {
                    $sql = "SELECT * FROM videos ORDER BY id DESC";
                    $res = mysqli_query($conn, $sql);

                    if ($res && mysqli_num_rows($res) > 0) {
                        while ($video_data = mysqli_fetch_assoc($res)) {
                            $video_url = htmlspecialchars($video_data['video_url']);
                            $uploader_name = isset($video_data['uploader_name']) ? htmlspecialchars($video_data['uploader_name']) : "Unknown Uploader";
                            $video_description_text = isset($video_data['description']) ? nl2br(htmlspecialchars($video_data['description'])) : "No description available.";
                            $video_id = isset($video_data['id']) ? htmlspecialchars($video_data['id']) : '';
            ?>
            <div class="video-slide" data-video-id="<?php echo $video_id;?>">
                <video class="tiktok-video" preload="auto" loop>
                    <source src="uploads/<?php echo $video_url;?>" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-info">
                    <p class="video-meta">
                        <span class="uploader-name">@<?php echo $uploader_name;?></span>
                    </p>
                    <div class="video-description">
                        <p><?php echo $video_description_text;?></p>
                    </div>
                    <span class="description-toggle">more</span>
                </div>
                <div class="video-actions">
                    <button class="action-btn like-btn" data-action="like">❤️<span>Like</span></button>
                    <button class="action-btn comment-btn" data-action="comment">💬<span>Comments</span></button>
                    <button class="action-btn share-btn" data-action="share">➡️<span>Share</span></button>
                </div>
                <button class="play-pause-button-overlay">▶️</button>
            </div>
            <?php
                        }
                    } else {
                        if (!$res) {
                            echo "<div class='video-slide'><p style='color:white; font-size: 1.5em;'>Database query failed: ". mysqli_error($conn). "</p></div>";
                        } else {
                            echo "<div class='video-slide'><p style='color:white; font-size: 1.5em;'>No videos found.</p></div>";
                        }
                    }
                    if ($conn) {
                        mysqli_close($conn);
                    }
                } else {
                     echo "<div class='video-slide'><p style='color:white; font-size: 1.5em;'>Error: Database connection not established.</p></div>";
                }
            } else {
                echo "<div class='video-slide'><p style='color:white; font-size: 1.5em;'>Error: ".$db_con_path." not found. Cannot load videos.</p></div>";
            }
            ?>
        </main>

        <section class="right-comments-section" id="commentsSection">
            <div class="comments-header">
                <h2>Comments</h2>
            </div>
            <div class="comments-content-wrapper">
                <ul class="comment-list" id="commentList">
                    <li class="comment">
                         <div class="comment-avatar"></div>
                         <div class="comment-content">
                             <div class="comment-meta"><span>User1</span> <span>2 hours ago</span></div>
                             <div class="comment-text">This is a great video! (Sample)</div>
                         </div>
                     </li>
                </ul>
                <div class="comment-form">
                    <textarea placeholder="Add a public comment..." id="commentTextarea"></textarea>
                    <button id="addCommentButton">Comment</button>
                </div>
            </div>
        </section>

        <button class="scroll-nav-button up" id="scrollUpBtn">▲</button>
        <button class="scroll-nav-button down" id="scrollDownBtn">▼</button>
    </div>

    <script src="script.js"></script>
   
   </scrip>
</body>
</html>