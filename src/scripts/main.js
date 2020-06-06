let comments = [];
let pagination = document.querySelector("#pagination");
let notesOnPage = 10;
loadComments();
let countOfPages = Math.ceil(comments.length / notesOnPage);

let items = [];
for (let i = 1; i <= countOfPages; i++) {
  let li = document.createElement("li");
  li.innerHTML = i;
  li.classList.add("page-number__button");
  pagination.appendChild(li);
  items.push(li);
}

let active;
for (let item of items) {
  item.addEventListener("click", function () {
    if (active) active.classList.remove("active");
    active = this;
    this.classList.add("active");
    let pageNum = +this.innerHTML;
    pageShow(pageNum);
  });
}

document.getElementById("comment-add").onclick = function () {
  let commentName = document.getElementById("comment-name");
  let commentBody = document.getElementById("comment-body");

  let comment = {
    name: commentName.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  };

  commentName.value = "";
  commentBody.value = "";

  comments.push(comment);
  saveComments();
};

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  if (sessionStorage.getItem("pageNumSession")) {
    pageShow(sessionStorage.getItem("pageNumSession"));
  } else {
    pageShow(1);
  }
}

function pageShow(pageNum) {
  sessionStorage.setItem("pageNumSession", pageNum);
  let start = (pageNum - 1) * notesOnPage;
  let end = start + notesOnPage;
  let notes = comments.slice(start, end);
  showComments(notes);
}

function showComments(mass) {
  let commentField = document.getElementById("comment-field");
  let out = "";
  mass.forEach(function (item) {
    out += `
   <div class="comment__body">
      <p class="comment__body_name">${item.name}</p>
      <p class="comment__body_tetx">${item.body}</p>
      <p class="comment__body_date"><em>${timeConverter(item.time)}</em></p>
   </div>
`;
  });
  commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
