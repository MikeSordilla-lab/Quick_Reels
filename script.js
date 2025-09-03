document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    // Use querySelectorAll on document or app-container if buttons are outside main
    const videoSlides = document.querySelectorAll('.video-slide');
    const commentsSection = document.getElementById('commentsSection');

    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');


    const commentList = document.getElementById('commentList');
    const commentTextarea = document.getElementById('commentTextarea');
    const addCommentButton = document.getElementById('addCommentButton');
    let currentPlayingVideo = null;
    let activeVideoIdForComments = null;
    let currentVideoIndex = 0; // Track the index of the currently playing video

    // Function to update button states (enabled/disabled)
    function updateScrollButtonStates() {
        scrollUpBtn.disabled = (currentVideoIndex <= 0);
        scrollDownBtn.disabled = (currentVideoIndex >= videoSlides.length - 1);
    }

    // Intersection Observer to play/pause videos and update index
    const observerOptions = {
        root: mainContent, // scrollings happens in mainContent
        rootMargin: '0px',
        threshold: 0.8 // When 80% of the video is visible
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const videoElement = entry.target.querySelector('video.tiktok-video');
            const playPauseOverlay = entry.target.querySelector('.play-pause-button-overlay');

            if (!videoElement) return;

            if (entry.isIntersecting) {
                // Pause previously playing video if it's different from the current one
                if (currentPlayingVideo && currentPlayingVideo !== videoElement) {
                    currentPlayingVideo.pause();
                    const prevOverlay = currentPlayingVideo.closest('.video-slide').querySelector('.play-pause-button-overlay');
                    if (prevOverlay) {
                         prevOverlay.textContent = '▶️';
                         prevOverlay.classList.add('visible');
                    }
                }

                videoElement.play().then(() => {
                     if (playPauseOverlay) {
                         playPauseOverlay.textContent = '⏸️';
                         playPauseOverlay.classList.remove('visible'); // Hide when playing
                     }
                     currentPlayingVideo = videoElement;
                     activeVideoIdForComments = entry.target.dataset.videoId;
                     // Ensure the video is not muted for autoplay
                        videoElement.muted = false; // Unmute for user interaction
                     // Update current video index based on the intersecting slide
                     currentVideoIndex = Array.from(videoSlides).indexOf(entry.target);
                     updateScrollButtonStates(); // Update buttons when the view changes

                }).catch(error => {
                    console.error("Error attempting to play video:", error);
                    if (playPauseOverlay) {
                         playPauseOverlay.textContent = '▶️';
                         playPauseOverlay.classList.add('visible'); // Show if autoplay fails
                    }
                    // If autoplay failed, keep the index of the video that should be playing
                     currentVideoIndex = Array.from(videoSlides).indexOf(entry.target);
                     updateScrollButtonStates();
                });
            } else {
                // When a video scrolls out of view
                videoElement.pause();
                if (playPauseOverlay) {
                     playPauseOverlay.textContent = '▶️';
                     // Don't make it visible immediately on scroll out, only on actual pause event handled below
                     // playPauseOverlay.classList.add('visible');
                }
                if (currentPlayingVideo === videoElement) {
                    currentPlayingVideo = null; // Clear if the out-scrolled video was the current one
                }
            }
        });
    }, observerOptions);

    videoSlides.forEach(slide => {
        videoObserver.observe(slide);
        const videoElement = slide.querySelector('video.tiktok-video');
        const playPauseOverlay = slide.querySelector('.play-pause-button-overlay');

        if (videoElement) {
            videoElement.addEventListener('play', () => {
                if (playPauseOverlay) {
                    playPauseOverlay.textContent = '⏸️';
                    playPauseOverlay.classList.remove('visible');
                }
            });
            videoElement.addEventListener('pause', () => {
                if (playPauseOverlay) {
                    playPauseOverlay.textContent = '▶️';
                    playPauseOverlay.classList.add('visible');
                }
            });
             videoElement.addEventListener('ended', () => {
                if (playPauseOverlay) {
                    playPauseOverlay.textContent = '▶️';
                    playPauseOverlay.classList.add('visible');
                }
            });
            // Click on video itself to toggle play/pause
            videoElement.addEventListener('click', () => {
                togglePlayPause(videoElement, playPauseOverlay);
            });
        }
        if (playPauseOverlay) {
             playPauseOverlay.addEventListener('click', () => {
                 togglePlayPause(videoElement, playPauseOverlay);
             });
        }
    });

    function togglePlayPause(videoEl, overlayEl) {
        if (!videoEl) return;
        if (videoEl.paused || videoEl.ended) {
            videoEl.play().then(() => {
                // Play event listener updates overlay visibility
            }).catch(err => console.error("Play error", err));
        } else {
            videoEl.pause();
            // Pause event listener updates overlay visibility
        }
    }

    // Scroll Button Logic
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const nextIndex = currentVideoIndex + 1;
            if (nextIndex < videoSlides.length) {
                // Pause the current video before scrolling
                if (currentPlayingVideo) {
                     currentPlayingVideo.pause();
                }
                videoSlides[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
                // The Intersection Observer will handle playing the next video
            }
        });
    }

    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            const prevIndex = currentVideoIndex - 1;
             if (prevIndex >= 0) {
                // Pause the current video before scrolling
                 if (currentPlayingVideo) {
                    currentPlayingVideo.pause();
                 }
                videoSlides[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
                // The Intersection Observer will handle playing the previous video
            }
        });
    }


    // Event delegation for actions within each video slide
    mainContent.addEventListener('click', (event) => {
        const target = event.target;

        // Description Toggle
        if (target.classList.contains('description-toggle')) {
            // Correctly find the .video-description element
            const descriptionDiv = target.closest('.video-info').querySelector('.video-description');
            if (descriptionDiv) {
                 descriptionDiv.classList.toggle('expanded');
                 target.textContent = descriptionDiv.classList.contains('expanded') ? 'less' : 'more';
            }
        }

        // Action Buttons (Like, Comment, Share)
        const actionButton = target.closest('.action-btn');
        if (actionButton) {
            const action = actionButton.dataset.action;
            const slide = actionButton.closest('.video-slide');
            const videoId = slide ? slide.dataset.videoId : null;

            if (action === 'comment') {
                if (videoId) {
                     activeVideoIdForComments = videoId;
                     console.log("Open comments for video ID:", activeVideoIdForComments);
                     // You would typically call a function here to load comments for this videoId
                     // loadCommentsForVideo(activeVideoIdForComments);
                     commentTextarea.focus(); // Optional: focus the comment input
                }
            } else if (action === 'like') {
                console.log(`Like video: ${videoId}`);
                // Add your like functionality here (e.g., update UI, send request to backend)
                // actionButton.classList.toggle('liked'); // Example visual feedback class
            } else if (action === 'share') {
                console.log(`Share video: ${videoId}`);
                // Add your share functionality
            }
        }
    });

    // Comments Functionality (assuming global comments section)
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function addNewCommentToList(text, user = "@CurrentUser", time = "now") {
        const newCommentLi = document.createElement('li');
        newCommentLi.classList.add('comment');
        newCommentLi.innerHTML = `
            <div class="comment-avatar"></div>
            <div class="comment-content">
                <div class="comment-meta">
                    <span>${sanitizeHTML(user)}</span> <span>${sanitizeHTML(time)}</span>
                </div>
                <div class="comment-text">
                    ${sanitizeHTML(text)}
                </div>
            </div>
        `;
        commentList.prepend(newCommentLi);
        commentList.scrollTop = 0; // Scroll to top of comments list
    }

    if (addCommentButton) {
        addCommentButton.addEventListener('click', () => {
            const commentText = commentTextarea.value.trim();
            if (commentText === '') return;

            // Ensure we have an active video ID before adding a comment
            if (!activeVideoIdForComments) {
                console.warn("No active video selected to add comment.");
                // Optionally display a message to the user
                return;
            }

            console.log(`Adding comment for video ${activeVideoIdForComments}: ${commentText}`);
            // Here you would typically send the comment and activeVideoIdForComments to the backend
            // using fetch() or XMLHttpRequest

            // For frontend demo:
            addNewCommentToList(commentText);
            commentTextarea.value = '';
        });
    }

    if (commentTextarea) {
        commentTextarea.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                addCommentButton.click();
            }
        });
    }

    // Initial check and play for the first video, and update button states
    if(videoSlides.length > 0){
        // Explicitly mute and play the first video on load to ensure autoplay
        const firstVideo = videoSlides[0].querySelector('video.tiktok-video');
        if (firstVideo) {
            firstVideo.muted = true;
            firstVideo.play().then(() => {
                // Hide play overlay on play
                const firstOverlay = videoSlides[0].querySelector('.play-pause-button-overlay');
                if(firstOverlay){
                    firstOverlay.textContent = '⏸️';
                    firstOverlay.classList.remove('visible');
                }
                currentPlayingVideo = firstVideo;
                activeVideoIdForComments = videoSlides[0].dataset.videoId;
            }).catch(err => {
                console.warn("Autoplay failed on first video. User interaction might be required.", err);
            });
        }
        currentVideoIndex = 0; // Assume the first video is initially visible
        updateScrollButtonStates();
    } else {
         // If no videos, disable both buttons
         scrollUpBtn.disabled = true;
         scrollDownBtn.disabled = true;
    }

});