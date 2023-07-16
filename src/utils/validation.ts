function validateEmail(value: string) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
}

function validatePassword(value: string) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
};

function validateName(value: string) {
  if (!value) {
    return "Name is required";
  }

  if (value.length > 20) {
    return "Max 20 characters";
  }
}

function validateSurname(value: string) {
  if (!value) {
    return "Surname is required";
  }

  if (value.length > 20) {
    return "Max 20 characters";
  }
}

const validateAvatar = (value: string) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!value || !allowedExtensions.test(value)) {
    return 'Please, select file with type of JPG, JPEG or PNG';
  }
};

export const validation = {
  validateEmail,
  validatePassword,
  validateAvatar,
  validateName,
  validateSurname,
};