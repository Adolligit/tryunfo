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
    this.deleteCard = this.deleteCard.bind(this);
    this.filterCard = this.filterCard.bind(this);
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

  filterCard({ target: { value } }) {
    const { savedCards } = this.state;
    const filtered = savedCards.filter((card) => (
      card.cardName.toLowerCase().includes(value.toLowerCase())
    ));

    // console.log(filtered);

    this.setState({
      filteredCards: filtered,
    });
  }

  saveCard() {
    const { payload, savedCards } = this.state;
    const cardsDeck = [...savedCards, { ...payload }];

    this.setState({
      savedCards: cardsDeck,
      filteredCards: cardsDeck,
    });
    this.setState({ payload: STATE.payload },
      this.alreadyHas);
  }

  deleteCard(nameCard) {
    const { savedCards } = this.state;

    this.setState({
      savedCards: savedCards.filter((card) => card.cardName !== nameCard),
    }, this.alreadyHas);
  }

  render() {
    const { payload, filteredCards, hasTrunfo } = this.state;

    return (
      <>
        <Form
          { ...payload }
          onInputChange={ this.changeState }
          onSaveButtonClick={ this.saveCard }
          hasTrunfo={ hasTrunfo }
        />
        <h2>Preview</h2>
        <Card
          { ...payload }
          onInputChange={ this.changeState }
        />
        <h2>Deck</h2>
        <fieldset>
          <h3>Filtrar</h3>
          <label htmlFor="Filtrar">
            Nome:
            <input
              data-testid="name-filter"
              type="text"
              onChange={ this.filterCard }
            />
          </label>
        </fieldset>
        { filteredCards.map((card) => (
          <div key={ card.cardName }>
            <Card { ...card } />
            <input
              data-testid="delete-button"
              type="button"
              value="Deletar"
              onClick={ () => this.deleteCard(card.cardName) }
            />
            <hr />
          </div>))}
      </>
    );
  }
}

Preview.propTypes = { getStateChild: PropTypes.func }.isRequired;

export default Preview;
