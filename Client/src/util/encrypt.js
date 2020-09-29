function hash(i) {
  return i + 100;
  // return String.fromCharCode(i + 100);
}
function dehash(code) {
  return code - 100;
  // return code.charCodeAt(0) - 100;
}

export { hash, dehash };
