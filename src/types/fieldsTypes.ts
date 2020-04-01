import { IPattern } from './fixtureTypes';

export interface IField {
    id: string,
    connected: IPattern | null,
}

export type TPatternType = 'static' | 'dynamic' | 'long'
