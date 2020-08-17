function Opklada(match, betType, odd){
    this.match = match;
    this.betType = betType;
    this.odd = odd;
}
function UI(){}

UI.prototype.addGameToList = function(opklada){
    const list = document.getElementById('book-list')
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> ${opklada.match} </td>
        <td> ${opklada.betType} </td>
        <td> ${opklada.odd} </td>
        <td><a href="#" class='delete'>X</a></td>
    `
    list.appendChild(row)
}
UI.prototype.alertFunction = function(message, className){
    const div = document.createElement('div'); 
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container')
    const gameForm = document.querySelector('#game-form');
    container.insertBefore(div, gameForm);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}
UI.prototype.addedGame = function(message, className){
    const div = document.createElement('div'); 
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container')
    const table = document.querySelector('table');
    container.insertBefore(div, table);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

UI.prototype.deleteGame = function(target){
    if(target.className ==='delete'){
        target.parentElement.parentElement.remove()
    }
}

UI.prototype.clearFields = function(){
    document.getElementById('match').value = '';
    document.getElementById('bet-type').value = '';
    document.getElementById('odd').value = ''
}

class Store {
    static getGame() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static displayGame() {
      const books = Store.getGame();
  
      books.forEach(function(book){
        const ui  = new UI;
  
        // Add book to UI
        ui.addGameToList(book);
      });
    }
  
    static addGame(book) {
      const books = Store.getGame();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeGame(match) {
      const books = Store.getGame();
  
      books.forEach(function(book, index){
       if(book.match === match) {
        books.splice(index, 1);
       }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

document.addEventListener('DOMContentLoaded',Store.displayGame)

document.getElementById('game-form').addEventListener('submit', function(e){
    const match= document.getElementById('game').value,
          betType = document.getElementById('bet-type').value,
          odd = document.getElementById('odd').value;
    
    
    const opklada = new Opklada(match,betType,odd)
    
    const ui = new UI()
    if(match == ''| betType == '' | odd==''){
        ui.alertFunction('You should fill all the fields','error')
    } else{
        ui.addGameToList(opklada)
        Store.addGame(opklada)
        ui.addedGame('You succesfully add the game', 'success')
        ui.clearFields()
    }
    
    
    e.preventDefault()
})
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI()
    ui.deleteGame(e.target)
    Store.removeGame(e.target.parentElement.previousElementSibling.textContent);
    ui.alertFunction('Game deleted','success')
    e.preventDefault()
})
