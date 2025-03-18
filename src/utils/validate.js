import config from "../config";

/**
 * Validates an email address using a predefined regex pattern.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns `true` if the email is valid, otherwise `false`.
 */
const isValidEmail = (email) => {
  return config.regex.email.test(email);
};

/**
 * Validates a password using a predefined regex pattern.
 *
 * @param {string} pwd - The password to validate.
 * @returns {boolean} - Returns `true` if the password meets the required pattern, otherwise `false`.
 */
const isValidPassword = (pwd) => {
  return config.regex.password.test(pwd);
};

export { isValidEmail, isValidPassword };
