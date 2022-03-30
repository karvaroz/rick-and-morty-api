const API_URL = "https://rickandmortyapi.com/api/character/";
// const form = document.getElementById("form");
const main = document.getElementById("main");
// const search = document.getElementById("search");

const getCharacters = (url) => {
  const peticion = fetch(url);
  peticion
    .then((resp) => resp.json())
    .then((data) => showCharacters(data.results))
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: "Hubo un error en el Servidor url",
        icon: "error",
        text: "Recargar la pagina",
        confirmButton: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    });
};

getCharacters(API_URL);

const showCharacters = (characters) => {
  console.log(characters);
  if (characters.length == 0) {
    Swal.fire({
      title: "No encontrados",
      icon: "warning",
      confirmButton: "Aceptar",
    });
  } else {
    main.innerHTML = "";
    characters.forEach((character) => {
      const { name, status, species, image, origin, location } = character;

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML += `
        <div class="card-img">
            <img src="${image}" alt="">
        </div>
        <div class="card-info">
            <h2>${name}</h2>
            <p><span>${status}</span> - ${species}</p>
            <br>
            <p class="subtitle">Last Known location: </p>
            <p>${origin.name}</p>
            <br>
            <p class="subtitle">First seen in: </p>
            <p>${location.name}</p>
        </div>
            
            `;
      main.appendChild(card);
    });
  }
};

// form.addEventListener("submit", (e) => {
//     if(!data.character.name){
//             Swal.fire({
//               title: "Personaje no encontrado",
//               icon: "warning",
//               text: "Verifique el nombre",
//               confirmButton: "Aceptar",
//             });
//     } else{
//         getCharacters(`${API_URL}?name=${data.character.name}`);
//     }
// })
