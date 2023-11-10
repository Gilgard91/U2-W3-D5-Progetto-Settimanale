const pianoDetailsWrapper = document.getElementById("piano-details");
window.onload = () => {
  fetchDetails();
};
const params = new URLSearchParams(window.location.search);
const pianoId = params.get("pianoId");
console.log(pianoId);

const fetchDetails = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + pianoId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWYwMzI1NGU4ODAwMTgzZjE4OGUiLCJpYXQiOjE2OTk2MDYyNzUsImV4cCI6MTcwMDgxNTg3NX0.djs-nQQziVGfyHVb7gGqd4aR2i_Q7DMGdTZV2cUH6g0",
      "Content-Type": "application/json"
    }
  })
    .then((resp) => resp.json())
    .then((pianoObj) => {
      pianoDetailsWrapper.innerHTML = `
        <h1 class="details-title mb-5  px-3 py-2 ">${pianoObj.name}</h1>
        <div class="d-flex align-items-center gap-4 mb-3">
        <img src="${pianoObj.imageUrl}" style="width:550px; border-radius: 25px" class="details-img mb-2" alt=""> 
        <p class="details-p">${pianoObj.description}</p>
        </div>
        <p class="badge text-bg-dark fs-5">€${pianoObj.price}</p>
        
        <button class="btn btn-success mt-4 mb-5" onclick="handleClick()">Modifica Articolo</button>
    `;
    });
};

const handleClick = () => {
  window.location.assign("./backoffice.html?pianoId=" + pianoId);
};
