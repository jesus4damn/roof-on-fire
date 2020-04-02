import { IFixture, IPattern, IPatternStep } from '../../types/fixtureTypes';
import { v4 as uuid } from 'uuid';
import { getFixtureIcon, getReactPng } from '../assets/imageGetter';
import { IField } from '../../types/fieldsTypes';

export const generateMockPatterns = (quan: number):IPattern[] => {
    const steps:IPatternStep[] = [
        {
            delay: 15,
            time: 500,
            type: 'move',
            height: 0,
            angle: 15,
        },
        {
            delay: 15,
            time: 500,
            type: 'short',
            height: 0,
            angle: 15,
        },
    ];
    let res = [];
    for (let i = 0; i < quan; i++) {
        res.push({
            id: uuid(),
            selected: false,
            active: false,
            img: getReactPng(),
            name: null,
            offset: 15,
            type: 'long',
            steps: steps,
            dmxStart: 0,
            dmxEnd: 5,
        });
    }
    // @ts-ignore
    return res;
};

export const generateMockFixtures = (count: number): IFixture[] => {
    let res: IFixture[] = [];
    let prevAddres = 1;
    for (let i = 0; i < count; i++) {
        res.push({
            id: uuid(),
            number: i + 1,
            selected: false,
            type: 'fire-machine',
            active: false,
            img: getFixtureIcon(),
            name: `fire-machine ${i}`,
            posX: 0,
            posY: 0,
            startAddress: prevAddres + 5 * i,
            params: [
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: null,
                    dmxAddress: prevAddres + 1,
                    name: 'dimmer'
                },
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: null,
                    dmxAddress: prevAddres + 2,
                    name: 'tilt'
                },
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: null,
                    dmxAddress: prevAddres + 3,
                    name: 'speed'
                },
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: generateMockPatterns(10),
                    dmxAddress: prevAddres + 3,
                    name: 'patterns'
                },

            ]
        });
        prevAddres = prevAddres + 1
    }
    return res
};

const generateField = (pattern: IPattern | null ):IField => {
    return {
        id: uuid(),
        connected: pattern ? pattern : null,
    }
};
export const generateFields = (fixturePatterns: IPattern[] | null):IField[] => {
    let fieldArr = [];
    for ( let i = 0; fieldArr.length < 50; i++) {
        let isPattern: IPattern | null = fixturePatterns && fixturePatterns.length && fixturePatterns[i]
            ? fixturePatterns[i]
            : null;
        fieldArr.push(generateField(isPattern))
    }
    return fieldArr;
};
