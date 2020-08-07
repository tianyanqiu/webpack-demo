import _ from "lodash";
import "./styles.css";
import Icon from "./icon.jpg";
//  import Print from './print';

function component() {
  var element = document.createElement("div");
  var myIcon = new Image();
  myIcon.src = Icon;

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");
  element.appendChild(myIcon);
  // element.onclick = Print.bind(null,'Hello webpack!')

  return element;
}

document.body.appendChild(component());
