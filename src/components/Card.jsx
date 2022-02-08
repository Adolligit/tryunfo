import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <form>
        <label htmlFor="name-card">
          Nome:
          <span data-testid="name-card">{ cardName }</span>
        </label>
        <br />
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <br />
        <label htmlFor="description-card">
          Descrição:
          <span data-testid="description-card">{ cardDescription }</span>
        </label>
        <br />
        <label htmlFor="attr1-card">
          1° atributo:
          <span data-testid="attr1-card">{ cardAttr1 }</span>
        </label>
        <br />
        <label htmlFor="attr2-card">
          2° atributo:
          <span data-testid="attr2-card">{ cardAttr2 }</span>
        </label>
        <br />
        <label htmlFor="attr3-card">
          3° atributo:
          <span data-testid="attr3-card">{ cardAttr3 }</span>
        </label>
        <br />
        <label htmlFor="rare-card">
          Raridade:
          <span data-testid="rare-card">{ cardRare }</span>
        </label>
        <br />
        { cardTrunfo && <span data-testid="trunfo-card">Super Trunfo</span> }
      </form>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
