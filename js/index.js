let navLists = document.querySelectorAll("main > header a");

navLists.forEach((i) => {
  i.onclick = () => {
    navLists.forEach((j) => {
      j.className = "";
    });
    i.className += "nav-onclick";
  };
});
