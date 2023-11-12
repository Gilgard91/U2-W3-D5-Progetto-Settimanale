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

    .then((pianos) => {
      renderProducts(pianos);
      searchProducts(pianos);
    })
    .catch((err) => console.log(err));
};

const searchProducts = (obj) => {
  document.getElementById("product-input").addEventListener("keyup", (e) => {
    let inputValue = e.target.value;
    let filteredObj = obj.filter((elem) =>
      elem.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(filteredObj);
    const dropdownSearch = document.getElementById("product-dropdown");
    dropdownSearch.innerHTML = "";
    filteredObj.forEach((piano) => {
      if (inputValue !== "") {
        dropdownSearch.innerHTML += `<a class="dropdown-item" href="./details.html?pianoId=${piano._id}">${piano.name}</a>`;
        
      }
    });
  });
};

const renderProducts = (obj) => {
  obj.forEach((elem) => {
    console.log(elem);
    pianoWrapper.innerHTML += ` <div class="col col-12 col-md-6 col-lg-4">
        <div class="card mb-4 shadow p-3 mb-5 bg-white rounded">
          <img class="card-img-top" style="height:350px; object-fit:cover" src="${elem.imageUrl}" alt="Card image cap">
          <div class="card-body text-center">
            <h5 class="mt-2">${elem.name}</h5>
           
            <div class>
              <div class="btn-group">
                <a href="./details.html?pianoId=${elem._id}" class="btn btn-sm btn-outline-secondary mt-2" role="button">
                  Scopri di più
                </a>
                
              </div>
             
            </div>
          </div>
        </div>
      </div>`;
  });
};
