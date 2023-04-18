import React, { Component } from 'react';
import css from '../styles.module.css'

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  onSearchInputChange = e => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') {
      alert('Please enter request');
      return;
    }
    this.props.onSubmit(this.state.inputValue.toLowerCase());
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            value={inputValue}
            onChange={this.onSearchInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}