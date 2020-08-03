import { RootState } from '../rootReducer';
import { IActionsScreenSwitchers } from '../../../types/appTypes';

export const getSelectedPatternsType = (state: RootState) => state.app.fixturesPropertiesScreenWindow;

export const getFieldsArr = (state: RootState, patternType?: IActionsScreenSwitchers) => {
    const selectedFixture = state.app.fixtureTypesScreenWindow;
    switch (selectedFixture) {
        case 'dimmer':
            return [];
        case 'fireMachine':
            return patternType === "all"
                ? [...state.fields.fireMachines.staticFields, ...state.fields.fireMachines.dynamicFields, ...state.fields.fireMachines.longFields]
                : patternType === 'static'
                ? state.fields.fireMachines.staticFields
                : patternType === 'dynamic'
                    ? state.fields.fireMachines.dynamicFields
                    : state.fields.fireMachines.longFields;
        case 'fireWorks':
            return state.fields.fireWorks.fields;
        default:
            return [];
    }
};

export const getCuesFields = (state: RootState) => state.fields.cuesFields;
