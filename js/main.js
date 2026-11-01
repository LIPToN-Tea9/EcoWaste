const orderForm = document.querySelector(".order_form");
const formMessage = document.querySelector(".form_message");
const formName = document.getElementById("name");
const formNameError = document.getElementById("name_error");
const formPhone = document.getElementById("phone");
const formPhoneError = document.getElementById("phone_error");
const formType = document.getElementById("type");
const formTypeError = document.getElementById("type_error");

function validatePhone(phone) {
    const userPhone = phone.trim();
    const userPhoneDigits = userPhone.slice(4);
    const phoneTest = /^[0-9]{9}$/;
    const userPhoneValid =
        userPhone.length === 13 &&
        userPhone.startsWith("+380") &&
        phoneTest.test(userPhoneDigits);
    return userPhoneValid;
}

function validateName(name) {
    const userName = name.trim();
    const userNameValid = userName !== "";
    return userNameValid;
}

function validateOrderType(type) {
    const userType = type;
    const userTypeValid = userType !== "" && userType !== undefined;
    return userTypeValid;
}

function showFieldError(field, errorElement, message) {
    errorElement.textContent = message;
    field.classList.add("form_error_label");
    field.setAttribute("aria-invalid", "true");
}

function clearFieldError(field, errorElement) {
    errorElement.textContent = "";
    field.classList.remove("form_error_label");
    field.setAttribute("aria-invalid", "false");
}

function isFormValid(nameValid, phoneValid, typeValid) {
    const formValid = nameValid && phoneValid && typeValid;
    return formValid;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove("error");
    formMessage.classList.remove("success");
    formMessage.classList.add(type);
}

function clearFormError() {
    if (formMessage.classList.contains("error")) {
        formMessage.textContent = "";
        formMessage.classList.remove("error");
    }
}

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const formInputData = Object.fromEntries(formData);
    const userName = formInputData.order_name;
    const userPhone = formInputData.order_phone;
    const userNameValid = validateName(userName);
    const userPhoneValid = validatePhone(userPhone);
    const userOrderType = formInputData.order_type;
    const userOrderTypeValid = validateOrderType(userOrderType);

    if (!userNameValid) {
        showFieldError(
            formName,
            formNameError,
            "Будь ласка, введіть ваше ім'я",
        );
    } else {
        clearFieldError(formName, formNameError);
    }

    if (!userPhoneValid) {
        showFieldError(
            formPhone,
            formPhoneError,
            "Введіть номер у форматі +380XXXXXXXXX",
        );
    } else {
        clearFieldError(formPhone, formPhoneError);
    }

    if (!userOrderTypeValid) {
        showFieldError(
            formType,
            formTypeError,
            "Будь ласка, оберіть тип сміття",
        );
    } else {
        clearFieldError(formType, formTypeError);
    }

    if (isFormValid(userNameValid, userPhoneValid, userOrderTypeValid)) {
        showFormMessage("Дані форми правильні", "success");
        orderForm.reset();
    } else {
        showFormMessage("Перевірте введені дані", "error");
        if (!userNameValid) {
            formName.focus();
        } else if (!userPhoneValid) {
            formPhone.focus();
        } else if (!userOrderTypeValid) {
            formType.focus();
        }
    }
});

formName.addEventListener("input", () => {
    const userNameValid = validateName(formName.value);
    if (userNameValid) {
        clearFieldError(formName, formNameError);
    }
    clearFormError();
});

formPhone.addEventListener("input", () => {
    const userPhoneValid = validatePhone(formPhone.value);

    if (userPhoneValid) {
        clearFieldError(formPhone, formPhoneError);
    }
    clearFormError();
});

formType.addEventListener("change", () => {
    const userOrderTypeValid = validateOrderType(formType.value);

    if (userOrderTypeValid) {
        clearFieldError(formType, formTypeError);
    }
    clearFormError();
});
