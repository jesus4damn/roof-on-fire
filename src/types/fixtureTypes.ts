export interface IFixtureBase {
    number: number,
    selected: boolean,
    type: TFixturesTypes,
    active: boolean,
    img: string | null,
    name: string | null,
    posX: number,
    posY: number,
    startAddress: number,
    params: IParamsDMX[]
}

export type TFixturesTypes = 'fixture' | 'fireworks'

export interface IParamsDMX {
    dmxOutput: number,
    physicalOutput: number | string,
    parts: IPatternBase[] | null,
    dmxAddress: number,
    name: string
}

export interface IPatternBase {
    id: string,
    selected: boolean,
    active: boolean,
    img: string | null,
    name: string | null,
    offset: number | null,
    steps: IPatternStep[],
    dmxStart: number,
    dmxEnd: number,
}

export interface IPatternStep {
    delay: number,
    time: number,
    type: boolean,
    height: number,
    angle: number,
    picture: string,
    name: string
}

export interface IFixture extends IFixtureBase{
    id: string
}
export interface IFixturesGroup {
    id: string,
    fixturesIds: string[],
    selected: boolean,
}
