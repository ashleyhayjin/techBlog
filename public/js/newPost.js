const newPostEvent = async (event) => {

    const postTitle = document.querySelector("#post-title").value.trim();
    const postContent = document.querySelector("#post-content").value.trim();

    if (postTitle && postContent){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ postTitle, postContent}),
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
    .querySelector('.post-form')
    .addEventListener('submit', newPostEvent);