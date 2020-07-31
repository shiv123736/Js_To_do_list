"use script";
var note = document.getElementById('note');
var add_note = document.getElementById('add_note');
var container = document.getElementsByClassName('list')[0];
var choice = document.getElementsByClassName('choice')[0];
var page = document.getElementsByClassName('pagging')[0];
var size = 0;

add_note.addEventListener('click', () => {
    event.preventDefault();
    if(note.value.trim() == "") {
        // alert('Please Enter Text');
        note.style.border = '2px solid red';
        note.style.color = 'red';
        note.value = "Text Required...";
    }
    else {
        add_element_note(note.value);
        save_list(note.value);
    }
});
container.addEventListener('click', dlt_read_note);
choice.addEventListener('click', swap);
page.addEventListener('click', page_change);


//function to clear input field
function clear_text() {
    note.value = "";
    note.style.border = 'none';
    note.style.color = 'black';
    note.setAttribute('placeholder', 'Type Here...');

}
//function to add new note in list
function add_element_note(text) {
    // console.log('element work');
    //container
    var note_container = document.createElement('div');
        note_container.classList.add('notes')
    // create li
    var note_element = document.createElement('li');
    //store text in li
        note_element.innerText = text;
    //add a class to li
        note_element.classList.add('note-item');
    //add li to div
        note_container.appendChild(note_element);
    //create Read button
    var rbtn = document.createElement('button');
        rbtn.innerHTML = '<i class="fas fa-check"></i>';
        rbtn.classList.add('read-btn');
        note_container.appendChild(rbtn);
    //create delete button    
    var dbtn = document.createElement('button');
        dbtn.innerHTML = '<i class="fas fa-trash"></i>';
        dbtn.classList.add('del-btn');
        note_container.appendChild(dbtn);

    container.appendChild(note_container);
    // note.value = "";
}
//function to delete and read note
function dlt_read_note(e) {
    console.log(e.target);
    const item = e.target;
    //delete
    if(item.classList[0] == 'del-btn') {
        var parent = item.parentElement;
        parent.classList.add('fall');
        value = parent.innerText;
        parent.addEventListener('transitionend', () => {
            parent.remove();
        });
        console.log(parent.innerText);
        dlt_from_local(value);
    }
    //read
    if(item.classList[0] == 'read-btn') {
        var parent = item.parentElement;
        parent.classList.toggle('read');
        // console.log(str);
        // str.style.opacity = 0.3;
        // parent.childNodes[1].style.opacity = 0.3;
        // str.style.textDecoration = 'line-through';
    }
}

//function to display selected notes
function swap(e) {
    const notes = container.childNodes;
    for ( let i = 1; i<=notes.length; i++) {
        // console.log(notes[i].classList.contains('read'));
        switch(e.target.value) {
            case 'all':
                notes[i].style.display = 'flex';
            break;
            case 'read':
                if(notes[i].classList.contains('read')) {
                    notes[i].style.display = 'flex';
                }
                if(!notes[i].classList.contains('read')) {
                    notes[i].style.display = 'none';
                }
            break;
            case 'unread':
                if(!notes[i].classList.contains('read')) {
                    notes[i].style.display = 'flex';
                }
                if( notes[i].classList.contains('read')) {
                    notes[i].style.display = 'none';
                }
            break;
            default: 
                console.log('not working');
        }
    }
}

function page_change(e) {
    let = btn = e.target;
    console.log(btn.value);
    page_no = btn.value;

    //access to local storage
    str_arr = [];
    str = localStorage.getItem('notes');
    str_arr = JSON.parse(str);
    let i = str_arr.length - 1;
    let size = str_arr.length - 5;
    switch(page_no) {
        case '1':
            console.log('1stwork');
            i = str_arr.length - 1;
            size = i - 4;
            break;
        case '2':
            i = str_arr.length - 6;
            size = i - 4;
            break;
        case '3':
            i = str_arr.length - 11;
            size = i - 4;
            break;
    }
    if(size < 0) {
        size = 0;
    }
    console.log(str_arr.length);
    console.log('size:' +size);
    console.log('i:' +i);

    container.innerHTML = "";
    while(i >= size) {
        add_element_note(str_arr[i]);            
        i--;

    }
}

//SAVE TO LOCAL STORAGE
window.onload = () => {
    let container = document.getElementsByClassName('list')[0];
    container.innerHTML = "";
    get_list();
}

//FIRST, FETCH DATA FROM LOCAL STORAGE
function get_list() {
    str_arr = [];
    if(localStorage.getItem('notes') == null) {
        console.log('empty list');
        page.style.display = 'none';
    }
    else {
        str = localStorage.getItem('notes');
        str_arr = JSON.parse(str);
        container.innerHTML = "";
        // str_arr.forEach(element => {
        //     add_element_note(element);            
        // });
        size = str_arr.length;
        if(size < 5) {
            for( let i = str_arr.length-1; i >= 0; i--)
                add_element_note(str_arr[i]);   
        } 
        else {
            for( let i = str_arr.length-1; i >= size-5; i--)
                add_element_note(str_arr[i]);  
        }        
    }

}

// SAVE DATA 
function save_list(note) {
    str_arr = [];
    if(localStorage.getItem('notes') == null) {
        str_arr.push([note]);
        localStorage.setItem('notes',JSON.stringify(str_arr));
    }
    else {
        str = localStorage.getItem('notes');
        str_arr = JSON.parse(str);
        str_arr.push(note);
        localStorage.setItem('notes',JSON.stringify(str_arr));
    }
    this.note.value = "";
    get_list();
}

//DELETE DATA
function dlt_from_local(value) {
    console.log('function working');
    arr = [];
    str = localStorage.getItem('notes');
    arr = JSON.parse(str);
    index = arr.indexOf(value);
    arr.splice(index, 1);
    localStorage.setItem('notes',JSON.stringify(arr)); 
    get_list();  
}