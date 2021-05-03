const imageButton = document.getElementById("imageButton");
const fileUpload = document.getElementById("fileUpload");
const urlParams = new URLSearchParams(window.location.search);

imageButton.addEventListener("click", () => {
  fileUpload.click();
});
fileUpload.addEventListener("change", () => {
  if (fileUpload.value) {
    imageButton.innerText = fileUpload.value.split("\\").pop();
  } else {
    imageButton.innerText = "Upload Image";
  }
});

function validateInput() {
  const animalForm = document.getElementById("animalForm");
  const name = document.getElementById("name");
  const breed = document.getElementById("breed");
  const age = document.getElementById("age");
  const description = document.getElementById("description");
  const msg = "The image must be .jpg, .png, or .jpeg";
  const error = document.getElementById("error");

  if (
    name.value !== "" &&
    breed.value !== "" &&
    age.value !== "" &&
    description.value !== "" &&
    checkExtension(fileUpload)
  ) {
    animalForm.submit();
  } else {
    setErrorMessage(msg, error);
  }
}

function checkExtension(fileUpload) {
  const ext = fileUpload.value.split(".")[1];
  const editMode = urlParams.get("edit");
  if (editMode) {
    return true;
  }
  if (ext === "jpg" || ext === "png" || ext === "jpeg") {
    return true;
  }
  return false;
}

function setErrorMessage(msg, error) {
  error.innerText = msg;
  error.style.display = "block";
  console.log();
}
