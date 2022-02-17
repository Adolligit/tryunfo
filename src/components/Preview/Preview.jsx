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
    this.alreadyHasTrunfo = this.alreadyHasTrunfo.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.filterRarity = this.filterRarity.bind(this);
    this.filterName = this.filterName.bind(this);
    this.filterTrunfo = this.filterTrunfo.bind(this);
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

  alreadyHasTrunfo() {
    const { savedCards } = this.state;

    this.setState({ hasTrunfo: savedCards.some((card) => card.cardTrunfo) });
  }

  filterName({ target: { value } }) {
    const { savedCards } = this.state;
    const filteredNames = savedCards.filter((card) => card.cardName.includes(value));
    const toFilteredCards = (value) ? filteredNames : savedCards;

    this.setState({
      filteredCards: toFilteredCards,
    });
  }

  filterRarity({ target: { value } }) {
    if (value !== 'todas') {
      const { savedCards } = this.state;
      const filteredNames = savedCards.filter((card) => card.cardRare === value);
      const toFilteredCards = (value) ? filteredNames : savedCards;

      this.setState({
        filteredCards: toFilteredCards,
      });
    }
  }

  filterTrunfo({ target: { checked } }) {
    const { savedCards } = this.state;
    const filteredNames = savedCards.filter((card) => card.cardTrunfo);
    const toFilteredCards = (checked) ? filteredNames : savedCards;

    this.setState({
      filteredCards: toFilteredCards,
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
      this.alreadyHasTrunfo);
  }

  deleteCard(nameCard) {
    const { savedCards } = this.state;
    const CardwillBeDeleted = savedCards.filter((card) => card.cardName !== nameCard);

    this.setState({
      savedCards: CardwillBeDeleted,
      filteredCards: CardwillBeDeleted,
    }, this.alreadyHasTrunfo);
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
              onChange={ this.filterName }
            />
          </label>
          <label htmlFor="Filtrar">
            Raridade:
            <select
              data-testid="rare-filter"
              onChange={ this.filterRarity }
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="Trunfo">
            Trunfo:
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              name="cardTrunfo"
              onChange={ this.filterTrunfo }
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
