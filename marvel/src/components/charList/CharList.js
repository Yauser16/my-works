
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
 
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210, 
        charEnded: false
    }

marvelService = new MarvelService();

componentDidMount() {      
   this.onRequest(); 
} 

onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError); 
}

onCharListLoading = () => {
    this.setState({
        newItemLoading: true
    })
}

onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
        ended = true;
    }

    this.setState(({offset, charList}) => ({
        charList: [...charList, ...newCharList],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended   
    }))
}

onError = () => {
    this.setState({
        loading: false,
        error: true
    });
}

itemsRef = [];

setRef = (ref) => {
    this.itemsRef.push(ref);
}

focusChar = (id) => {
    this.itemsRef.forEach(item => item.classList.remove('char__items'));
    this.itemsRef[id].classList.add('char__items');
    this.itemsRef[id].focus();
}

renderItems(arr) { 
const items = arr.map((item, i) => {
let imgStyle = {'objectFit': 'cover'};
if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
imgStyle = {'objectFit': 'unset'};
}

    return (
        <li
        ref={this.setRef}
        tabIndex={0}
        className='char__item'
        key={item.id}
        onClick={() => {
            this.props.onSelectedChar(item.id);
            this.focusChar(i);
        }}
        onKeyDown={(e, id) => {
            if (e.key === ' ' || e.key === 'Enter') {
                this.props.onSelectedChar(item.id);
                this.focusChar(i);
            }
        }}>
        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
        <div className="char__name">{item.name}</div>
    </li> 
    )
});

return (
    <ul className="char__grid">
    {items}
 </ul> 
)
}

render() {
    const {newItemLoading, charList, loading, error, offset, charEnded} = this.state;
    const items =  this.renderItems(charList); 
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;      
    const content = !(loading || error) ? items : null;
    return (        
        <div className="char__list">
               {errorMessage}
               {spinner}               
               {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
        </div>
    )
}
}
CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;