import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TimeLine from './TimeLineWorkspace/TimeLine';
import Header from './Header/Header';
import MainWorkspace from './MainWorkspace/MainWorkspace';
import CuesWorkspace from './CuesWorkspace/CuesWorkspace';
import { useEffect } from 'react';
import { generateFields, generateMockFixtures } from '../store/mockDataGenerators';
import { IFieldsState } from '../store/fieldsReducer/fieldsReducer';
import { IFixture } from '../../types/fixtureTypes';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { patchFixtureAC } from '../store/fixturesReducer/fixturesActions';
import { setInitialFields } from '../store/fieldsReducer/fieldsActions';
require('./App.scss');
const Storage = require('../../main/StoreData');

const dataStorage = new Storage({
    configName: 'initialAppData',
    defaults: {
        showData: {
            fields: [],
            fixtures: []
        }
    }
});

interface IInitialData {
    fields: IFieldsState
    fixtures: IFixture[]
}
interface IProps {
    patchFixtureAC: (fixtures: IFixture) => void
    setInitialFields: (fields: IFieldsState) => void
}

const Application = ({patchFixtureAC, setInitialFields}:IProps) => {

    useEffect(() => {
        try {
            const { fields, fixtures } = dataStorage.get('showData')
            if (fields.cuesFields.length) {
                setInitialFields(fields)
            }
            if (fixtures.length) {
                patchFixtureAC(fixtures)
            }
        } catch (e) {
            let initialData: IInitialData = {
                fields: {
                    cuesFields: generateFields(null),
                    staticFields: generateFields(null),
                    dynamicFields: generateFields(null),
                    longFields: generateFields(null),
                },
                fixtures: generateMockFixtures(10)
            };
            dataStorage.set('showData', initialData)
        }
    }, []);
    return (
        <div className="appWrapper">
            <div className="headerWrapper"><Header/></div>
            <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
            <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div>
            <div className="timeLineWorkspaceWrapper"><TimeLine/></div>
        </div>);
};

const mapStateToProps = (state: RootState) => ({ });

const ApplicationContainer = connect(mapStateToProps, {
    patchFixtureAC, setInitialFields
})(Application);

export default hot(ApplicationContainer);
