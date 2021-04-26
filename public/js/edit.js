const editPostHandler = async (event) => {

    const title = document.querySelector("#edit-title").value.trim();
    const words = document.querySelector("#edit-content").value.trim();
    const id = window.location.pathname;
    console.log(id);
    if (title && words){
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
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
    .querySelector('#edit-post')
    .addEventListener('submit', editPostHandler);