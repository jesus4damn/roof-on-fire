import { generateFields, generateMockFixtures, generateMockPatterns } from './mockDataGenerators';
import { IFieldsState } from './fieldsReducer/fieldsReducer';
import { IFixturesState } from './fixturesReducer/fixturesReducer';
import { ICuesState } from './cuesReducer/cuesReducer';

const Storage = require('../../main/StoreData');
const ExternalAPI = require('../../main/ExternalAPI');

const externalAPI = new ExternalAPI({});

export interface IInitAppParams {
    fixtures: number,
    static: number,
    dynamic: number,
    long: number
}

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
            },
            cues: {
                selectedCue: null,
                cues: [],
                timelineCues: [],
            }
        }
    }
});

export interface IInitialData {
    fields: IFieldsState
    fixtures: IFixturesState
    cues: ICuesState
}

export const getInitialState = (initParams?: IInitAppParams):IInitialData => {
    let init:IInitAppParams = initParams ? initParams : {fixtures: 5, static: 5, dynamic: 5, long: 5};
    const fixtures = generateMockFixtures(init.fixtures ? init.fixtures : 5 );
    const patternsS = generateMockPatterns(init.static ? init.static : 1, 'static', 0);
    const patternsD = generateMockPatterns(init.dynamic ? init.dynamic : 2, 'dynamic', init.dynamic);
    const patternsL = generateMockPatterns(init.long ? init.long : 1, 'long', init.dynamic + init.long);
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
        },
        cues: {
            selectedCue: null,
            cues: [],
            timelineCues: [],
        }
    };
};

export const resetState = (params?: IInitAppParams): IInitialData => {
    //dataStorage.set('showData', initialData);
    return getInitialState(params);
};

export const saveState = (state: IInitialData) => {
    try {
        dataStorage.set('showData', state);
    } catch (e) {
        console.log(e)
    }
};

export const loadPrevious = (): IInitialData => {
    try {
        const commonData: IInitialData = dataStorage.get('showData');
        return commonData;
    } catch (e) {
        //dataStorage.set('showData', initialData);
        return getInitialState();
    }
};


export const getLoadFilePath = () => {
    try {
        return externalAPI.getPath()
    } catch (e) {
        return getInitialState();
    }
};

export const setSaveFilePath = () => {
    try {
        return externalAPI.save()
    } catch (e) {
        return getInitialState();
    }
};
