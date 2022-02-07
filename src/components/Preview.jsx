import React from 'react';
import Form from './Form';
import Card from './Card';

class Preview extends React.Component {
  constructor() {
    super();
    this.state = {
      payload: {
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: true,
        hasTrunfo: '',
      },
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState({ target }) {
    const { name, value } = target;
    const { payload } = this.state;

    this.setState({
      payload: { ...payload, [name]: value },
    });
  }

  render() {
    const { payload } = this.state;
    return (
      <>
        <Form { ...payload } onInputChange={ this.changeState } />
        <Card { ...payload } onInputChange={ this.changeState } />
      </>
    );
  }
}

export default Preview;
