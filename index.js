const addToDoButton = document.getElementById('addTodo')
const toDoContainer = document.getElementById('toDoContainer')
const inputField = document.getElementById('inputField')
const deleteSelectedButton = document.getElementById('deleteSelected')
const message = document.getElementById('message')

function addTodo() {
	const currentTime = new Date().toLocaleString()
	const todoItemTemplate = `
        <div class="todo__item">
            <input type="checkbox" class="todo__checkbox" title="Отметить задачу" />
            <span class="todo__text">${inputField.value}</span>
            <span class="todo__time">Создано: ${currentTime}</span>
            <button class="todo__important-button" title="Отметить как важное">★</button>
            <button class="todo__unmark-button" title="Убрать зачёркивание">⎌</button>
        </div>
    `

	if (inputField.value.trim() === '') {
		message.innerText = 'Пожалуйста, введите задачу.'
		setTimeout(() => {
			message.innerText = ''
		}, 3000)
		return
	}

	toDoContainer.insertAdjacentHTML('beforeend', todoItemTemplate)
	inputField.value = ''

	const todoItem = toDoContainer.lastElementChild
	let text = todoItem.querySelector('.todo__text')
	let unmarkButton = todoItem.querySelector('.todo__unmark-button')
	let importantButton = todoItem.querySelector('.todo__important-button')
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
