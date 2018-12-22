export function $(selector, context) {
  return (context || document).querySelector(selector);
}

// For explanations about the last conversion see
// https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
export function $$(selector, context) {
  const elements = (context || document).querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}

export function showError(message) {
  const el = $('.err');
  const section = el.getElementsByTagName('section')[0];
  section.innerHTML = message;
  el.style.display = 'block';
}

export function hideError() {
  const el = $('.err');
  const section = el.getElementsByTagName('section')[0];
  section.innerHTML = '';
  el.style.display = 'none';
}

export function setStreamed(streamed, pojo) {
  Object.keys(streamed).forEach(key => {
    // console.log(key, streamed[key]());
    streamed[key](pojo[key]);
  });
}

export function getPOJO(streamed) {
  const obj = {};
  Object.keys(streamed).forEach(key => {
    // console.log(key, streamed[key]());
    obj[key] = streamed[key]();
  });
  return obj;
}
