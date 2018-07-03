export function initSeedUi(onSeedChanged: Function) {
  var p = document.createElement("p");
  p.innerHTML =
    '<button id="change">change</button>' +
    'random seed: <input type="number" id="seed" value="0"></input>' +
    '<button id="set">set</button>';
  document.getElementsByTagName("body")[0].appendChild(p);
  const changeButton = document.getElementById("change") as HTMLButtonElement;
  const seedInput = document.getElementById("seed") as HTMLInputElement;
  const setButton = document.getElementById("set");
  changeButton.onclick = function() {
    seedInput.value = Math.floor(Math.random() * 9999999).toString();
    onSeedChanging();
  };
  setButton.onclick = onSeedChanging;
  function onSeedChanging() {
    onSeedChanged(Number(seedInput.value));
  }
}

export function enableShowingErrors() {
  const result = document.createElement("pre");
  result.setAttribute("id", "result");
  document.getElementsByTagName("body")[0].appendChild(result);
  window.addEventListener("error", function(error: any) {
    var message = [
      error.filename,
      "@",
      error.lineno,
      ":\n",
      error.message
    ].join("");
    result.textContent += "\n" + message;
    return false;
  });
}
