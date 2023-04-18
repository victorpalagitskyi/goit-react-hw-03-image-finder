import React, { Component } from 'react';
import css from '../styles.module.css'

export class Modal extends Component {
  hideModalKeydown = e => {
    if (e.key === 'Escape') {
      this.props.onModalClick();
    }
  };

  hideModalClick = e => {
    if (e.target.dataset.action === 'overlay') {
      this.props.onModalClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.hideModalKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hideModalKeydown);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.hideModalClick} data-action="overlay">
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}