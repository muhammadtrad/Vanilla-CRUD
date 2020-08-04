/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// get Todos when button is clicked
const getTodos = () => {
// fetch all the list items from the FB
  fetch('/text')
    .then((resp) => resp.json())
    .then((list) => {
      const listEl = document.getElementById('list');
      // clear list from DOM before updating with new list from DB
      listEl.innerText = '';
      // loop through the array and add each object to the DOM
      list.forEach((todo) => {
        addItem(todo);
      });
    });
};

getTodos();

// THIS WILL ADD THE LIST ITEM TO THE DOM ONLY AND DELETE BUTTON WITH EVENT LISTENER
const addItem = (todo) => {
// add the list item
  const newLi = document.createElement('li');
  newLi.innerText = todo.text;
  newLi.id = todo._id;
  // add the delete button
  const delButton = document.createElement('button');
  delButton.innerText = 'Delete';
  // add the eventListener to delete item in database
  delButton.addEventListener('click', () => {
    fetch(`/text/${todo._id}`, {
      method: 'Delete',
    })
      .then((resp) => resp.json())
      .then(() => {
        // remove it from the DOM when button is clicked
        document.getElementById('list').removeChild(newLi);
      })
      .catch((err) => console.log(err));
  });
  // add the button to the list item, and add the list item to the DOM
  newLi.appendChild(delButton);
  list.appendChild(newLi);
};

// add the refresh button
document.getElementById('refresh').addEventListener('click', getTodos);

// add event listener to submit the input form
// also post new item to the DATABASE
document.getElementById('inputButton').addEventListener('click', (e) => {
  e.preventDefault();
  // get the text input element
  const textInputEl = document.getElementById('textInput');
  // prepare the body for post request
  const body = {
    text: textInputEl.value,
  };
  // create post request to backend and add line item to DB
  fetch('/text', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((todo) => {
    // clear input form
      textInputEl.value = '';
      // add the list item to the DOM
      addItem(todo);
    })
    .catch((err) => console.log(err));
});
