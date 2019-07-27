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
        console.log('check1');
        var openDropdown = dropdowns[d];
                console.log('check2');
        if (openDropdown != aDropdown) {
                console.log('check3');
            if (openDropdown.classList.contains('show')) {
                    console.log('check4');
                openDropdown.classList.remove('show');
            }
        }
    }
}


