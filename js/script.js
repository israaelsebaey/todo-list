// select elements

let todoInput=document.getElementById('todo');
let radioBtn=document.querySelectorAll('.category input');
let submitBtn=document.getElementById('submitBtn');
let todoListContainer=document.getElementById('todo-list-container');
let empty=document.getElementById('empty');
////////////////////////////////////////////////////////// 
let arrTodo=JSON.parse(localStorage.getItem('todos'))||[];

function Warning(){
    Swal.fire({
        icon: 'warning',
        title: 'Please Enter Your Todo!',
        confirmButtonColor: "#facea8",
        iconColor:"#facea8",
    })
}

function category(){
    let type='';
    for(let item of radioBtn){
        if(item.checked){
            type=item.value
        }
    }
    return type;
}
/////////////////DISPLAY//////////////////////
function display(){
    let out='';
    todoListContainer.innerHTML=' ';
    for(let item of arrTodo){
        out+=`<div class="todo-list mt-3">
                <div class="todo-tasks d-flex justify-content-between">
                    <div class="task d-flex">
                        <input type="checkbox" name="task" class='${item.category}' onclick='check(event)'/>
                        <div class="mx-2"><input type="text" value="${item.todo}" readonly/></div>
                    </div>
                    <div class="icons">
                        <i class="fas fa-edit" onclick='editItem(event,${item.id})'></i>
                        <i class="fas fa-trash" onclick='deleteItem(event,${item.id})'></i>
                    </div>
                </div>
            </div>`     
    }
    todoListContainer.innerHTML=out;
}
display(); 
/////////////////ADD//////////////////////
submitBtn.addEventListener('click',(e)=>{
     e.preventDefault();
     let todoValue=todoInput.value.trim();
     if(todoValue===''){
        Warning();
     }
     else{
        let lastID=arrTodo.length?arrTodo[arrTodo.length-1].id:0
        let myObj={
            id:++lastID,
            todo:todoValue,
            category:category()
        }
        todoInput.value='';
        arrTodo.push(myObj);
        localStorage.setItem('todos',JSON.stringify(arrTodo));
        if(arrTodo.length!=0){
            empty.style.display='none';
        }
        display();
     }
})
/////////////////CHECK////////////////////
function parentElement(ele){
    let parent=ele.target.parentElement;
    let ancestor=parent.parentElement.parentElement;
    return [parent,ancestor];
}
function check(e){
    let parent=parentElement(e)[0];
    let ancestor=parentElement(e)[1];
    let inpt=parent.children[1].children[0];
    if(e.target.checked){
        inpt.classList.add('remove');
        ancestor.style.opacity='0.5';
    }
    else{
        inpt.classList.remove('remove');
        ancestor.style.opacity='1';
    }
}
////////////////EDIT//////////////////////
function editItem(e,id){
    let parent=parentElement(e)[0];
    let readonlyInpt=parent.previousElementSibling.children[1].children[0];
    e.target.style.color='#2a9d8f';
    readonlyInpt.removeAttribute('readonly');
    readonlyInpt.focus();
    readonlyInpt.addEventListener('blur',()=>{
        let inptValue=readonlyInpt.value.trim();
        let obj=arrTodo.find(item=>item.id===id);
        obj.todo=inptValue;
        e.target.style.color='#6610f2';
        readonlyInpt.setAttribute('readonly',true);
        localStorage.setItem('todos',JSON.stringify(arrTodo));
    })
} 
/////////////////DELETE/////////////////////////
function deleteItem(e,id){
    let ancestor=parentElement(e)[1];
    let indx=arrTodo.map(item=>item.id).indexOf(id);
    if(indx!==-1){
        arrTodo.splice(indx,1);
        localStorage.setItem('todos',JSON.stringify(arrTodo));
        ancestor.classList.add('removeELement');
        setTimeout(display,200)
    }
    if(arrTodo.length==0){
        setTimeout(function(){
            empty.style.display='block';
        },250)
    }
} 
