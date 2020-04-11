import { IPattern } from './fixtureTypes';
import { ICue } from './cuesTypes';

export interface IField {
    id: string,
    color: string
    img: string
}

export interface IPatternField extends IField {
    connected: IPattern
}

export interface ICueField extends IField {
    connected: ICue,
}

export type TPatternType = 'static' | 'dynamic' | 'long'
