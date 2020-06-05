function capitalize(str) {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase();
  }

  return words.join(" ");
}

module.exports = capitalize;
