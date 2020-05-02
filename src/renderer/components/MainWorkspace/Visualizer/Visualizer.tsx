import * as React from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture } from '../../../../types/fixtureTypes';
import { VisStage } from './effects/Fire';

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
            <span>{context.musicContext.currentTime}</span>
            <VisStage fixtures={fixtures} workTime={context.musicContext.currentTime}/>
        </div>
    </div>
)};

export default Visualizer;
