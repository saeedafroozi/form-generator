import React, { useState } from 'react';
import './App.scss';
import { Desinger } from './components/Design/index'
import { createStore, compose } from 'redux'
import { formDesigner } from '../src/reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';


export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(`app-state7-${process.env.VERSION}`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) { 
    return undefined;
  }
};



export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`app-state7-${process.env.VERSION}`, serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();
const store = createStore(
  formDesigner,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Desinger />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
