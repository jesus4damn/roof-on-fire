import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Application from './components/Application';
import store from './store/store';
import ErrorBoundary from './components/common/ErrorBounary/ErrorBounary';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

export const App = () => (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <Application />
      </DndProvider>
    </Provider>
);

// Render components
const render = (Component: any) => {
    ReactDOM.render(
      <AppContainer>
        <ErrorBoundary hiLevel={true}>
          <Component />
        </ErrorBoundary>
      </AppContainer>,
        mainElement
    );
};

render(App);
