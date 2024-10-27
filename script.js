document.getElementById("addTaskBtn").addEventListener("click", addTask);

function fetchTasks() {
  fetch("http://localhost:3000/api/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.task;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          deleteTask(task.id);
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
      });
    });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task.");
    return;
  }

  fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: taskValue }),
  }).then((response) => {
    if (response.ok) {
      taskInput.value = ""; // Clear input
      fetchTasks(); // Refresh task list
    }
  });
}

function deleteTask(id) {
  fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "DELETE",
  }).then(() => {
    fetchTasks(); // Refresh task list
  });
}

// Initial fetch to load tasks
fetchTasks();
