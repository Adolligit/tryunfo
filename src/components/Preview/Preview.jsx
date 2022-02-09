import React from 'react';
import Form from '../Form';
import Card from '../Card';
import STATE_INITIAL from './STATE_INITIAL';

class Preview extends React.Component {
  constructor() {
    super();
    this.state = STATE_INITIAL;

    this.changeState = this.changeState.bind(this);
    this.buttonSaveValidation = this.buttonSaveValidation.bind(this);
    this.saveData = this.saveData.bind(this);

    console.log(STATE_INITIAL);
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

    const twoHundredAndTen = (
      Number(cardAttr1)
      + Number(cardAttr2)
      + Number(cardAttr3)) <= sumMax;

    return this.setState({
      payload: {
        ...payload,
        isSaveButtonDisabled: !(emptyField && conditionAttibutes && twoHundredAndTen),
      },
    });
  }

  saveData() {
    const { payload, savedCards } = this.state;

    this.setState({
      savedCards: [...savedCards, { ...payload }],
    });
    this.setState({ payload: STATE_INITIAL.payload });
  }

  render() {
    const { payload } = this.state;

    return (
      <>
        <Form
          { ...payload }
          onInputChange={ this.changeState }
          onSaveButtonClick={ this.saveData }
        />
        <Card
          { ...payload }
          onInputChange={ this.changeState }
        />
      </>
    );
  }
}

export default Preview;
