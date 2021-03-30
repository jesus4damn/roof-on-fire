import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { Stage, Layer, Rect } from "react-konva";
import { IFixture } from '../../../../types/fixtureTypes';
import fixturesReducer from '../../../store/fixturesReducer/fixturesReducer';


const Container = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:transparent;
`;

interface IStageSize {
    width:number,
    height:number
}

interface IRect {
    x:number,
    y:number,
    width:number,
    height:number,
    key:string
}

interface IDrawRectProps {
    // fixture: IFixture
    fixtures: IFixture[]
    updateFixture: (fixture: IFixture) => void
    setFixtureClickable: (bool:boolean) => void
}

const DrawRect = ({updateFixture, fixtures, setFixtureClickable}: IDrawRectProps) => {
    const [rect, setRect] = useState<IRect[]>([]);
    const [stageSize, setStageSize] = useState<IStageSize>({width:0, height:0});
    const container = useRef<any>(null);

    useEffect(() => {
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => {
            window.removeEventListener("resize", checkSize);
        }
    },[]);

    const handleMouseDown = (event:any) => {
        if (rect.length === 0) {
          const { x, y } = event.target.getStage().getPointerPosition();
          setRect([{ x, y, width: 0, height: 0, key: "0" }]);
          setFixtureClickable(false);
        }
      };
    
    const handleMouseUp = (event:any) => {
        for(let i = 0; i < fixtures.length; i++){
            if(((fixtures[i].posX > rect[0].x && fixtures[i].posX < (rect[0].x + rect[0].width)) ||
                (fixtures[i].posX < rect[0].x && fixtures[i].posX > (rect[0].x + rect[0].width))) &&
                 ((fixtures[i].posY > rect[0].y && fixtures[i].posY < (rect[0].y + rect[0].height)) ||
                    (fixtures[i].posY < rect[0].y && fixtures[i].posY > (rect[0].y + rect[0].height)))){
                        let index = fixtures.findIndex((item) => item.id === fixtures[i].id);
                        updateFixture({...fixtures[index], selected: !fixtures[index].selected});
                }
        }
        setRect([]);
        setFixtureClickable(true);
    };
    
    const handleMouseMove = (event:any) => {
        if (rect.length === 1) {
            const sx = rect[0].x;
            const sy = rect[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            setRect([
                {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: "0"
                }
            ]);
        }
    };

    const checkSize = () => {
        const width = container.current?.offsetWidth;
        const height = container.current?.offsetHeight;
        setStageSize({
          width: width,
          height: height
        });
    };

    const annotationsToDraw = [...rect];

    return (
    <Container ref={container}>
        <Stage
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            width={stageSize.width}
            height={stageSize.height}
        >
            <Layer>
                {annotationsToDraw.map(value => {
                return (
                    <Rect
                        key={value.key}
                        x={value.x}
                        y={value.y}
                        width={value.width}
                        height={value.height}
                        fill="transparent"
                        stroke="red"
                    />
                );
                })}
            </Layer>
        </Stage>
    </Container>
    );
};


export default DrawRect;