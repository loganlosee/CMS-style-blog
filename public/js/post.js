const commentModal = document.getElementById('createCommentModal');
const commentButton = document.getElementById('comment-button');
const commentModalClose = commentModal.querySelector('.close');

commentButton.addEventListener('click', () => {
    commentModal.style.display = 'block';
});

commentModalClose.addEventListener('click', () => {
    commentModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === commentModal) {
        commentModal.style.display = 'none';
    }
});

const currentPost = document.querySelector('#currentPost').textContent;

const newCommentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#add-comment').value.trim();
    if (content) {
        const response = await fetch(`/api/comments/${currentPost}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/post/${currentPost}`);
            console.log('Comment added');
        } else {
            alert('Failed to comment');
        }
    }
};

document.querySelector('#newCommentButton').addEventListener('click', newCommentHandler);

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    response.ok
      ? document.location.replace("/homepage")
      : alert(response.statusText);
  };
  
  document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);
