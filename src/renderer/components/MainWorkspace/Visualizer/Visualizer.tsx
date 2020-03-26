import * as React from 'react';

let bgImage: any;
bgImage = require('../../../assets/visualiser.png');

require('./Visualizer.scss');

export interface IProps {
    value: number;

    incrementValue: () => any;
    decrementValue: () => any;
}

const Visualizer: React.FC<IProps> = ({ value, incrementValue, decrementValue }) => {

    return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="counter">
            <h2>MAIN SCREEN</h2>
            <p id="counter-value">Current value: {value}</p>
            <p>
                <button id="increment" onClick={ () => {
                    incrementValue()
                }}>
                    Increment
                </button>
                <button id="decrement" onClick={decrementValue}>
                    Decrement
                </button>
            </p>
        </div>
        <img src={bgImage} className={"bgImage"}/>
    </div>
)};

export default Visualizer;
