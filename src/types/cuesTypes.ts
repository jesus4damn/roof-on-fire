import { TFixturesTypes } from './fixtureTypes';

export interface ICue {
    id: string,
    startTime: number | null,
    endTime: number | null,
    fixtureType: TFixturesTypes,
    name: string,
    active: boolean
    actions: ICueAction[]
}

export interface ICueAction {
    id: string,
    img: string,
    fixtureId: string,
    fixtureType: TFixturesTypes,
    patternId: string,
    startTime: number,
    totalTime: number
    active: boolean,
}
