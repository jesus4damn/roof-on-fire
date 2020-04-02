import { generateFields, generateMockFixtures, generateMockPatterns } from './mockDataGenerators';
import { IFieldsState } from './fieldsReducer/fieldsReducer';
import { IFixturesState } from './fixturesReducer/fixturesReducer';

const Storage = require('../../main/StoreData');

const dataStorage = new Storage({
    configName: 'initialAppData',
    defaults: {
        showData: {
            fields: {
                fireMachines: {
                    staticFields: [],
                    dynamicFields: [],
                    longFields: []
                },
                fireWorks: {
                    fields: []
                }
            },
            fixtures: {
                patterns: {
                    fireMachine: [],
                    fireWorksT1: [],
                    dimmer: []
                },
                fixtures: generateMockFixtures(8),
                groups: [],
                fixtureTypes: ['fireMachine', 'fireWorksT1', 'dimmer'],
            }
        }
    }
});

export interface IInitialData {
    fields: IFieldsState
    fixtures: IFixturesState
}

export const getInitialState = ():IInitialData => {
    const fixtures = generateMockFixtures(3);
    const patternsS = generateMockPatterns(1, 'static');
    const patternsD = generateMockPatterns(2, 'dynamic');
    const patternsL = generateMockPatterns(1, 'long');
    return  {
        fields: {
            cuesFields: generateFields(null),
            fireMachines: {
                staticFields: generateFields(patternsS),
                dynamicFields: generateFields(patternsD),
                longFields: generateFields(patternsL)
            },
            fireWorks: {
                fields: generateFields(null)
            }
        },
        fixtures: {
            patterns: {
                fireMachine: [...patternsS, ...patternsD, ...patternsL],
                fireWorks: [],
                dimmer: []
            },
            fixtures: fixtures,
            groups: [],
            fixtureTypes: ['fireMachine', 'fireWorks', 'dimmer'],
        }
    };
};

export const resetState = (): IInitialData => {
    const initialData = getInitialState();
    //dataStorage.set('showData', initialData);
    return initialData;
};

export const saveState = (state: IInitialData) => {
    dataStorage.set('showData', state);
};

export const loadPrevious = (): IInitialData => {
    const commonData: IInitialData = dataStorage.get('showData');
    return commonData;
};
