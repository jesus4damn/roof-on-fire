import * as React from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture, IPattern, IPatternStep } from '../../../../types/fixtureTypes';
import { useEffect, useMemo, useState } from 'react';
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
    const [active, setActive] = React.useState(false);

    const updateCueCallback = (cueId: string) => {
        addFixturesToCue(fixtures.filter(f => f.selected), cueId)
    };

    return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="visualizerWrapper">
            <button onClick={() => setAllowAPI(!allowedAPI)}
                    style={{color: allowedAPI ? "green" : "red"}}
            >
                {allowedAPI ? "Disable" : "Enable"} API
            </button>
            {/*<StageWrapper fixtures={fixtures} workTime={context.musicContext.currentTime} enabled={enabled}/>*/}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: "80%"}}>
                {fixtures && fixtures.length
                    ? fixtures.map(f => <VisualizerFixture key={f.id}
                                                           fixture={f}
                                                           updateFixture={updateFixture}
                                                           updateCue={updateCueCallback}
                    />)
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

const calculateAngle = (dmx: number) => {
    let isMinus = dmx < 128;
    const minMax = 100;
    return Number((minMax / 128) * (dmx - 128)).toFixed();
};

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
    const [renderFire, setRenderFire] = useState(false);
    useEffect(() => {
        if (fixture.shot && !renderFire) {
            setRenderFire(true)
        }
    }, [fixture]);
    return (
        <div
            key={fixture.id}
            className="fixtureViz"
            onClick={() => updateFixture({...fixture, selected: !fixture.selected})}
            ref={drag}
        >
            {fixture.activePattern && renderFire
                ? <AnimationShot pattern={fixture.activePattern} unmount={() => setRenderFire(false)}/>
                : null}
            <img src={fixture.img ? fixture.img : ''} className={`fixtureVizImg ${fixture.selected ? "active" : ""}`}/>
            <span className={`fixturesNumber ${fixture.selected ? "active" : ""}`}>{fixture.number}</span>
        </div>
    )
};

interface IAnimationProps {
    pattern: IPattern,
    unmount: () => void
}

const AnimationShot: React.FC<IAnimationProps> = React.memo(({pattern, unmount}: IAnimationProps) => {
    const {tick} = useMusicContext();
    const [currentStep, setCurrentStep] = useState<IPatternStep | null>(null);
    const [times, setTimes] = useState<IPatternStep[]>(pattern.steps);
    const startTime = useMemo(() => tick, []);
    const [progress, setProgress] = useState(tick);
    useEffect(() => {
        if (times[0]) {
            if (tick >= progress) {
                setProgress(times[0].time + progress);
                setCurrentStep(times[0]);
                setTimes([...times].slice(1));
            }
        } else {
            unmount();
        }
    }, [tick]);

    return (
        <span
            style={currentStep && currentStep.type === "shot"
                ? { transform: `rotate(${calculateAngle(currentStep.angle)}deg)` }
                : {backgroundColor: 'transparent'}}
            className="fixtureShot"
        >
        </span>
    );
});