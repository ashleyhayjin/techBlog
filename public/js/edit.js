const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-title").value.trim();
    const words = document.querySelector("#post-content").value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    console.log("filename: ", id);
    if (title && words){
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, words }),
            headers: { 'Content-Type' : 'application/json'},
        });
        if (response.ok){
            document.location.replace('/dashboard');
        }
        else {
            alert('error!')
        }
    }

};

document
    .querySelector('#edit-post')
    .addEventListener('submit', editPostHandler);