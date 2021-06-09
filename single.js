document.addEventListener("DOMContentLoaded", function(){

    let singleElm = document.querySelector(".single-animal")
    let footer = document.querySelector(".singlefooter")

    if(singleElm){

        let url = new URLSearchParams(window.location.search)
        let animalId = url.get("animalId");
        let backpage = url.get("backpage");
        console.log(animalId)

        fetch(`http://marie-myapi.herokuapp.com/api/v1/animals/${animalId}`, {
            "method": "GET"
        })
        .then(response => response.json())
            .then(data => {
            console.log(data)

            let div = document.createElement("div");
            div.innerHTML = `
            <table class="single-animal__description">
            <tr class="single-animal__tr">
                <th class="single-animal__th">Name</th>
                <td class="single-animal__td">${data.name}</td>
            </tr>

            <tr class="single-animal__tr">
                <th class="single-animal__th">Age</th>
                <td class="single-animal__td"><a>${data.age}</a></td>
            </tr>

            <tr class="single-animal__tr">
                <th class="single-animal__th">Sex</th>
                <td class="single-animal__td">${data.sex}</td>
            </tr>

            <tr class="single-animal__tr">
                <th class="single-animal__th">Type</th>
                <td class="single-animal__td">${data.type}</td>
            </tr>

            <tr class="single-animal__tr">
                <th class="single-animal__th">Breed</th>
                <td class="single-animal__td">${data.breed}</td>
            </tr>

            <tr class="single-animal__tr">
                <th class="single-animal__th">Colors</th>
                <td class="single-animal__td none">${data.colors}</td>
            </tr>

        </table>
            `
        singleElm.appendChild(div)
       

        let back = document.createElement("a");
            back.setAttribute("href", `/?offset=${backpage}`);
            back.setAttribute("class", "backToList")
            let backNode = document.createTextNode("Back to the animal list");
            back.appendChild(backNode)
            footer.appendChild(back)

        })
    }
    })