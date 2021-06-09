document.addEventListener("DOMContentLoaded", function(){
    const updatesite = document.querySelector(".update")
    let footer = document.querySelector(".singlefooter")

    if(updatesite){

        let url = new URLSearchParams(window.location.search)
        let animalId = url.get("animalId");
        let backpage = url.get("backpage");

        fetch(`http://marie-myapi.herokuapp.com/api/v1/animals/${animalId}`, {
            "method": "GET"
        })
        .then(response => response.json())
            .then(data => {
            console.log(data)

            let section = document.createElement("section");
            section.innerHTML = `<form class="update-form">
            <label for="name" class="label">Name</label>
            <input type="text" id="name" name="name" placeholder="${data.name}">

            <label for="age" class="label">Age</label>
            <input type="number" id="age" name="age" max="200" placeholder="${data.age}">

            <label for="sex" class="label">Sex</label>
            <select id="sex" name="sex" class="sex">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="both">Both</option>
            </select>

            <label for="type" class="label">Type</label>
            <input type="text" id="type" name="type" placeholder="${data.type}">

            <label for="breed" class="label">Breed</label>
            <input type="text" id="breed" name="breed" placeholder="${data.breed}">

            <label for="colors" class="label">Colors</label>
            <input type="text" id="colors" name="colors" placeholder="Ex: Color1, Color2, Color3">
            
            <input type="submit" value="submit" class="submitbtn">
        </form>` 

        updatesite.appendChild(section);

        let back = document.createElement("a");
            back.setAttribute("href", `/?offset=${backpage}`);
            back.setAttribute("class", "backToList")
            let backNode = document.createTextNode("Back to the animal list");
            back.appendChild(backNode)
            footer.appendChild(back)

            const form = document.querySelector(".update-form");
            form.addEventListener("submit", function(e){
                e.preventDefault()
                updateAnimal(form)
            });
        })
        function updateAnimal(form){
            fetch(`http://marie-myapi.herokuapp.com/api/v1/animals/${animalId}`, {
                "method": "PATCH",
                "body": new FormData(form)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
            }
        }
})