import React from 'react';
// import Card from './components/Card';
import Preview from './components/Preview/Preview';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
    this.getStateChild = this.getStateChild.bind(this);
  }

  getStateChild(state) {
    const { cards } = this.state;

    this.setState({
      cards: [...cards, state],
    });
  }

  render() {
    // const { cards } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Preview getStateChild={ this.getStateChild } />
        {/* { cards.map((card) => <Card key={ card.cardName } { ...card } />) } */}
      </div>
    );
  }
}

export default App;
