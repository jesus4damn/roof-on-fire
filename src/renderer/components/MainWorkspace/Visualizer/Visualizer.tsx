import * as React from 'react';

require('./Visualizer.scss');

export interface Props {
    value: number;

    incrementValue: () => any;
    decrementValue: () => any;
}

const Visualizer: React.FunctionComponent<Props> = ({ value, incrementValue, decrementValue }) => (
    <div className="counter">
        <h2>MAIN SCREEN</h2>
        <p id="counter-value">Current value: {value}</p>
        <p>
            <button id="increment" onClick={incrementValue}>
                Increment
            </button>
            <button id="decrement" onClick={decrementValue}>
                Decrement
            </button>
        </p>
    </div>
);

export default Visualizer;
