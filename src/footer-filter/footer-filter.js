import React from 'react'
import './footer-filter.css'

const FooterFilter = ({ completedItems, activeItems, allItems }) => (
  <ul className="filters">
    <li>
      <button className="selected" onClick={allItems}>
        All
      </button>
    </li>
    <li>
      <button onClick={activeItems}>Active</button>
    </li>
    <li>
      <button onClick={completedItems}>Completed</button>
    </li>
  </ul>
)

export default FooterFilter
