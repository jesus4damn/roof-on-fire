import { TPatternType } from './fieldsTypes';

export interface IFixtureBase {
    number: number,
    selected: boolean,
    type: TFixturesTypes,
    active: boolean,
    activePattern: IPattern | null,
    img: string | null,
    name: string | null,
    posX: number,
    posY: number,
    startAddress: number,
    params: IParamsDMX[]
}

export type TFixturesTypes = 'fireMachine' | 'fireWorks' | 'dimmer'

export interface IParamsDMX {
    dmxOutput: number,
    physicalOutput: number | string,
    parts: IPattern | null,
    dmxAddress: number,
    name: string
}

export interface IPattern {
    id: string,
    selected: boolean,
    active: boolean,
    img: string,
    name: string | null,
    offset: number | null,
    fixtureType: TFixturesTypes,
    type: TPatternType,
    steps: IPatternStep[],
    dmxStart: number,
    dmxEnd: number,
}

export interface IPatternStep {
    delay: number,
    time: number,
    type: 'move' | 'shot' | string,
    height: number,
    angle: number,
}

export interface IFixture extends IFixtureBase{
    id: string
}
export interface IFixturesGroup {
    id: string,
    fixturesIds: string[],
    selected: boolean,
}
