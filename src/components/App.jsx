import React, { Component } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner'

import css from './styles.module.css'
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    numberOfPage: 1,
    isLoading: false,
    totalHits: 0,
    error: false,
  };

  onSearchSubmit = value => {
    this.setState({ searchValue: value });
  };

  incrementNumberOfPage = () => {
    this.setState(prevState => {
      return { numberOfPage: prevState.numberOfPage + 1 };
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ isLoading: true, numberOfPage: 1})
      return axios
        .get(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=1&key=35510757-d0f590ce383c890c04ecc88d8&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(data =>
          this.setState(prev => ({
            ...prev,
            images: data.data.hits,
            isLoading: false,
            totalHits: data.data.totalHits
          }))
        )
        .catch(error => this.setState({error:true}))
    }

    if (prevState.numberOfPage < this.state.numberOfPage) {
      this.setState({ isLoading: true });
      return axios
        .get(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.numberOfPage}&key=35510757-d0f590ce383c890c04ecc88d8&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(data =>
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...data.data.hits],
            };
          })
        )
        .catch(error => this.setState({error:true}))
        .finally(()=>{this.setState({isLoading: false})})
    }
  }

  render() {
    const { images, isLoading, totalHits, error } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSearchSubmit}/>
        {error && <h1>Please try again</h1>}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && !isLoading && images.length < totalHits && (
          <LoadMoreBtn onClick={this.incrementNumberOfPage}></LoadMoreBtn>
        )}
        {isLoading && <RotatingLines
         strokeColor="grey"
         strokeWidth="5"
         animationDuration="0.75"
         width="96"
         visible={true}
         /> }
      </div>
    );
  }
}