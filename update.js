document.addEventListener("DOMContentLoaded", function(){
    const updatesite = document.querySelector(".update")

    if(updatesite){

        let url = new URLSearchParams(window.location.search)
        let animalId = url.get("animalId");
        let backpage = url.get("backpage");

        const form = new FormData();
        form.append("colors", "white");

        fetch(`http://marie-myapi.herokuapp.com/api/v1/animals${animalId}`, {
        "method": "PATCH",
        "headers": {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer ndufh9823jj2jefnkjshf"
        },
        "body": form
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
            }
})