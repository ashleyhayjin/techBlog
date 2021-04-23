const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_words = document.querySelector("#comment-form-body").value.trim();
    const post_id = event.target.parentNode.previousElementSibling.getAttribute("post-id");
    console.log(post_id);
    console.log(comment_words);
    if (comment_words){
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment_words, post_id}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
        } else {
        alert('error!')
        }
    }
};

document
  .querySelector('#button')
  .addEventListener('click', commentFormHandler);