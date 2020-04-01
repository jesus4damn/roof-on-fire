import { RootState } from '../rootReducer';

export const getSelectedPatternsType = (state:RootState) => state.app.fixturesPropertiesScreenWindow;

export const getFieldsArr = (state:RootState) => {
    return state.app.fixturesPropertiesScreenWindow === 'static'
        ? state.fields.staticFields
        : state.app.fixturesPropertiesScreenWindow === 'dynamic'
            ? state.fields.dynamicFields
            : state.fields.longFields
};
