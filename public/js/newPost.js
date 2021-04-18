const newPostEvent = async (event) => {

    const title = document.querySelector("#post-title").value.trim();
    const words = document.querySelector("#post-content").value.trim();
    console.log(title);
    console.log(words);
    if (title && words){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, words }),
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
    .querySelector('#new-post')
    .addEventListener('submit', newPostEvent);