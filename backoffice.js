const params = new URLSearchParams(window.location.search);
const pianoId = params.get("pianoId");

const URL = pianoId
  ? "https://striveschool-api.herokuapp.com/api/product/" + pianoId
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = pianoId ? "PUT" : "POST";

window.onload = () => {
  if (pianoId) {
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWYwMzI1NGU4ODAwMTgzZjE4OGUiLCJpYXQiOjE2OTk2MDYyNzUsImV4cCI6MTcwMDgxNTg3NX0.djs-nQQziVGfyHVb7gGqd4aR2i_Q7DMGdTZV2cUH6g0",
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((editObj) => {
        const { name, brand, imageUrl, description, price } = editObj;

        document.getElementById("name").value = name;
        document.getElementById("brand").value = brand;
        document.getElementById("image").value = imageUrl;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
      })
      .catch((err) => console.log(err));

    document.getElementById("backoffice-title").innerText = "Modifica articolo";
    const btn = document.querySelector("button[type='submit']");
    btn.innerText = "Modifica";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-success");
    const deleteBtn = document.querySelector(
      "button[type='button'].btn-danger"
    );
    deleteBtn.classList.remove("d-none");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const articleObj = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    imageUrl:
      "https://st3.depositphotos.com/1000212/16750/v/450/depositphotos_167507880-stock-illustration-musical-instrument-grand-piano.jpg",
    description: document.getElementById("description").value,
    price: document.getElementById("price").value
  };

  fetch(URL, {
    method,
    body: JSON.stringify(articleObj),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWYwMzI1NGU4ODAwMTgzZjE4OGUiLCJpYXQiOjE2OTk2MDYyNzUsImV4cCI6MTcwMDgxNTg3NX0.djs-nQQziVGfyHVb7gGqd4aR2i_Q7DMGdTZV2cUH6g0",
      "Content-Type": "application/json"
    }
  }).then((resp) => resp.json());

  console.log(articleObj);

  if (!pianoId) {
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";

    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
  }
};

const deleteArticle = () => {
  const hasAccepted = confirm(
    "Sei sicuro di voler eliminare l'articolo? L'azione è irreversibile."
  );

  if (hasAccepted) {
    fetch(URL, { method: "DELETE" })
      .then((resp) => resp.json())
      .then((deletedObj) => {
        alert("Hai eliminato " + deletedObj.name);
        window.location.assign("./index.html");
      });
  }
};
