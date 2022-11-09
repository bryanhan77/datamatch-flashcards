import React from 'react';
import './CardViewer.css';

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
        const card = this.props.cards[this.state.index][this.state.front ? 'front' : 'back'];

        return (
            <div>
                <h2>Card Viewer</h2>
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
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
        )
    }
}

export default CardViewer