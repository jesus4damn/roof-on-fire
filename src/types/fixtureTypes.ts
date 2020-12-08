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
    shot: boolean,
    startAddress: number,
    params: IParamsDMX[]
}

export type TFixturesTypes = 'fireMachine' | 'fireWorks' | 'dimmer'

export type TFixturesGroups = 'all' | 'left' | 'right' | 'odd' | 'even'

export interface IParamsDMX {
    dmxOutput: number,
    physicalOutput: number | string,
    parts: IPattern[] | null,
    dmxAddress: number,
    name: string
}

export interface IPattern {
    id: string,
    selected: boolean,
    active: boolean,
    img: string,
    number: number,
    name: string | null,
    offset: number | null,
    fixtureType: TFixturesTypes,
    type: TPatternType,
    color: string,
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
    id: TFixturesGroups,
    fixturesIds: string[],
    selected: boolean,
}
