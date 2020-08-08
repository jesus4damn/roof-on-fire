import { Action, ActionCreator } from 'redux';
import { IFixture } from '../../../types/fixtureTypes';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../rootActions';
import { GetStateType } from '../rootReducer';
import { ICue, ICueAction } from '../../../types/cuesTypes';
import { v4 as uuid } from 'uuid';
import { updateField } from '../fieldsReducer/fieldsActions';
import { IField } from '../../../types/fieldsTypes';
import { ICuesState } from './cuesReducer';
import { getSelectedCue } from './cuesSelector';
import { controllerAPI } from '../../components/API/API';
import { getFixtures } from '../fixturesReducer/fixturesSelector';
import { TEffects } from '../../components/MainWorkspace/Cues/EffectControlers/EffectControllers';

export const SET_LOADED_CUES_DATA = 'cues/SET_LOADED_CUES_DATA';
export const CREATE_CUE = 'cues/CREATE_CUE';
export const CREATE_CUE_TIMELINE = 'cues/CREATE_CUE_TIMELINE';
export const DELETE_CUE = 'cues/DELETE_CUE';
export const UPDATE_CUE = 'cues/UPDATE_CUE';
export const ADD_FIXTURES_TO_CUE = 'cues/ADD_FIXTURES_TO_CUE';
export const SET_SELECTED_CUE = 'cues/SET_SELECTED_CUE';

export interface ISetCuesData {
    type: typeof SET_LOADED_CUES_DATA,
    state: ICuesState
}

export interface IOnCueSelection {
    type: typeof SET_SELECTED_CUE,
    cue: ICue
}

export interface ICreateCueAction extends Action {
    type: typeof CREATE_CUE,
    cue: ICue
}

export interface ICreateTimelineCueAction extends Action {
    type: typeof CREATE_CUE_TIMELINE,
    cue: ICue
    startTime: number
}

export interface IDeleteCueAction extends Action {
    type: typeof DELETE_CUE, cueId: string, isTimeline: boolean
}

export interface IUpdateCueAction extends Action {
    type: typeof UPDATE_CUE, cue: ICue
}

export interface IAddFixturesToCue extends Action {
    type: typeof ADD_FIXTURES_TO_CUE, cueId: string, fixtures: IFixture[]
}

export const createCue: ActionCreator<ICreateCueAction> = (cue: ICue) => ({
    type: CREATE_CUE, cue
});

export const createTimelineCue: ActionCreator<ICreateTimelineCueAction> = (cue: ICue, startTime: number) => ({
    type: CREATE_CUE_TIMELINE, cue: {...cue, id: uuid()}, startTime
});

export const deleteCue: ActionCreator<IDeleteCueAction> = (cueId: string, isTimeline: boolean) => ({
    type: DELETE_CUE, cueId, isTimeline
});

export const updateCue: ActionCreator<IUpdateCueAction> = (cue: ICue) => ({
    type: UPDATE_CUE, cue
});

export const setSelectedCue: ActionCreator<IOnCueSelection> = (cue: ICue) => ({
    type: SET_SELECTED_CUE, cue
});

export const setCuesData: ActionCreator<ISetCuesData> = (state: ICuesState) => ({
    type: SET_LOADED_CUES_DATA, state
});

const cueBase: ICue = {
    id: '',
    startTime: 1,
    endTime: 2,
    fixtureType: 'fireMachine',
    name: 'new cue',
    active: false,
    actions: []
};

const cueActionBase: ICueAction = {
    id: '',
    fixtureId: '',
    patternId: '',
    fixtureType: 'fireMachine',
    img: '',
    startTime: 0,
    totalTime: 2,
    active: false
};

export const createNewCue = (fixtures: IFixture[], field: IField | null, startTime?: number) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const part = 1 / (fixtures.length -1);
        const newActions: ICueAction[] = fixtures.map((f, i) => {
            if (f.activePattern !== null) {
                return {
                    ...cueActionBase,
                    id: uuid(),
                    fixtureId: f.id,
                    fixtureType: f.type,
                    patternId: f.activePattern ? f.activePattern.id : '',
                    img: f.activePattern ? f.activePattern.img : '',
                    startTime: i === 0 ? 0 : part * i,
                    totalTime: 1,
                    active: false
                };
            } else return { ...cueActionBase, id: uuid(), fixtureId: f.id };
        });
        const newCue: ICue = {
            ...cueBase,
            id: uuid(),
            startTime: startTime ? startTime : 0,
            endTime: startTime ? startTime + 0.4 : 1,
            actions: newActions.length ? newActions : []
        };
        dispatch(createCue(newCue));
        if (field && field.id) {
            dispatch(updateField({ ...field, connected: newCue }, 'cue'));
        } else {
            dispatch(createTimelineCue(newCue, startTime ? startTime : 0))
        }
    };

export const addFixturesToCue = (fixtures: IFixture[]) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const cue = getSelectedCue(getState());
        if (cue && cue.id) {
            const part = (cue.endTime - cue.startTime) / (fixtures.length -1);
            const newActions: ICueAction[] = fixtures.map((f, i) => {
                if (f.activePattern !== null) {
                    return {
                        ...cueActionBase,
                        id: uuid(),
                        fixtureId: f.id,
                        fixtureType: f.type,
                        patternId: f.activePattern ? f.activePattern.id : '',
                        img: f.activePattern ? f.activePattern.img : '',
                        startTime: i === 0 ? 0 : part * i,
                        totalTime: 1,
                        active: false
                    };
                } else return { ...cueActionBase, id: uuid(), fixtureId: f.id };
            });
            dispatch(updateCue({...cue, actions: [...cue.actions, ...newActions]}))
        }
};

export const initDevices = (fixtures: IFixture[]) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const res = await controllerAPI.sendInitDevises(fixtures);
        console.log(res);
};

export const reorderOnEffect = (cue: ICue, direction: TEffects) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const fixtures = getFixtures(getState());
        const actionsFixtures = cue.actions.map(a => ({...a, fixture: fixtures.filter(f => f.id === a.fixtureId)[0]}));
        let cueCopy = {...cue};
        let part = (cue.endTime - cue.startTime) / (cue.actions.length -1);
        let result:ICueAction[] = [];
        const isParity = cue.actions.length % 2 === 0;
        switch (direction) {
            case 'Together': {
                result = actionsFixtures.sort((a, b) => a.fixture.number - b.fixture.number).map((a, i) => {
                    let clone = {...a, startTime: 0};
                    delete clone.fixture;
                    return clone
                });
                cueCopy.endTime = cue.startTime + 0.001;
                break;
            }
            case 'Forward': {
                result = actionsFixtures.sort((a, b) => a.fixture.number - b.fixture.number).map((a, i) => {
                    let clone = {...a, startTime: i === 0 ? 0 : +(i * part).toFixed(4)};
                    delete clone.fixture;
                    return clone
                });
                break;
            }
            case 'Backward': {
                result = actionsFixtures.sort((a, b) => b.fixture.number - a.fixture.number).map((a, i) => {
                    let clone = {...a, startTime: i === 0 ? 0 : +(i * part).toFixed(4)};
                    delete clone.fixture;
                    return clone
                });
                break;
            }
            case 'Inside': {
                let sorted = [...actionsFixtures].sort((a, b) => a.fixture.number - b.fixture.number);
                if (isParity) {
                    const leftPart = sorted.splice(0, (sorted.length) / 2);
                    part = (cue.endTime - cue.startTime) / (leftPart.length -1);
                    leftPart.forEach((a, i) => {
                        let time = i === 0 ? 0 : +(i * part).toFixed(2);
                        let clone = {...a, startTime: time};
                        let cloneR = {...sorted[sorted.length - 1 - i], startTime: time};
                        delete clone.fixture;
                        delete cloneR.fixture;
                        result.push(clone);
                        result.push(cloneR);
                    })
                } else {
                    const [central] = sorted.splice((sorted.length - 1) / 2, 1);
                    delete central.fixture;
                    const leftPart = sorted.splice(0, (sorted.length) / 2);
                    part = (cue.endTime - cue.startTime) / leftPart.length;
                    result = [{...central, startTime: +(cue.endTime - cue.startTime).toFixed(2)}];
                    leftPart.forEach((a, i) => {
                        let time = i === 0 ? 0 : +(i * part).toFixed(4);
                        let clone = {...a, startTime: time};
                        let cloneR = {...sorted[sorted.length - 1 - i], startTime: time};
                        delete clone.fixture;
                        delete cloneR.fixture;
                        result.push(clone);
                        result.push(cloneR);
                    })
                }
                break;
            }
            case 'Outside': {
                let sorted = [...actionsFixtures].sort((a, b) => a.fixture.number - b.fixture.number);
                if (isParity) {
                    const leftPart = sorted.splice(0, (sorted.length) / 2);
                    part = (cue.endTime - cue.startTime) / (leftPart.length -1);
                    sorted.reverse();
                    leftPart.reverse().forEach((a, i) => {
                        let time = i === 0 ? 0 : +(i * part).toFixed(2);
                        let clone = {...a, startTime: time};
                        let cloneR = {...sorted[sorted.length - 1 - i], startTime: time};
                        delete clone.fixture;
                        delete cloneR.fixture;
                        result.push(clone);
                        result.push(cloneR);
                    })
                } else {
                    const [central] = sorted.splice((sorted.length - 1) / 2, 1);
                    delete central.fixture;
                    const leftPart = sorted.splice(0, (sorted.length) / 2);
                    part = (cue.endTime - cue.startTime) / leftPart.length;
                    result = [{...central, startTime: 0}];
                    sorted.reverse();
                    leftPart.reverse().forEach((a, i) => {
                        let time = +((i + 1) * part).toFixed(2);
                        let clone = {...a, startTime: time};
                        let cloneR = {...sorted[sorted.length - 1 - i], startTime: time};
                        delete clone.fixture;
                        delete cloneR.fixture;
                        result.push(clone);
                        result.push(cloneR);
                    })
                }
                break;
            }
        }


        dispatch(updateCue({...cueCopy, actions: result}))
};


export type ICuesActions = ICreateCueAction | IDeleteCueAction | IUpdateCueAction | IOnCueSelection
    | ICreateTimelineCueAction | ISetCuesData | IAddFixturesToCue;
