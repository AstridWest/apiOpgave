const animalsContainer = document.querySelector(".animalsContainer");

let url = new URLSearchParams(window.location.search);
let offset = url.get("offset") ? url.get("offset") : 0;
let nextOffset;
let prevOffset;

if(animalsContainer){

fetch(`http://marie-myapi.herokuapp.com/api/v1/animals?offset=${offset}&limit=5`, {
  "method": "GET"
})
  .then(response => response.json())
  .then(data => {
    let maxOffset = data.count - data.count % 5;
    nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 5
    prevOffset = offset <= 0 ? 0 : parseInt(offset) - 5
    //console.log(data)

      data.result.forEach(element => {
      //console.log(element)

      let li = document.createElement("li");
      li.setAttribute("class", "animalsContainer__item")
      li.innerHTML = `
        <h2 class="animalsContainer__h2">${element.name}</h2>
        <p class="animalsContainer__type">${element.type}</p>
        <a href="./data.html?animalId=${element._id}&backpage=${offset}" class="animalsContainer__details">Details</a>
        <a href="./update.html" class="animalsContainer__update">Update</a>
        <button class="animalsContainer__delete">Delete</button>`;
    
    animalsContainer.appendChild(li);
  });

    const footer = document.querySelector(".footer")

    let prev = document.createElement("a");
        prev.classList.add("btn");
        offset == 0 && prev.classList.add("btn__disabled");
        prev.setAttribute("href", `?offset=${prevOffset}`);

    let prevNode = document.createTextNode("Previous");
        prev.appendChild(prevNode)
        footer.appendChild(prev)


    let next = document.createElement("a");
        next.classList.add("btn")
        if(offset >= maxOffset) next.classList.add("btn__disabled")
        next.setAttribute("href", `?offset=${nextOffset}`);

    let nextNode = document.createTextNode("Next");
        next.appendChild(nextNode)
        footer.appendChild(next)
    
})
}