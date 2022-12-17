import React from 'react';
// import './Homepage.css';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        if (!isLoaded(this.props.homepage)) {
            return <div>Loading...</div>;
        }

        const decks = Object.keys(this.props.homepage).map(deckId => {
            const deck = this.props.homepage[deckId];
            return (
                <div key={deckId}>
                    <Link to={`/viewer/${deckId}`}>{deck.name}</Link>
                </div>
            );
        });

        return (
            <div>
                <h2>Homepage</h2>
                <Link to="/editor">Create a new card deck</Link>
                <h3>Flashcards</h3>
                { decks }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { homepage: state.firebase.data.homepage };
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(Homepage);