const commentFormHandler = async (event) => {

    const comment_words = document.querySelector("#post-title").value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if (comment_words){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ comment_words, post_id }),
            headers: { 'Content-Type' : 'application/json'},
        });

        if (response.ok){
            document.location.replace('/');
        }
        else {
            alert('error!')
        }
    }

};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);