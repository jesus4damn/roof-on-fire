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
    allowedAPI: boolean;
    fixtures: IFixture[]
    setAllowAPI: (v: boolean) => void;
    updateFixture: (fixture: IFixture) => void    
}

const Visualizer: React.FC<IProps> = ({ fixtures, allowedAPI, setAllowAPI, updateFixture }) => {
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
            <span>{context.musicContext.currentTime.toFixed(2)}</span>
            <button onClick={() => setAllowAPI(!allowedAPI)}
                    style={{color: allowedAPI ? "green" : "red"}}
            >
                {allowedAPI ? "Disable" : "Enable"} API
            </button>
            {/*<StageWrapper fixtures={fixtures} workTime={context.musicContext.currentTime} enabled={enabled}/>*/}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: "80%"}}>
                {fixtures && fixtures.length
                    ? fixtures.map(f => <div
                        key={f.id}
                        className={`fixtureViz ${f.shot ? "shot" : ""}`}
                        onClick={() => updateFixture({...f, selected: !f.selected})}
                    >
                        <img src={f.img ? f.img : ''} className={`fixtureVizImg ${f.selected ? "active" : ""}`}/>
                        <span className={`fixturesNumber ${f.selected ? "active" : ""}`}>{f.number}</span>
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
                Горелки
            </button>
            <button className={'fixturesBtnPosition'}  >
                +
            </button>
            </div>
        </div>

        </div>

)};

export default Visualizer;
