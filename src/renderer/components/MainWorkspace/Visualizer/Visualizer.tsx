import * as React from 'react';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useMusicContext } from '../../../misicContext/musicContext';
import { IFixture, IPattern, IPatternStep } from '../../../../types/fixtureTypes';
import DragFixture from '../../DragDrop/DragFixture';
import DrawRect from './DrawRect';
import { forEach } from 'lodash';
import styled from 'styled-components';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';
import Fixtures from '../Fixtures/Fixtures';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapInteraction } from 'react-map-interaction';
//react-selectable
//https://codesandbox.io/s/fw9hw


let bgImage: any;
bgImage = require('../../../../assets/images/visualiser.png');

require('./Visualizer.scss');

export interface IProps {
    value: number;
    fixtures: IFixture[]
    updateFixture: (fixture: IFixture) => void
}

interface IFixturesPosition {
    x:number,
    y:number,
    id:string
}

const ZoomContainer = styled.div<{x:number,y:number,scale:number}>`
    width: 100%;
    height: 100%;
    transform: translate(${({x}) => x}px, ${({y}) => y}px) scale(${({scale}) => scale});
    transform-origin: 0px 0px 0px;
`;


const Visualizer: React.FC<IProps> = ({
                                          fixtures,
                                          updateFixture,
                                      }) => {
    const [active, setActive] = React.useState(false);
    const containerRef = useRef<any>(null);

    const [fixtureClickable, setFixtureClickable] = useState<boolean>(true);
    const [translation, setTranslation] = useState<{translation: { x: number, y: number }, scale:number}>({translation: { x: 0, y: 0 },scale:1});


    const updateFixturePosition = (id:string, x:number, y:number) => {
        const index = fixtures.findIndex((item) => item.id === id);
        updateFixture({...fixtures[index],posX:x,posY:y})
        // fixturesPositions[index] = {id,x,y};
        // setFixturesPositions([...fixturesPositions]);
    }


    useEffect(() => {
        if(fixtureClickable){
            const width = containerRef.current?.offsetWidth;
            const height = containerRef.current?.offsetHeight;
            let distance = Math.floor(width/fixtures.length);
            let currentPosX = Math.floor(width/fixtures.length/2);
            // let positions:IFixturesPosition[]  = [];
            fixtures.forEach((fixture) => {
                // positions.push({x:currentPosX,y:Math.floor(height/2), id:fixture.id});
                updateFixture({...fixture, posX: currentPosX,posY:Math.floor(height/2)});
                currentPosX+=distance;
            });
        }
    },[]);


    const [, drop] = useDrop({
        accept: dragTypes.FIXTURE,
        drop: (item: {posX:number,posY:number,id:string,type: string }, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round(item.posX + delta.x);
            const top = Math.round(item.posY + delta.y);
            updateFixturePosition(item.id,left,top);
            return undefined
        },
    })

    return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={containerRef}>
                        <div className="visualizerWrapper" ref={drop} onClick={() => console.log(1)}>
                            {/*<StageWrapper fixtures={fixtures} workTime={context.musicContext.currentTime} enabled={enabled}/>*/}
                            {/* <MapInteraction
                                value={translation}
                                disablePan={true}
                                onChange={(value) => setTranslation(value)}>
                                {
                                    ({ translation, scale }) => { 
                                        return (
                                            <ZoomContainer x={translation.x} y={translation.y} scale={scale}>
                                                <DrawRect updateFixture={updateFixture} fixtures={fixtures} setFixtureClickable={setFixtureClickable} />
                                                {fixtures && fixtures.length
                                                    ? fixtures.map((f, index) => <VisualizerFixture key={f.id}
                                                                                        fixture={f}
                                                                                        posX={fixtures[index] ? fixtures[index].posX : 0}
                                                                                        posY={fixtures[index] ? fixtures[index].posY : 0}
                                                                                        updateFixture={updateFixture}
                                                                                        fixtureClickable={fixtureClickable}
                                                    />)
                                                    : null}
                                            </ZoomContainer>
                                        )
                                    }
                                }
                            </MapInteraction> */}
                            <ZoomContainer x={translation.translation.x} y={translation.translation.y} scale={translation.scale}>
                                                <DrawRect updateFixture={updateFixture} fixtures={fixtures} setFixtureClickable={setFixtureClickable} />
                                                {fixtures && fixtures.length
                                                    ? fixtures.map((f, index) => <VisualizerFixture key={f.id}
                                                                                        fixture={f}
                                                                                        posX={fixtures[index] ? fixtures[index].posX : 0}
                                                                                        posY={fixtures[index] ? fixtures[index].posY : 0}
                                                                                        updateFixture={updateFixture}
                                                                                        fixtureClickable={fixtureClickable}
                                                    />)
                                                    : null}
                                            </ZoomContainer>
                                {/* <DrawRect updateFixture={updateFixture} fixtures={fixtures} setFixtureClickable={setFixtureClickable} />
                                {fixtures && fixtures.length
                                    ? fixtures.map((f, index) => <VisualizerFixture key={f.id}
                                                                        fixture={f}
                                                                        posX={fixtures[index] ? fixtures[index].posX : 0}
                                                                        posY={fixtures[index] ? fixtures[index].posY : 0}
                                                                        updateFixture={updateFixture}
                                                                        fixtureClickable={fixtureClickable}
                                    />)
                                    : null} */}
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

const VisualizerFixtureContainer = styled.div<{top: number, left:number, clickable:boolean}>`
    position:absolute;
    top:${({top}) => top + 'px' };
    left:${({left}) => left + 'px' };
    display: flex;
    cursor: pointer;
    pointer-events:${({clickable}) => clickable ? 'auto' : 'none' };
`;

const VisualizerFixture = ({updateFixture, fixture, posX, posY, fixtureClickable}: IFixtureProps & {posX:number, posY:number, fixtureClickable:boolean}) => {
    const [renderFire, setRenderFire] = useState<string | null>(null);
    useEffect(() => {
        if (fixture.shot && fixture.activePattern && (renderFire || renderFire !== fixture.activePattern.id)) {
            setRenderFire(fixture.activePattern.id)
        }
    }, [fixture.shot]);
    const [{isDragging}, drag] = useDrag({
          item: { id: fixture.id, type: dragTypes.FIXTURE, posX, posY },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
    })
    
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <VisualizerFixtureContainer
            top={posY}
            left={posX}
            clickable={fixtureClickable}
            onClick={() => {
                updateFixture({...fixture, selected: !fixture.selected});
            }}
            ref={drag}
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
        </VisualizerFixtureContainer>
    );
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
