import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture, IPattern, IPatternStep } from '../../../../types/fixtureTypes';
import DragFixture from '../../DragDrop/DragFixture';

let bgImage: any;
bgImage = require('../../../../assets/images/visualiser.png');

require('./Visualizer.scss');

export interface IProps {
    value: number;
    fixtures: IFixture[]

    updateFixture: (fixture: IFixture) => void
}

const Visualizer: React.FC<IProps> = ({
                                          fixtures,
                                          updateFixture,
                                      }) => {
    const [active, setActive] = React.useState(false);

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div className="visualizerWrapper">
              {/*<StageWrapper fixtures={fixtures} workTime={context.musicContext.currentTime} enabled={enabled}/>*/}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                  {fixtures && fixtures.length
                    ? fixtures.map(f => <VisualizerFixture key={f.id}
                                                           fixture={f}
                                                           updateFixture={updateFixture}
                    />)
                    : null}
              </div>
              <div className="counterBtn">
                  <button className={active ? 'fixturesBtnPosition ' : 'fixturesBtnPosition-active'}
                          onClick={() => setActive(!active)}>
                      Все
                  </button>
                  {/*<button className={'fixturesBtnPosition'}>*/}
                  {/*    Позиция Т1*/}
                  {/*</button>*/}
                  {/*<button className={'fixturesBtnPosition'}>*/}
                  {/*    Позиция Т2*/}
                  {/*</button>*/}
                  {/*<button className={'fixturesBtnPosition'}>*/}
                  {/*    Горелки*/}
                  {/*</button>*/}
                  {/*<button className={'fixturesBtnPosition'}>*/}
                  {/*    +*/}
                  {/*</button>*/}
              </div>
          </div>
      </div>
    );
};

export default Visualizer;

interface IFixtureProps {
    fixture: IFixture
    updateFixture: (fixture: IFixture) => void
}

const calculateAngle = (dmx: number):number => {
    let isMinus = dmx < 128;
    const minMax = 100;
    return +Number((minMax / 128) * (dmx - 128)).toFixed();
};

const VisualizerFixture:React.FC<IFixtureProps> = ({updateFixture, fixture}: IFixtureProps) => {
    const [renderFire, setRenderFire] = useState<string | null>(null);
    useEffect(() => {
        if (fixture.shot && fixture.activePattern && (renderFire || renderFire !== fixture.activePattern.id)) {
            setRenderFire(fixture.activePattern.id)
        }
    }, [fixture.shot]);
    return (
      <DragFixture fixtureId={fixture.id} key={fixture.id}>
          <div
            className="fixtureViz"
            onClick={() => updateFixture({...fixture, selected: !fixture.selected})}
          >
              {fixture.activePattern && renderFire
                ? <AnimationShot pattern={fixture.activePattern} unmount={() => setRenderFire(null)}/>
                : null}
              <img
                src={fixture.img ? fixture.img : ''}
                className={`fixtureVizImg ${fixture.selected ? "active" : ""}`}
                style={{borderColor: renderFire? 'red' : ''}}
              />
              <span className={`fixturesNumber ${fixture.selected ? "active" : ""}`}>{fixture.number}</span>
          </div>
      </DragFixture>
    )
};

interface IAnimationProps {
    pattern: IPattern,
    unmount: () => void
}

const AnimationShot: React.FC<IAnimationProps> = React.memo(({pattern, unmount}: IAnimationProps) => {
    const {tick} = useMusicContext();
    const [currentStep, setCurrentStep] = useState<IPatternStep>(pattern.steps[0]);
    const [times, setTimes] = useState<IPatternStep[]>(pattern.steps);
    const [shot, setShot] = useState<boolean>(false);
    const [angle, setAngle] = useState<number>(0);
    const patternId = useMemo(() => pattern.id, []);
    const long = useMemo<IPatternStep | undefined>(() =>
      pattern.steps.filter(p => p.delay > 0 && !p.type)[0], [pattern.id]);
    const startAngle = useMemo<number>(() => long ? pattern.steps[0].angle : 0, [pattern, long]);
    const runSpeed = useMemo<number>(() =>
      startAngle && long ? Math.abs(startAngle - long.angle) / (long.time - long.delay) : 0, [startAngle, long]);
    const [nextStepTime, setNextStepTime] = useState(tick);
    useEffect(() => {
        if (times[0]) {
            if (tick >= nextStepTime) {
                setNextStepTime(times[0].time + nextStepTime);
                setCurrentStep(times[0]);
                if (!long) {
                    setShot(times[0].type === 'shot');
                    setAngle(calculateAngle(times[0].angle))
                }
                setTimes([...times].slice(1));
            }
            if (long) {
                if (shot) {
                    if (!(long.delay < nextStepTime && long.time < nextStepTime)) {
                        setShot(false)
                    } else {
                        let dir = startAngle - long.angle > 0;
                        setAngle(calculateAngle(dir ? angle - runSpeed : angle + runSpeed))
                    }
                } else {
                    if (long.delay < nextStepTime && long.time < nextStepTime) {
                        setShot(true);
                    }
                }
            }
        } else {
            unmount();
        }
    }, [tick]);

    useEffect(() => {
        if (patternId !== pattern.id) {
            setTimes(pattern.steps);
        }
    }, [pattern]);

    if (long) {
        console.log(runSpeed)
        console.log(long)
        console.log(pattern.steps)
    }
    //console.log(tick)

    return (
        <span
            style={{
                  transform: `rotate(${angle}deg)`,
                  backgroundColor: shot ? "green" : "transparent"
                }}
            className="fixtureShot"
        >
        </span>
    );
});
