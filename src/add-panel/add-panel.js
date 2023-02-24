import React from 'react'
import './add-panel.css'
import PropTypes from 'prop-types'

class AddPanel extends React.Component {
  static propTypes = {
    addItem: PropTypes.func,
  }

  static defaultProps = {
    addItem: () => {},
  }

  state = { label: '' }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}

export default AddPanel
