import React from 'react'
import PropTypes from 'prop-types'

class SelectShelf extends React.Component {
  static PropTypes = {
    addBookTo: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired
  }

  /** returns the book shelf if present on the shelves, otherwise returns "none" */
  /** used to indicate that a book is on a shelve when returned from a search */
  getDefaultSelect = (book, allBooks) => {
    let default_select;
    allBooks.forEach(element_book => {
      if(book.id === element_book.id) {
        default_select = element_book.shelf
      }
    })
    return default_select || "none"
  }

  render() {
    const { book, addBookTo, allBooks } = this.props /** destructuring */
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.getDefaultSelect(book, allBooks)}
          onChange={(event) => {addBookTo(book, event.target.value)
        }}>
          <option value="nonetwo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default SelectShelf
