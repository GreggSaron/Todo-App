import React from 'react'
import ReactDOM from 'react-dom/client'

import AddPanel from './add-panel/add-panel'
import TaskList from './task-list/task-list'
import Footer from './footer/footer'

import './index.css'

class App extends React.Component {
  nextId = 100

  createItem = (label) => ({
    label,
    done: false,
    id: this.nextId++,
    filtered: false,
    created: new Date(),
  })

  state = {
    todoData: [this.createItem('Drink Coffee'), this.createItem('Make Awesome App'), this.createItem('Have a lunch')],
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData, this.createItem(text)]
      return {
        todoData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const notCompletedItems = todoData.filter((el) => !el.done)
      return {
        todoData: notCompletedItems,
      }
    })
  }

  onToggleDone = (id) => {
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, done: !oldItem.done }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    this.setState(() => ({
      todoData: newArr,
    }))
  }

  completedItems = () => {
    const notCompletedItems = this.state.todoData.filter((el) => el.done === false)
    const completedItems = this.state.todoData.filter((el) => el.done === true)

    for (let i = 0; i < completedItems.length; i++) {
      completedItems[i].filtered = false
    }

    for (let i = 0; i < notCompletedItems.length; i++) {
      notCompletedItems[i].filtered = true
    }

    this.setState(() => ({
      todoData: [...notCompletedItems, ...completedItems],
    }))
  }

  activeItems = () => {
    const notCompletedItems = this.state.todoData.filter((el) => el.done === false)
    const completedItems = this.state.todoData.filter((el) => el.done === true)

    for (let i = 0; i < completedItems.length; i++) {
      completedItems[i].filtered = true
    }

    for (let i = 0; i < notCompletedItems.length; i++) {
      notCompletedItems[i].filtered = false
    }

    this.setState(() => ({
      todoData: [...notCompletedItems, ...completedItems],
    }))
  }

  allItems = () => {
    const notCompletedItems = this.state.todoData.filter((el) => el.done === false)
    const completedItems = this.state.todoData.filter((el) => el.done === true)

    for (let i = 0; i < completedItems.length; i++) {
      completedItems[i].filtered = false
    }

    for (let i = 0; i < notCompletedItems.length; i++) {
      notCompletedItems[i].filtered = false
    }

    this.setState(() => ({
      todoData: [...notCompletedItems, ...completedItems],
    }))
  }

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length
    const toDoCount = this.state.todoData.length - doneCount

    return (
      <div className="todoapp">
        <AddPanel addItem={this.addItem} />
        <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
        <Footer
          toDo={toDoCount}
          deleteCompletedItems={this.deleteCompletedItems}
          completedItems={this.completedItems}
          activeItems={this.activeItems}
          allItems={this.allItems}
        />
      </div>
    )
  }
}

const rootEl = document.getElementById('root')
const root = ReactDOM.createRoot(rootEl)
root.render(<App />)
