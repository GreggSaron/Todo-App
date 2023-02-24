import React from 'react'

import FooterFilter from '../footer-filter'
import './footer.css'

const Footer = ({ toDo, deleteCompletedItems, activeItems, allItems, completedItems }) => (
  <footer className="footer">
    <span className="todo-count">{toDo} items left</span>
    <FooterFilter completedItems={completedItems} activeItems={activeItems} allItems={allItems} />
    <button onClick={deleteCompletedItems} className="clear-completed">
      Clear completed
    </button>
  </footer>
)

export default Footer
