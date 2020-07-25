import * as React from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture } from '../../../../types/fixtureTypes';
import { StageWrapper } from './effects/Fire';
import { useEffect, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';

let bgImage: any;
bgImage = require('../../../../assets/images/visualiser.png');

require('./Visualizer.scss');

export interface IProps {
    value: number;
    allowedAPI: boolean;
    fixtures: IFixture[]
    setAllowAPI: (v: boolean) => void;
    updateFixture: (fixture: IFixture) => void
    addFixturesToCue: (fixtures: IFixture[], cueId: string) => void
}

const Visualizer: React.FC<IProps> = ({ fixtures, allowedAPI, setAllowAPI, updateFixture, addFixturesToCue }) => {
    const context = useMusicContext();
    const [enabled, setEnabled] = useState(false);
    const [active, setActive] = React.useState(false);
    let [asd, setAsd] = useState([{startTime: 0}, {startTime: 0},{startTime: 0},{startTime: 0},{startTime: 0},{startTime: 0}]);
    let [width, setWidth] = useState(222);

    const updateCueCallback = (cueId: string) => {
        addFixturesToCue(fixtures.filter(f => f.selected), cueId)
    };

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
                    ? fixtures.map(f => <VisualizerFixture key={f.id} fixture={f} updateFixture={updateFixture} updateCue={updateCueCallback}/>)
                    : null}
            </div>
            <div className="counterBtn">
        <button className={active ? "fixturesBtnPosition " : "fixturesBtnPosition-active"} onClick={() => setActive(!active)}>
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

interface IFixtureProps {
    fixture: IFixture
    updateFixture: (fixture: IFixture) => void
    updateCue: (cueId: string) => void
}

const VisualizerFixture:React.FC<IFixtureProps> = ({updateFixture, fixture, updateCue}: IFixtureProps) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { id: fixture.selected ? fixture.id : 'noId', type: dragTypes.FIXTURE },
        end: (item: { id: string }
            | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
            console.log(item);
            if (item && fixture.selected) {
                if (dropResult && dropResult.cueType && item.id) {
                    updateCue(item.id);
                    console.log(`You dropped ${item.id} into ${dropResult.cueType}!`);
                }
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: (monitor => !!(fixture.selected && fixture.activePattern && fixture.activePattern.id))
    });

    return (
        <div
            key={fixture.id}
            className={`fixtureViz ${fixture.shot ? "shot" : ""}`}
            onClick={() => updateFixture({...fixture, selected: !fixture.selected})}
            ref={drag}
        >
            <img src={fixture.img ? fixture.img : ''} className={`fixtureVizImg ${fixture.selected ? "active" : ""}`}/>
            <span className={`fixturesNumber ${fixture.selected ? "active" : ""}`}>{fixture.number}</span>
        </div>
    )
};
