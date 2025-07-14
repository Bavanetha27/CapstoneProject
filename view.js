const note = JSON.parse(localStorage.getItem("viewNote"));
document.getElementById("viewTitle").textContent = note.title;
document.getElementById("viewContent").textContent = note.content;
