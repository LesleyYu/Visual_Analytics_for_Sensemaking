const tab_buttons = document.getElementsByClassName("tabs__button");
const content_edit = document.getElementById("edit");
const content_compare = document.getElementById("compare");
const logo_edit = document.getElementById("logo_edit");
const logo_compare = document.getElementById("logo_disp");

function setCurrentTab() {

  for (var i = 0; i < tab_buttons.length; i++) {
    // remove all 'current_tab' class
    tab_buttons[i].classList.remove("current_tab");
    
  }

  // remove 'tabs__content--active' and 'tabs__content' classes
  content_edit.classList.remove('tabs__content--active', 'tabs__content');
  content_compare.classList.remove('tabs__content--active', 'tabs__content');
  // remove all 'logo_xx' class
  logo_edit.classList.remove("logo_show", "logo_hidden");
  logo_compare.classList.remove("logo_show", "logo_hidden");

  // add classes
  if (this.dataset['tab_for'] == 'edit') {
    content_edit.classList.add("tabs__content--active");
    content_compare.classList.add("tabs__content");
    logo_edit.classList.add("logo_show");
    logo_compare.classList.add("logo_hidden");
  }
  else {
    content_edit.classList.add("tabs__content");
    content_compare.classList.add("tabs__content--active");
    logo_edit.classList.add("logo_hidden");
    logo_compare.classList.add("logo_show");
  }
  // add 'current_tab' class to clicked element
  this.classList.add("current_tab");

}

// apply to both buttons
for (var i = 0; i < tab_buttons.length; i++) {
  tab_buttons[i].addEventListener("click", setCurrentTab);
}

