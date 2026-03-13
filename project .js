const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
"Elon Musk",
"Larry Page",
"Sergey Brin",
"Jeff Bezos",
"Mark Zuckerberg",
"Larry Ellison",
"Jensen Huang",
"Bernard Arnault",
"Rob Walton",
"Warren Buffett"
];

const listitems = [];
let dragStartIndex;

createlist();

function createlist(){

[...richestPeople]
.map(a=>({value:a,sort:Math.random()}))
.sort((a,b)=>a.sort-b.sort)
.map(a=>a.value)
.forEach((person,index)=>{

const listItem = document.createElement("li");
listItem.setAttribute("data-index",index);

listItem.innerHTML = `
<span class="number">${index+1}</span>
<div class="draggable" draggable="true">
<p class="person-name">${person}</p>
<i class="fa-solid fa-grip-lines"></i>
</div>
`;

listitems.push(listItem);
draggable_list.appendChild(listItem);


});
addEventListeners();

}

check.addEventListener("click",shuffleNames);
check.addEventListener("click",checkOrder);

function shuffleNames(){

draggable_list.innerHTML="";
listitems.length=0;

createlist();

}
function checkOrder(){

listitems.forEach((listItem,index)=>{

const personName =
listItem.querySelector(".person-name").innerText.trim();

if(personName === richestPeople[index]){

listItem.classList.add("right");
listItem.classList.remove("wrong");

}else{

listItem.classList.add("wrong");
listItem.classList.remove("right");

}

});

}

function dragStart(){
dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e){
e.preventDefault();
}

function drop(){
const dragEndIndex = +this.getAttribute("data-index");
swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(fromIndex,toIndex){

const itemOne = listitems[fromIndex].querySelector(".draggable");
const itemTwo = listitems[toIndex].querySelector(".draggable");

listitems[fromIndex].appendChild(itemTwo);
listitems[toIndex].appendChild(itemOne);

}

function addEventListeners(){

const draggables = document.querySelectorAll(".draggable");
const dragListItems = document.querySelectorAll(".draggable-list li");

draggables.forEach(draggable=>{
draggable.addEventListener("dragstart",dragStart);
});

dragListItems.forEach(item=>{
item.addEventListener("dragover",dragOver);
item.addEventListener("drop",drop);
});

}
