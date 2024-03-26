import bandSiteApi from './band-site-api';

// Function to fetch and display comments
async function displayComments() {
    try {
        const comments = await bandSiteApi.getComments();
        const commentsContainer = document.querySelector('.comments');
        
        // Clear existing comments
        commentsContainer.innerHTML = '';

        // Iterate through comments and create HTML elements
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment__profile">
                    <img class="comment__profile-img" src="./assets/Images/placeholder-avatar.jpg" alt="user profile">
                </div>
                <div class="comment__details">
                    <h3 class="comment__name">${comment.name}</h3>
                    <p class="comment__text">${comment.text}</p>
                    <p class="comment__timestamp">${new Date(comment.timestamp).toLocaleString()}</p>
                </div>
            `;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Function to handle form submission for adding a new comment
async function handleCommentSubmission(event) {
    event.preventDefault();
    
    const nameInput = document.querySelector('.conv__name-input');
    const commentInput = document.querySelector('.conv__comment-input');
    
    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();
    
    if (!name || !commentText) {
        alert('Please enter your name and comment');
        return;
    }
    
    try {
        await bandSiteApi.postComment({ name, text: commentText });
        nameInput.value = '';
        commentInput.value = '';
        await displayComments();
    } catch (error) {
        console.error('Error posting comment:', error);
    }
}

// Event listener for form submission
const commentForm = document.querySelector('.conv__form');
commentForm.addEventListener('submit', handleCommentSubmission);

// Initial call to display comments when the page loads
displayComments();

