const BASE = "http://localhost:5000/api/v1";

let token = "";

function getVal(id) {
  return document.getElementById(id).value;
}

function show(data) {
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}

// REGISTER
async function register() {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: getVal("name"),
      email: getVal("email"),
      password: getVal("password")
    })
  });

  const data = await res.json();
  if (data.token) token = data.token;
  show(data);
}

// LOGIN
async function login() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: getVal("email"),
      password: getVal("password")
    })
  });

  const data = await res.json();
  if (data.token) token = data.token;
  show(data);
}

// CREATE TASK
async function createTask() {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      title: getVal("title"),
      description: getVal("desc")
    })
  });

  show(await res.json());
}

// GET TASKS
async function getTasks() {
  const res = await fetch(`${BASE}/tasks`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  show(await res.json());
}