import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form action="">
        <label htmlFor="nome">
          {' Nome :'}
          <input data-testid="name-input" type="text" name="name" />
        </label>
        <label htmlFor="nome">
          {' Descrição : '}
          <textarea data-testid="description-input" name="description" />
        </label>
        <label htmlFor="1-atributo">
          {' 1° atributo :'}
          <input data-testid="attr1-input" type="number" name="fistAttribute" />
        </label>
        <label htmlFor="2-atributo">
          {' 2° atributo :'}
          <input data-testid="attr2-input" type="number" name="secondAttribute" />
        </label>
        <label htmlFor="3-atributo">
          {' 3° atributo :'}
          <input data-testid="attr3-input" type="number" name="thirdAttribute" />
        </label>
        <label htmlFor="imagem">
          {' Imagem :'}
          <input data-testid="image-input" type="text" name="name" />
        </label>
        <label htmlFor="raridade">
          Raridade
          <select data-testid="rare-input" name="raridade">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="super trunfo">
          {' Super Trunfo :'}
          <input data-testid="trunfo-input" type="checkbox" name="superTrunfo" />
        </label>
        <input data-testid="save-button" type="button" name="saveButton" value="Salvar" />
      </form>
    );
  }
}

export default Form;
