/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleMenu(name) {
    console.log('toggleMenu()');
    var dropdown = document.getElementById(name);
    dropdown.classList.toggle("show");
    hideAllMenusExcept(dropdown);
}

function hideAllMenusExcept(aDropdown) {
    console.log('hideAllMenusExcept()');
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var d = 0; d < dropdowns.length; d++) {
        var openDropdown = dropdowns[d];
        if (openDropdown != aDropdown) {
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var d = 0; d < dropdowns.length; d++) {
      var openDropdown = dropdowns[d];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


