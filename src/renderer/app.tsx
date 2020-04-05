import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


import Application from './components/Application';
import store from './store/store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <DndProvider backend={Backend}>
                    <Component />
                </DndProvider>
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
