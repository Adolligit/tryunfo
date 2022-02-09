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
        isSaveButtonDisabled: true,
      },
    };

    this.changeState = this.changeState.bind(this);
    this.buttonSaveValidation = this.buttonSaveValidation.bind(this);
  }

  changeState({ target }) {
    const { name, value } = target;
    const { payload } = this.state;

    this.setState({
      payload: {
        ...payload,
        [name]: value,
      },
    }, this.buttonSaveValidation); // Luanderson passou aqui.
  }

  buttonSaveValidation() {
    const { payload } = this.state;
    const max = 90;
    const sumMax = 210;

    const {
      payload: {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      },
    } = this.state;

    const emptyField = [
      cardName,
      cardDescription,
      cardImage,
      cardRare].every((field) => field !== '');

    const conditionAttibutes = [
      cardAttr1,
      cardAttr2,
      cardAttr3].every((number) => number >= 0 && number <= max);

    const twoHundredAndTen = (Number(cardAttr1)
      + Number(cardAttr2)
      + Number(cardAttr3)) <= sumMax;

    console.log(twoHundredAndTen);

    return this.setState({
      payload: {
        ...payload,
        isSaveButtonDisabled: !(emptyField && conditionAttibutes && twoHundredAndTen),
      },
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
