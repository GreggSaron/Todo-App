import React from 'react'
import './task.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

class Task extends React.Component {
  state = {
    time: 0,
    timerInterval: 0,
    formattedTime: '00:00:00',
  }
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

  updateTimer = async () => {
    const newTime = this.state.time + 1
    await this.setState(() => {
      return {
        time: newTime,
      }
    })
    const hours = Math.floor(this.state.time / 3600)
    const minutes = Math.floor((this.state.time % 3600) / 60)
    const seconds = this.state.time % 60
    const newFormattedTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`
    this.setState({
      formattedTime: newFormattedTime,
    })
  }

  startTimer = async () => {
    if (!this.state.timerInterval) {
      const newTimerInterval = setInterval(this.updateTimer, 1000)
      await this.setState(() => {
        return {
          timerInterval: newTimerInterval,
        }
      })
    }
  }

  pauseTimer = () => {
    clearInterval(this.state.timerInterval)
    this.setState({ timerInterval: 0 })
  }

  resetTimer = () => {
    clearInterval(this.state.timerInterval)
    this.setState({ time: 0, timerInterval: 0, formattedTime: '00:00:00' })
  }

  pad = (number) => {
    if (number < 10) {
      return `0${number}`
    } else {
      return number
    }
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
        <label>
          <span className="description">{label}</span>
          <div>
            <p id="timer">{this.state.formattedTime}</p>
            <button id="startBtn" className="icon-timer icon-start" onClick={() => this.startTimer()}>
              Старт
            </button>
            <button id="pauseBtn" className="icon-timer icon-pause" onClick={() => this.pauseTimer()}>
              Пауза
            </button>
            <button id="resetBtn" className="icon-timer icon-reset" onClick={() => this.resetTimer()}>
              Сбросить
            </button>
          </div>
          <span className="created">Created {formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </li>
    )
  }
}

export default Task
