const addToDoButton = document.getElementById('addTodo')
const toDoContainer = document.getElementById('toDoContainer')
const inputField = document.getElementById('inputField')
const deleteSelectedButton = document.getElementById('deleteSelected')
const message = document.getElementById('message')

function addTodo() {
	if (inputField.value.trim() === '') {
		message.innerText = 'Пожалуйста, введите задачу.'
		setTimeout(() => {
			message.innerText = ''
		}, 3000)
		return
	}

	let todoItem = document.createElement('div')
	todoItem.classList.add('todo__item')

	let checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.classList.add('todo__checkbox')
	checkbox.setAttribute('title', 'Отметить задачу')

	let text = document.createElement('span')
	text.classList.add('todo__text')
	text.innerText = inputField.value

	let importantButton = document.createElement('button')
	importantButton.classList.add('todo__important-button')
	importantButton.innerText = '★'
	importantButton.setAttribute('title', 'Отметить как важное')

	let unmarkButton = document.createElement('button')
	unmarkButton.classList.add('todo__unmark-button')
	unmarkButton.innerText = '⎌'
	unmarkButton.setAttribute('title', 'Убрать зачёркивание')

	todoItem.appendChild(checkbox)
	todoItem.appendChild(text)
	todoItem.appendChild(importantButton)
	todoItem.appendChild(unmarkButton)
	toDoContainer.appendChild(todoItem)

	inputField.value = ''

	let clickCount = 0

	todoItem.addEventListener('click', function (event) {
		clickCount++
		setTimeout(() => {
			if (clickCount === 2 && !event.target.matches('button')) {
				if (todoItem.classList.contains('todo__item--completed')) {
					toDoContainer.removeChild(todoItem)
				} else {
					text.style.textDecoration = 'line-through'
					todoItem.classList.add('todo__item--completed')
				}
			}
			clickCount = 0
		}, 300)
	})

	unmarkButton.addEventListener('click', function () {
		text.style.textDecoration = 'none'
		todoItem.classList.remove('todo__item--completed')
	})

	importantButton.addEventListener('click', function () {
		todoItem.classList.toggle('todo__item--important')
		if (todoItem.classList.contains('todo__item--important')) {
			toDoContainer.prepend(todoItem)
		}
	})
}

addToDoButton.addEventListener('click', addTodo)

inputField.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addTodo()
	}
})

deleteSelectedButton.addEventListener('click', function () {
	let todoItems = document.querySelectorAll('.todo__item')
	todoItems.forEach(function (item) {
		let checkbox = item.querySelector('.todo__checkbox')
		if (checkbox.checked) {
			toDoContainer.removeChild(item)
		}
	})
})
