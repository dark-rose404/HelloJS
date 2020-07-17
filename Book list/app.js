/*   

    AUTHOR => CODED-HOLA
    PROJECT => BOOK-LIST APP

*/
class BooklistUI {

    displayUI(title, author, isbn){
        const tables = document.querySelector('.tables');
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${title}</td>
                        <td>${author}</td>
                        <td>${isbn}</td>
                        <td>
                            <a href="#" class="del-link">
                                <i class="del">x</i>
                            </a>
                        </td>  
                        `;
        tables.appendChild(tr);
        console.log(tr);
        
    }        
    alertUI(msg, cls){
        const body = document.querySelector('.book-list-body'),
              title = document.querySelector('.book-list-form');

        const div = document.createElement('h4');
        div.appendChild(document.createTextNode(msg));
        div.className = `alert ${cls}`;

        body.insertBefore(div, title);
        setTimeout(function(){
             div.remove();
        }, 2000);
    }
    delBook(e){
        if(e.parentElement.classList.contains('del-link')){
            e.parentElement.parentElement.parentElement.remove();
            console.log(e.parentElement.parentElement.parentElement);
        }      
        
    }
    clearInputs(){
        document.querySelector('#book-list_title').value = '';
        document.querySelector('#book-list_author').value = '';
        document.querySelector('#book-list_isbn').value = '';

        document.querySelector('#book-list_title').focus();
        
    }

}


class Booklist {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

document.querySelector('.submit-btn').addEventListener('click', function(e){
    const title = document.querySelector('#book-list_title').value,
          author = document.querySelector('#book-list_author').value,
          isbn = document.querySelector('#book-list_isbn').value;
    
    // INITIALIZE THE CLASS 
    const book = new Booklist(title, author, isbn);
    const UI = new BooklistUI();

    if(title !== '' && author !== '' && isbn !== ''){
        // DEV  
        UI.displayUI(title, author, isbn);
        UI.alertUI('Book added successfully', 'success');
    }else {
        UI.alertUI('please fill in all inputs', 'danger');
    }
    
        UI.clearInputs();
    

    e.preventDefault();
});

document.querySelector('.tables').addEventListener('click', function(e){
    const UI = new BooklistUI;
    UI.delBook(e.target);
});


