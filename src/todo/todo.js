module.exports = function buildMakeTodo() {
  return function({ text }) {
    // validate todo before creating and saving it to database
    if (!text) throw new Error("Text cannot be empty");
    if (text.length < 4) throw new Error("Text must be at least 4 characters");

    return { text };
  };
};
