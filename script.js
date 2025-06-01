console.log("Namaste Javascript");
// calling showNotes() on page reload
showNotes();
// if user adds a note, basically add that note to the local storage

const addBtn = document.querySelector("#addBtn");

const search = document.querySelector("#searchTxt");



addBtn.addEventListener("click", (e) => {
  // selecting the text Area
  const addTxt = document.querySelector("#addTxt");
  if (addTxt.value === "") {
    alert("Please add a note");
  }
  // fetching notes from the local storage if some notes are already present
  // if no notes are present in the localStorage then it will give null
  else {
    const notes = localStorage.getItem("notes");
    // here notes is also an array that we have got from the local storage.
    // console.log(notes);
    // if notes are null
    if (notes === null) {
      notesObj = [];
    } else {
      // here will get notesObj as array from the localStorage, earlier it was in string form
      notesObj = JSON.parse(notes);
      //   console.log(notesObj);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // blanking the value of the addTxt also.
    addTxt.value = "";
    // console.log(notesObj);
    // calling showNotes() function
    showNotes();
  }
});

// function to show elements from local storage
function showNotes() {
  const notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">
              ${element}
            </p>
            <button id="${index}" onClick="deleteNote(this.id)"class="btn btn-primary">Delete Note</button>
          </div>
        </div>
        `;
  });
  const notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes`;
  }
}

// function to delete a note
function deleteNote(index) {
  const notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// building the search functionality
search.addEventListener("input", () => {
  const inputVal = search.value;
  const noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

changeTheme.addEventListener('click', () => {
    navbar.classList.toggle('bg-body-dark');

})