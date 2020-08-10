import _ from "lodash";
import Print from "./print";
import "./style.css";

function component() {
  var element = document.createElement("div");
  var button = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");
  button.innerHTML = "Click me and check the console!";
  button.onclick = Print.bind(null, "Hello webpack!");

  element.appendChild(button);

  return element;
}

let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept("./print.js", function () {
    console.log("Accepting the updated printMe module!");
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  });
}
