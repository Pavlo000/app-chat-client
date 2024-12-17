function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validateFirstName(value: string) {
  if (!value) {
    return 'First Name is required';
  }

  if (value.length < 2) {
    return 'At least 2 characters';
  }

  if (value.length > 20) {
    return 'Maximum 20 characters';
  }
}

function validateLastName(value: string) {
  if (!value) {
    return 'Last Name is required';
  }

  if (value.length < 2) {
    return 'At least 2 characters';
  }

  if (value.length > 20) {
    return 'Maximum 20 characters';
  }
}

function validatePassword(value: string) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
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
  validateFirstName,
  validateLastName,
};
