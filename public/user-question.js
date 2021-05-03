console.log("Im included");
const user_question_form = document.getElementById("user_question_form");
const user_name = document.getElementById("name");
const user_email = document.getElementById("email");
const user_subject = document.getElementById("subject");
const user_message = document.getElementById("message");
const bad_email = document.getElementById("bad_email");
const nameValue = user_name.value;
const emailValue = user_email.value;
const subjectValue = user_subject.value;
const messageValue = user_message.value;

function setErrorMessage(email) {
  bad_email.click();
  email.style.border = "1px solid red";
}

const emailVerified = (user_email) => {
  if (/\S+@\S+\.\S+/.test(user_email.value)) {
    return true;
  } else {
    setErrorMessage(user_email);
  }
};

function checkInputs() {
  if (
    nameValue !== "" ||
    emailVerified(user_email) ||
    subjectValue !== "" ||
    messageValue !== ""
  ) {
    validate();
  }
}

function validate() {
  return user_question_form.submit();
}
