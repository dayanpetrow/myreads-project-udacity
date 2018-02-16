import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book.js'
import {DebounceInput} from 'react-debounce-input';

class Search extends React.Component {

  static propTypes = {
    addBookTo: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    results: [],
    searchStatus: 'What would you like to search for?'
  }

  /** updates the query state and gets results from the API */
  doSearch = (event) => {
    const do_query = event.target.value.trim()
    this.setState({ query: do_query })

    if(do_query !== '') {
      BooksAPI.search(do_query).then((data) => {
        if (data.length > 0) {
          this.setState({results: data, searchStatus: "Displaying " + data.length + " results:" })
        } else {
          this.setState({results: [], searchStatus: "No results found"})
        }
      })
    } else {
      this.setState({results: [], searchStatus: 'What would you like to search for?'})
    }
  }

  render() {

    /** destructuring */
    const { results, searchStatus } = this.state
    const { addBookTo, allBooks } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
          <DebounceInput
            minLength={1}
            debounceTimeout={750}
            type="text" placeholder="Search by title or author" onChange={this.doSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <div className="search-status">{searchStatus}</div>
          {results.length > 0 && (
            <ol className="books-grid">
              { results.map((book) => (
                <Book key={book.id} book={book} allBooks={allBooks} addBookTo={addBookTo}/>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default Search
