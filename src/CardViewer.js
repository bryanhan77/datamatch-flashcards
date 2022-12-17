import React from 'react';
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            front: true,
        };
    }
    
    goLeft = () => {
        this.setState({ index: this.state.index - 1, front: true });
    }

    goRight = () => {
        this.setState({ index: this.state.index + 1, front: true });
    }

    flip = () => this.setState({ front: !this.state.front });
    
    render() {
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>;
        }

        const card = this.props.cards[this.state.index][this.state.front ? 'front' : 'back'];

        return (
            <div>
                <h2>{this.props.name}</h2>
                <p id="flashcard">{card}</p>
                <p>Card {this.state.index + 1}/{this.props.cards.length}</p>
                <button 
                    disabled={this.state.index === 0}
                    onClick={this.goLeft}>Go left</button>
                <button onClick={this.flip}>Flip</button>
                <button 
                    disabled={this.state.index === this.props.cards.length - 1}
                    onClick={this.goRight}>Go right</button>
                <hr/>
                <Link to="/">Home</Link>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props);
        const deckId = props.match.params.deckId;
        return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);