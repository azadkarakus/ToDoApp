/*
ToDoApp Script
Author: Azad Karakuş
https://github.com/azadkarakus
Version: 1.0.0
*/
//UI vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const footerYear = document.querySelector('#year')
let items;
var cyear;
setYear();
// load items
loadItems();
// call event listeners
eventListeners();
// event listeners
function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);
    // delete item
    taskList.addEventListener('click', deleteItem);
    // delete all
    btnDeleteAll.addEventListener('click', deleteAllItems);
}
// load items from local storage
function loadItems(){
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}
// get items from local storage
function getItemsFromLS(){
    if (localStorage.getItem('items')===null) {
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
// set item to local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}
// delete item from local storage
function deleteITemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if (item === text) {
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
// create item html
function createItem(text){
    //create li section
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    //create 'a' section of li
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    // add a to li
    li.appendChild(a);
    // add li to ul
    taskList.appendChild(li);
}
// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item!');
    }
    // create item
    createItem(input.value);
    // save to LS
    setItemToLS(input.value);
    // clear input after add
    input.value = '';
    e.preventDefault();
}
// delete item
function deleteItem(e) {
        if (e.target.className === 'fas fa-times') {
            if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            // delete item from LS
            deleteITemFromLS(e.target.parentElement.parentElement.textContent);
            }
        }  
}
//delete all items
function deleteAllItems(e) {
    // WAY 1 
    // taskList.innerHTML='';
    if (confirm('Are you sure?')) {
       // WAY 2
       /* taskList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();
            }
        });*/
        // WAY 3
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
//footer current year 
function setYear(){
    cyear = new Date();
    footerYear.innerHTML = cyear.getFullYear();
    };
    
