import { mockData } from 'mocks/data';

/* TYPES */
const ADD_LIST = 'TRELLO/ADD_LIST';
const CHANGE_TITLE_LIST = 'TRELLO/CHANGE_TITLE_LIST';
const REMOVE_LIST = 'TRELLO/REMOVE_LIST';
const ADD_CARD = 'TRELLO/ADD_CARD';
const REMOVE_CARD = 'TRELLO/REMOVE_CARD';
const EDIT_CARD = 'TRELLO/EDIT_CARD';
const DRAG_END_LIST = 'TRELLO/DRAG_END_LIST';
const DRAG_END_CARD = 'TRELLO/DRAG_END_CARD';

// Helpers for Local Storage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Initial State
const localStorageState = loadFromLocalStorage('taskanaState');
const initialState = localStorageState || { ...mockData };

// Actions
export const addList = (payload) => ({ type: ADD_LIST, payload });
export const changeTitleList = (listId, title) => ({
  type: CHANGE_TITLE_LIST,
  payload: { listId, title },
});
export const removeList = (listId) => ({ type: REMOVE_LIST, payload: { listId } });
export const addCard = (listId, card) => ({
  type: ADD_CARD,
  payload: {
    listId,
    card,
  },
});
export const removeCard = (listId, cardId) => ({
  type: REMOVE_CARD,
  payload: { listId, cardId },
});
export const editCard = (cardId, cardText) => ({
  type: EDIT_CARD,
  payload: { cardId, cardText },
});
export const onDragEndList = (payload) => ({ type: DRAG_END_LIST, payload });
export const onDragEndCard = (payload) => ({ type: DRAG_END_CARD, payload });

// Reducer
const reducers = (state = initialState, { type, payload }) => {
  let newState;

  switch (type) {
    case ADD_LIST: {
      const { id, title, cards } = payload;
      const newLists = { id, title, cards };

      newState = {
        ...state,
        columns: [...state.columns, id],
        lists: { ...state.lists, [id]: newLists },
      };
      break;
    }

    case CHANGE_TITLE_LIST: {
      const { listId, title } = payload;
      const updatedList = { ...state.lists[listId], title };

      newState = {
        ...state,
        lists: { ...state.lists, [listId]: updatedList },
      };
      break;
    }

    case REMOVE_LIST: {
      const { listId } = payload;
      const newLists = { ...state.lists };
      delete newLists[listId];
      const newColumns = state.columns.filter((column) => column !== listId);

      newState = {
        ...state,
        columns: newColumns,
        lists: newLists,
      };
      break;
    }

    case ADD_CARD: {
      const { listId, card } = payload;
      const updatedList = {
        ...state.lists[listId],
        cards: [...state.lists[listId].cards, card.id],
      };

      newState = {
        ...state,
        lists: { ...state.lists, [listId]: updatedList },
        cards: { ...state.cards, [card.id]: card },
      };
      break;
    }

    case REMOVE_CARD: {
      const { listId, cardId } = payload;
      const newCards = { ...state.cards };
      delete newCards[cardId];

      const updatedList = {
        ...state.lists[listId],
        cards: state.lists[listId].cards.filter((card) => card !== cardId),
      };

      newState = {
        ...state,
        lists: { ...state.lists, [listId]: updatedList },
        cards: newCards,
      };
      break;
    }

    case EDIT_CARD: {
      const { cardId, cardText } = payload;
      const updatedCard = { ...state.cards[cardId], title: cardText };

      newState = {
        ...state,
        cards: { ...state.cards, [cardId]: updatedCard },
      };
      break;
    }

    case DRAG_END_LIST: {
      const { destination, source } = payload;
      if (!destination) return state;

      const newColumns = [...state.columns];
      const [movedList] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movedList);

      newState = {
        ...state,
        columns: newColumns,
      };
      break;
    }

    case DRAG_END_CARD: {
      const { destination, source } = payload;
      if (!destination) return state;

      if (source.droppableId === destination.droppableId) {
        const list = state.lists[source.droppableId];
        const newCards = [...list.cards];
        const [movedCard] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, movedCard);

        newState = {
          ...state,
          lists: {
            ...state.lists,
            [source.droppableId]: { ...list, cards: newCards },
          },
        };
      } else {
        const sourceList = state.lists[source.droppableId];
        const destinationList = state.lists[destination.droppableId];

        const sourceCards = [...sourceList.cards];
        const destinationCards = [...destinationList.cards];

        const [movedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, movedCard);

        newState = {
          ...state,
          lists: {
            ...state.lists,
            [source.droppableId]: { ...sourceList, cards: sourceCards },
            [destination.droppableId]: { ...destinationList, cards: destinationCards },
          },
        };
      }
      break;
    }

    default:
      return state;
  }

  // Save new state to localStorage
  saveToLocalStorage('taskanaState', newState);
  return newState;
};

export default reducers;
