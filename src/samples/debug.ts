export function initSeedUi(onSeedChanged: Function) {
  var p = document.createElement("p");
  p.innerHTML =
    '<button id="change">change</button>' +
    'random seed: <input type="number" id="seed" value="0"></input>' +
    '<button id="set">set</button>';
  document.getElementsByTagName("body")[0].appendChild(p);
  var changeElm = document.getElementById("change");
  var seedElm = <HTMLInputElement>document.getElementById("seed");
  var setElm = document.getElementById("set");
  changeElm.onclick = function() {
    seedElm.value = Math.floor(Math.random() * 9999999).toString();
    onSeedChanging();
  };
  setElm.onclick = onSeedChanging;
  function onSeedChanging() {
    onSeedChanged(Number(seedElm.value));
  }
}
export function enableShowingErrors() {
  var result = document.createElement("pre");
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
