const menuBtn = document.querySelector(".menu-btn");
const menuItem = document.querySelector(".mainNav ul");
const menuItems = document.querySelectorAll(".mainNav ul li");

//main-toggle
menuBtn.addEventListener("click", () =>{
  toggle();
});

//toggle on item click if open
menuItems.forEach((Item) =>{
  Item.addEventListener("click", () =>{
    if (menuBtn.classList.contains("open"))
    {
      toggle();
    }
  });
});

function toggle(){
  menuBtn.classList.toggle("open");
  menuItem.classList.toggle("open");
}
