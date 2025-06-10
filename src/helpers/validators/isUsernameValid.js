
function isValidUsername(username) {
  // Allow only letters, numbers, underscores, and must be 3–20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const isValid = usernameRegex.test(username);
  if (!isValid) {
    throw Error("that's not a valid username");
  }
}

module.exports = isValidUsername;