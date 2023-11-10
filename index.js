const pianoWrapper = document.getElementById("piano-wrapper");


window.onload = () => {
  fetchData();
};

const fetchData = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWYwMzI1NGU4ODAwMTgzZjE4OGUiLCJpYXQiOjE2OTk2MDYyNzUsImV4cCI6MTcwMDgxNTg3NX0.djs-nQQziVGfyHVb7gGqd4aR2i_Q7DMGdTZV2cUH6g0",
      "Content-Type": "application/json"
    }
  })
    .then((resp) => resp.json())

    .then((pianos) => renderProducts(pianos))
    .catch((err) => console.log(err));
};

const renderProducts = (obj) => {
  obj.forEach((elem) => {
    console.log(elem);
    pianoWrapper.innerHTML += ` <div class="col col-sm-6 col-md-4">
        <div class="card mb-4 shadow-sm">
          <img class="card-img-top" style="height:350px; object-fit:cover" src="${elem.imageUrl}" alt="Card image cap">
          <div class="card-body">
            <h5>${elem.name}</h5>
           
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="./details.html?pianoId=${elem._id}" class="btn btn-sm btn-outline-secondary" role="button">
                  Dettagli
                </a>
              </div>
             
            </div>
          </div>
        </div>
      </div>`;
  });
};


