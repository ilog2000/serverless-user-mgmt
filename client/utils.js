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
	const el = $(".err");
	el.innerHTML = message;
	el.style.display = "block";
}

export function hideError() {
	const el = $(".err");
	el.innerHTML = "";
	el.style.display = "none";
}
