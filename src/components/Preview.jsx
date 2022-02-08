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
    this.horrivelUmEspanto = this.horrivelUmEspanto.bind(this);
  }

  changeState({ target }) {
    const { name, value } = target;
    const { payload } = this.state;

    this.setState({
      payload: {
        ...payload,
        [name]: value,
      },
    });
  }

  buttonSaveValidation() {
    const { payload } = this.state;
    const eslixo = 90;

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
      cardAttr3].every((number) => number >= 0 && number < eslixo);

    this.setState({
      payload: { ...payload, isSaveButtonDisabled: !(emptyField && conditionAttibutes) },
    });
  }

  horrivelUmEspanto(event) {
    /*
      React demora para fazer a atualização do estado, por isso tive que esperar o estado atualizar para depois executar a função buttonSaveValidation() dentro do setTimeout.

      É ridículo esse código, não tem nexo. Assim que eu chamo a função changeState, já deveria atualizar o estado e depois eu poderia usar o estado atualizado no buttonSaveValidation ( estou desestruturando lá dentro o "payload" ).

      Se a atualização do estado no React é assíncrona (ou pode ser), então poderíamos usar o .then() para lidar com isso. Utilizar o setTimeout só porque o React não atulizou o estado a tempo, só me faz lembrar da frase da Paola Carosella "É horrível isso. Horrível, horrível, horrível, horrível, horroroso, horrível, um espanto, me faz mal"
    */
    this.changeState(event);
    setTimeout(() => this.buttonSaveValidation(), 0);
  }

  render() {
    const { payload } = this.state;

    return (
      <>
        <Form { ...payload } onInputChange={ this.horrivelUmEspanto } />
        <Card { ...payload } onInputChange={ this.horrivelUmEspanto } />
      </>
    );
  }
}

export default Preview;
