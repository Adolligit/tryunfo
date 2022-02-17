const STATE = {
  payload: {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
  },
  // crie funções separadas para cada filtro ao invés de estados separados.
  filteredCards: [],
  cardsFilters: {
    filterByName: [],
    filterByRarity: [],
    filterByTrunfo: [],
    filterResult: [],
  },
  hasTrunfo: false,
  savedCards: [],
};

export default STATE;
