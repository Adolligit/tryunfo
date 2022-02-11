import PropTypes from 'prop-types';
import React from 'react';
import Form from '../Form';
import Card from '../Card';
import STATE from './STATE';

class Preview extends React.Component {
  constructor() {
    super();
    this.state = STATE;

    this.changeState = this.changeState.bind(this);
    this.buttonSaveValidation = this.buttonSaveValidation.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.alreadyHas = this.alreadyHas.bind(this);
  }

  changeState({ target }) {
    const { name, type } = target;
    const { payload } = this.state;
    let { value } = target;

    if (value && type === 'checkbox') value = true; // fixing error at the component Card

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

  alreadyHas() {
    const { savedCards } = this.state;

    this.setState({ hasTrunfo: savedCards.some((card) => card.cardTrunfo) });
  }

  saveCard() {
    const { payload, savedCards } = this.state;
    const { getState } = this.props;

    this.setState({ savedCards: [...savedCards, { ...payload }] },
      () => getState(payload));
    this.setState({ payload: STATE.payload },
      this.alreadyHas);
  }

  render() {
    const { payload, hasTrunfo } = this.state;

    return (
      <>
        <Form
          { ...payload }
          onInputChange={ this.changeState }
          onSaveButtonClick={ this.saveCard }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          { ...payload }
          onInputChange={ this.changeState }
        />
      </>
    );
  }
}

Preview.propTypes = { getState: PropTypes.func }.isRequired;

export default Preview;
