import { createStore } from "redux";

function reducer(store, action) {
  if (!store) {
    return {
      lookupData: null
    };
  }

  if (action.type === "SET_LOOKUP_DATA") {
    return {
      ...store,
      lookupData: action.value
    };
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
