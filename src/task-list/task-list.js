import React from 'react'

import Task from '../task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((cur) => {
    const { id, label, created, done, filtered } = cur
    return (
      <Task
        key={id}
        label={label}
        created={created}
        done={done}
        filtered={filtered}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
  })
  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default TaskList
