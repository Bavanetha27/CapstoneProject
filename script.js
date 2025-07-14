const form = document.getElementById("noteForm");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let isEditing = false;
let editIndex = -1;

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, i) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content.length > 100 ? note.content.slice(0, 100) + "..." : note.content}</p>
      <div class="actions">
        <button onclick="editNote(${i})">✏ Edit</button>
        <button onclick="deleteNote(${i})">🗑 Delete</button>
        <button onclick="viewNote(${i})">🔍 View</button>
      </div>
    `;
    notesList.appendChild(card);
  });
}

function editNote(index) {
  const note = notes[index];
  titleInput.value = note.title;
  contentInput.value = note.content;
  isEditing = true;
  editIndex = index;
}

function deleteNote(index) {
  if (confirm("Delete this note?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
}

function viewNote(index) {
  localStorage.setItem("viewNote", JSON.stringify(notes[index]));
  window.location.href = "note.html";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return;

  if (isEditing) {
    notes[editIndex] = { title, content };
    isEditing = false;
    editIndex = -1;
  } else {
    notes.push({ title, content });
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  form.reset();
  renderNotes();
});

renderNotes();
