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
        case 'fireWorksT1':
            return state.fields.fireWorks.fields;
        case 'fireWorksT2':
            return state.fields.fireWorks.fields;
        default:
            return [];
    }

};
