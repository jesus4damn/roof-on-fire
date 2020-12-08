import * as React from 'react';
import { Sprite, useTick, Stage, PixiComponent, Container } from '@inlet/react-pixi';
import { IFixture } from '../../../../../types/fixtureTypes';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

const height = 200;
const reducer = ({}, { data }:any) => data;


const Bunny = ({index, motion}: any) => {
    return (
        <Sprite
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            {...motion}
            x={index + 40}
        />
    )
};

export interface IProps {
    workTime: number,
    rectangel?: number,
    enabled: boolean,
    fixtures: IFixture[]
}

export const VisStage = ({ fixtures, enabled }: any) => {
    const [motion, update] = useReducer(reducer, {});
    const iter = useRef(0);

    useTick((delta: any) => {
        const i = (iter.current += 0.05 * delta);

        update({
            type: 'update',
            data: {
                y: height / 2 + Math.sin(i / 1.5) * 100,
                rotation: Math.sin(i) * Math.PI,
                anchor: 0.5,
            },
        })
    }, enabled);

    const renderFixture = (fixture:IFixture, index: number) =>  {
        // @ts-ignore
        return  (<Container width={50} height={300} x={(index + 1) *40} key={fixture.id + 'viz'}>
                {/*<Bunny index={index + 1} motion={motion}/>*/}
              {/*// @ts-ignore*/}
                <Sprite
                    y={350}
                    tint={Math.random() * 0xE8D4CD}
                    image={fixture.img ? fixture.img : ''}
                />
            </Container>
        )
    };

    const renderFixtures = () => {
        if (fixtures && fixtures.length) {
            return fixtures.map( (f:IFixture, i: number) => renderFixture(f, i))
        } else {
            // @ts-ignore
            return (<Sprite
                    y={250}
                    tint={Math.random() * 0xE8D4CD}
                    image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
                />
            )
        }
    };

    return (
        <>
            {fixtures.map((f: IFixture, i: number) => renderFixture(f, i))}
        </>
    );
};

export const StageWrapper = ({ fixtures, enabled }: any) => {
    return (
        <Stage width={500} height={500}>
            <VisStage fixtures={fixtures} enabled={enabled}/>
        </Stage>
    );
};
