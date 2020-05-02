import * as React from 'react';
import { Sprite, useTick, Container, Stage } from '@inlet/react-pixi';
import { IFixture } from '../../../../../types/fixtureTypes';
import { useEffect } from 'react';


const width = 30;
const height = 200;

const Bunny = (props: any) => {
    const [i, setI] = React.useState(0);

    useEffect(() => {
        if (props.fireOn && i >= 6) {
            setI(0)
        }
    }, [props.fireOn]);

    useTick(() => {
        console.log('tick');
        setI((i: number) => i + 0.1);
    },  i < 6);

    return (
        <Sprite
            {...props}
            anchor={0.5}
            overwriteProps={true}
            ignoreEvents={true}
            y={height / 2 + Math.cos(i / 5) * 100}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        />
    );
};

export interface IProps {
    workTime: number,
    rectangel?: number,
    fixtures: IFixture[]
}

export const VisStage = React.memo(({ workTime, fixtures }: any) => {
    const renderFixture = (fixture:IFixture, index: number) => {

        return (
            <Container width={50} height={300} x={(index + 1) *40} key={fixture.id + 'viz'}>
                <Bunny workTime={workTime} fireOn={fixture.shot}/>
                <Sprite
                    y={250}
                    image={fixture.img ? fixture.img : ''}
                />
                {/*<img alt={'fixture'}*/}
                {/*     src={fixture.img ? fixture.img : ''}*/}
                {/*     className={`paramBlock ${fixture.selected ? 'paramBlock-active' : ''}`}*/}
                {/*/>*/}
            </Container>
        );
    };

    return (
        <Stage width={500} height={500}>
            {fixtures && fixtures.length ? fixtures.map( (f:IFixture, i: number) => renderFixture(f, i)) : null}
        </Stage>
    );
});
