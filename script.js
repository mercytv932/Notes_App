
const noteInput = document.querySelector(".noteInput");
const noteContent = document.querySelector("#noteContent");
const addBtn = document.querySelector(".addBtn");
const notesList = document.querySelector("#notesList");
const search = document.querySelector("#search");
const exportBtn = document.querySelector("#exportBtn");
const importBtn = document.querySelector("#importBtn");
const importFile = document.querySelector("#importFile");


 let notes = [];// global variable to store notes

 let isEditing = false;

 let editingNoteDate = null;


addBtn.addEventListener("click", function(){
  const title = noteInput.value;
  const content = noteContent.value;

  if (!title || !content) return;



if(isEditing){
  const  noteToUpdate = notes.find (n=> n.date === editingNoteDate);
  noteToUpdate.title = title;
  noteToUpdate.content = content;

  isEditing = false;
  editingNoteDate = null;
  addBtn.textContent = "Add Note";
}  else{


  const note = {
    date: Date.now(),
    title: title,
    content: content
  }

notes.push(note);
}


localStorage.setItem("notes", JSON.stringify(notes));
displayNotes();

noteInput.value = "";
noteContent.value = "";
});



search.addEventListener("input", function(){
  const searchTerm = search.value.toLowerCase();
  if(searchTerm ===""){
    displayNotes();
  } else{
    filterNotes(searchTerm);
  }
});


//Search up notes code
  function filterNotes(searchTerm){
    notesList.innerHTML = "";

    notes.forEach( (note, i) => {

      if(note.title.toLowerCase().includes(searchTerm) ||
       note.content.toLowerCase().includes(searchTerm)) {
         const newDiv = document.createElement("div");
         newDiv.classList.add("note");

        const newHTag = document.createElement("h3");
        newHTag.textContent = note.title;

        const newPTag = document.createElement("p");
        newPTag.textContent = note.content;

        const deleteBtn = document.createElement("button");
         deleteBtn.innerHTML=  "X";
         deleteBtn.addEventListener("click", function(){

         notes = notes.filter(n=> n.date !== note.date);
        localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
          });

        const editBtn = document.createElement("button");
         editBtn.textContent = "✏️";

         editBtn.addEventListener("click", function(){

        noteInput.value = note.title;
        noteContent.value = note.content;
        addBtn.textContent = "Update Note";

        isEditing = true;
        editingNoteDate = note.date;
    });


        newDiv.appendChild(newHTag);
        newDiv.appendChild(newPTag);
        newDiv.appendChild(deleteBtn);
        newDiv.appendChild(editBtn);
        notesList.appendChild(newDiv);


      }

    });

  }




//load notes from storage code
function loadNotesFromLocalStorage(){
  const storedNotesString = localStorage.getItem('notes');

  if (storedNotesString){

    try{
      const parsedNotes = JSON.parse(storedNotesString);

      notes = parsedNotes;

      displayNotes();
    } catch (error) {
      console.error("Error parsing notes from localStorage:", error);

      notes = [];

    }
  }
}

loadNotesFromLocalStorage(); 





//display notes on the page
function displayNotes(){
  notesList.innerHTML = "";

  for( let i = 0; i < notes.length; i++) {
    console.log(`Note at index ${i}:`, notes[i]);

    const note = notes[i]; // Get the current note
    const newDiv = document.createElement("div");
    newDiv.classList.add("note")

    const newHTag = document.createElement("h3");
    newHTag.textContent = note.title;

    const newPTag = document.createElement("p");
    newPTag.textContent = note.content;


    
    //delete the note code
   const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "X";
    deleteBtn.style.cursor = "pointer";
    // deleteBtn.innerHTML=  "<img src='image-copy.png'>";
     deleteBtn.addEventListener("click", function(){

    notes = notes.filter(n=> n.date !== note.date);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
});
    


    //edit the note code
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.style.cursor = "pointer";

    editBtn.addEventListener("click", function(){

        noteInput.value = note.title;
        noteContent.value = note.content;
        addBtn.textContent = "Update Note";

        isEditing = true;
        editingNoteDate = note.date;
    });




    newDiv.appendChild(newHTag);
    newDiv.appendChild(newPTag);
    newDiv.appendChild(deleteBtn);
    newDiv.appendChild(editBtn);
    notesList.appendChild(newDiv);
  }

}

//export file code
exportBtn.addEventListener("click", function(){
  const jsonString = JSON.stringify(notes);
  const blob = new Blob([jsonString], {type: "application/json"});
  const url = URL.createObjectURL(blob)
  const linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.download = "notes.json";
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
});

//import file code
importBtn.addEventListener("click", function(){
  importFile.click();

});

importFile.addEventListener("change", function(){
  const file = importFile.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = function (event){
    try{

      const importedNotes = JSON.parse(event.target.result);

      if(!Array.isArray(importedNotes)){
        alert("Invalid notes file");
        return;
      }

      notes = importedNotes;
      localStorage.setItem("notes", JSON.stringify(notes));

      displayNotes();
      alert("Notes imported successfully");

    } catch (err) {
      alert("Error importing file");
    }
  };
  reader.readAsText(file);
});
