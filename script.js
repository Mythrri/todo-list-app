let tasks = [];

function addTask() {
  let input = document.getElementById('taskInput');
  let text = input.value.trim();
  if (!text) { alert("Please type a task!"); return; }
  tasks.push({ text: text, done: false });
  input.value = "";
  render();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function render(filter = "all") {
  let list = document.getElementById('taskList');
  list.innerHTML = "";
  let shown = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });
  shown.forEach((t) => {
    let realIndex = tasks.indexOf(t);
    let li = document.createElement('li');
    if (t.done) li.className = "done";
    li.innerHTML = `<span>${t.text}</span>
    <div>
      <button class="tick" onclick="toggleDone(${realIndex})">✔️</button>
      <button class="del" onclick="deleteTask(${realIndex})">❌</button>
    </div>`;
    list.appendChild(li);
  });
  let doneCount = tasks.filter(t => t.done).length;
  document.getElementById('count').innerText = `Total Tasks: ${tasks.length} | Done: ${doneCount}`;
}

function showAll() { render("all"); }
function showActive() { render("active"); }
function showDone() { render("done"); }
function clearAll() { tasks = []; render(); }
