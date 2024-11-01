export const handleError = (statucCode, message) => {
  const error = new Error();
  error.message = message;
  error.statusCode = statucCode;
  return error;
};
