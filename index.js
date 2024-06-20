import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://todolistingz-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let user = prompt("Enter your name").toUpperCase();
const todoDB = ref(database, `todolist/${user}`);

let addbtn = document.getElementById("addbtn");
let input = document.getElementById("input");
let todolistitem = document.getElementById("todolist");

addbtn.addEventListener("click", function () {
  let inputvalue = input.value;
  if (inputvalue == "" || inputvalue == false) {
  } else {
    let capitaldisplay = inputvalue.toUpperCase();

    push(todoDB, capitaldisplay);

    clear();
  }
});

onValue(todoDB, function (snapshot) {
  if (snapshot.exists()) {
    let snapshotVal = snapshot.val();

    let fetchArray = Object.entries(snapshotVal);

    clearlist();

    for (let index = 0; index < fetchArray.length; index++) {
      let element = fetchArray[index];

      addtoList(element);
    }
  } else {
    todolistitem.innerHTML = "You are free, play Games";
  }
});

function clear() {
  input.value = "";
}

function addtoList(string) {
  // todolistitem.innerHTML += `<li>${string}</li>`;this can be difficult in some cases, so dont use this

  let elementID = string[0];
  let elementVal = string[1];
  let newElement = document.createElement("li");

  newElement.addEventListener("click", function () {
    // console.log(elementID)
    let answer = confirm("Have you completed this task??");
    if (answer) {
      const loactionInDB = ref(database, `todolist/${user}/${elementID}`);
      remove(loactionInDB);
    } else {
      alert("No changes made.");
    }
  });

  newElement.textContent = `${elementVal}`;
  todolistitem.append(newElement);
}

function clearlist() {
  todolistitem.innerHTML = "";
}
