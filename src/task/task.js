import React from 'react'
import './task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

class Task extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    filtered: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    created: PropTypes.object,
  }

  static defaultProps = {
    label: 'Task',
    done: false,
    filtered: false,
    onDeleted: () => {},
    onToggleDone: () => {},
    created: new Date(),
  }

  render() {
    const { label, created, done, filtered, onDeleted, onToggleDone } = this.props

    let className = 'view'
    let checked = false

    if (done) {
      className += ' completed'
      checked = true
    }

    if (filtered) {
      className += ' filtered'
    }

    return (
      <li className={className}>
        <input onClick={onToggleDone} className="toggle" type="checkbox" checked={checked} readOnly />
        <label onClick={onToggleDone}>
          <span className="description">{label}</span>
          <span className="created">Created {formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </li>
    )
  }
}

export default Task
