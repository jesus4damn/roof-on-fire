import * as React from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture } from '../../../../types/fixtureTypes';
import { StageWrapper } from './effects/Fire';
import { useEffect, useState } from 'react';

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
    const [enabled, setEnabled] = useState(false);
    let [asd, setAsd] = useState([{startTime: 0}, {startTime: 0},{startTime: 0},{startTime: 0},{startTime: 0},{startTime: 0}]);
    let [width, setWidth] = useState(222);

    useEffect(() => {
        let part = width / (asd.length -1);
        setAsd(asd.map((asd, i) => ({startTime: i * part})))
    }, [width]);

    return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="counter">
            <span>{context.musicContext.currentTime}</span>
            {/*<button onClick={() => setEnabled(!enabled)}> {enabled ? 'AAA' : 'nooo'}</button>*/}
            {/*<StageWrapper fixtures={fixtures} workTime={context.musicContext.currentTime} enabled={enabled}/>*/}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: "80%"}}>
                {fixtures && fixtures.length
                    ? fixtures.map(f => <div key={f.id} className={!f.shot ? "fixtureShot" : "fixture"}>
                        <img src={f.img ? f.img : ''} className={!f.shot ? "fixtureImg" : "fixtureImgActive"}/>
                        <span className={!f.shot ? "fixturesNumber" : "fixturesNumberActive"}>1</span>
                    </div>)
                    : null}
            </div>
            <div className="counterBtn">
        <button className={'fixturesBtnPosition'}>
                Все
            </button>
        <button className={'fixturesBtnPosition'}  >
                Позиция Т1
            </button>
            <button className={'fixturesBtnPosition'}  >
                Позиция Т2
            </button>
            <button className={'fixturesBtnPosition'}  >
                Грелки
            </button>
            <button className={'fixturesBtnPosition'}  >
                +
            </button>
            </div>
        </div>
      
        </div>
    
)};

export default Visualizer;
