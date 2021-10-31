let id = (id) => {
  return document.getElementById(id);
};

let error = (id) => {
  return document.querySelector(`#${id} + span.error`);
};

const form = document.getElementsByTagName("form")[0];

let password = id("password");
let passwordError = error("password");
let passwordConf = id("password-confirm");
let passwordConfError = error("password-confirm");
let submit = id("submit");

let inputs = document.querySelectorAll("input");

function showError(e) {
  let inputField = e.target;
  let inputFieldError = document.querySelector(
    `#${inputField.id} + span.error`
  );
  if (inputField.validity.valueMissing) {
    inputFieldError.textContent = `You need to enter ${inputField.name}`;
  } else if (inputField.validity.typeMismatch) {
    inputFieldError.textContent = `Enetered value needs to be an ${inputField.name}`;
  } else if (inputField.validity.tooShort) {
    inputFieldError.textContent = `${inputField.name} should be at least ${inputField.minLength} characters; you entered ${inputField.value.length}`;
  } else if (inputField.validity.tooLong) {
    inputFieldError.textContent = `${inputField.name} should be less or equal to ${inputField.maxLength} characters; you entered ${inputField.value.length}`;
  } else if (inputField.validity.patternMismatch) {
    if (inputField.pattern === "[A-Za-z]{5,}") {
      inputFieldError.textContent = `${inputField.name} should contain only letters`;
    } else if (inputField.pattern === "[0-9]{5,9}") {
      inputFieldError.textContent = `${inputField.name} should contain only numbers`;
    } else if (inputField.pattern === `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`) {
      inputFieldError.textContent = `${inputField.name} must contain 8 or more characters, at least one number, and one uppercase and lowercase letter`;
    }
  }
  inputFieldError.className = "error active";
}

function validityCheck(e) {
  let inputField = e.target;
  let inputFieldError = document.querySelector(
    `#${inputField.id} + span.error`
  );
  if (inputField.validity.valid) {
    inputFieldError.textContent = "";
    inputFieldError.className = "error";
  } else {
    showError(e);
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", validityCheck);
});

function showErrorOnSubmit(input) {
  let inputField = input;
  let inputFieldError = document.querySelector(
    `#${inputField.id} + span.error`
  );
  if (inputField.validity.valueMissing) {
    inputFieldError.textContent = `You need to enter ${inputField.name}`;
  } else if (inputField.validity.typeMismatch) {
    inputFieldError.textContent = `Enetered value needs to be an ${inputField.name}`;
  } else if (inputField.validity.tooShort) {
    inputFieldError.textContent = `${inputField.name} should be at least ${inputField.minLength} characters; you entered ${inputField.value.length}`;
  } else if (inputField.validity.tooLong) {
    inputFieldError.textContent = `${inputField.name} should be less or equal to ${inputField.maxLength} characters; you entered ${inputField.value.length}`;
  } else if (inputField.validity.patternMismatch) {
    if (inputField.pattern === "[A-Za-z]{5,}") {
      inputFieldError.textContent = `${inputField.name} should contain only letters`;
    } else if (inputField.pattern === "[0-9]{5,9}") {
      inputFieldError.textContent = `${inputField.name} should contain only numbers`;
    } else if (inputField.pattern === `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`) {
      inputFieldError.textContent = `${inputField.name} must contain 8 or more characters, at least one number, and one uppercase and lowercase letter`;
    }
  }

  inputFieldError.className = "error active";
}

form.addEventListener("submit", (event) => {
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showErrorOnSubmit(input);
    }
    event.preventDefault();
  });
  if (password.value !== passwordConf.value) {
    passwordConfError.textContent = "passwords not match";
    passwordConfError.className = "error active";
  }
});
