import { RootState } from '../rootReducer';

export const getSelectedPatternsType = (state: RootState) => state.app.fixturesPropertiesScreenWindow;

export const getFieldsArr = (state: RootState) => {
    const selectedFixture = state.app.fixtureTypesScreenWindow;
    switch (selectedFixture) {
        case 'dimmer':
            return [];
        case 'fireMachine':
            return state.app.fixturesPropertiesScreenWindow === 'static'
                ? state.fields.fireMachines.staticFields
                : state.app.fixturesPropertiesScreenWindow === 'dynamic'
                    ? state.fields.fireMachines.dynamicFields
                    : state.fields.fireMachines.longFields;
        case 'fireWorks':
            return state.fields.fireWorks.fields;
        default:
            return [];
    }
};

export const getCuesFields = (state: RootState) => state.fields.cuesFields;
