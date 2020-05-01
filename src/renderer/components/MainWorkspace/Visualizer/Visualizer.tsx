import * as React from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture } from '../../../../types/fixtureTypes';
import Fire from './effects/Fire';

let bgImage: any;
bgImage = require('../../../../assets/images/visualiser.png');

require('./Visualizer.scss');

export interface IProps {
    value: number;
    fixtures: IFixture[]
    incrementValue: () => any;
    decrementValue: () => any;
}

const Visualizer: React.FC<IProps> = ({ fixtures }) => {
    const context = useMusicContext();
    return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="counter">
            <h2>MAIN SCREEN</h2>
            <h2> {context.musicContext.currentTime} </h2>
            <h5> Total : {context.musicContext.totalTime} </h5>
            {/*<p>*/}
            {/*    <button id="increment" onClick={ () => {*/}
            {/*        incrementValue()*/}
            {/*    }}>*/}
            {/*        Increment*/}
            {/*    </button>*/}
            {/*    <button id="decrement" onClick={decrementValue}>*/}
            {/*        Decrement*/}
            {/*    </button>*/}
            {/*</p>*/}
          
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                {fixtures.length ? fixtures.map(fixture => <div key={fixture.id + 'viz'}>
                <Fire/>
                    { context.musicContext.currentTime < 10  &&
                    <img alt={'fixture'}
                         src={fixture.img ? fixture.img : ''}
                         className={`paramBlock ${fixture.selected ? 'paramBlock-active' : ''}`}
                    />
}
                </div>) : ''}
            </div>
        </div>
        <img src={bgImage} className={"bgImage"}/>
    </div>
)};

export default Visualizer;
