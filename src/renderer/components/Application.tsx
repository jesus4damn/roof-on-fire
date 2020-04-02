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
import { patchFixturesAC } from '../store/fixturesReducer/fixturesActions';
import { setInitialFields } from '../store/fieldsReducer/fieldsActions';

require('./App.scss');
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
            fixtures: []
        }
    }
});

interface IInitialData {
    fields: IFieldsState
    fixtures: IFixture[]
}

interface IProps {
    patchFixturesAC: (fixtures: IFixture[]) => void
    setInitialFields: (fields: IFieldsState) => void
}

const Application = ({ patchFixturesAC, setInitialFields }: IProps) => {
    useEffect(() => {
        try {
            const commonData: IInitialData = dataStorage.get('showData');
            if (commonData.fields.fireMachines.staticFields.length) {
                setInitialFields(commonData.fields);
            }
            if (commonData.fixtures.length) {
                patchFixturesAC(commonData.fixtures);
            }
        } catch (e) {
            const fixtures = generateMockFixtures(10);
            const parts = fixtures[0].params[3].parts !== null
            && fixtures[0].params[3].parts.length
                ? fixtures[0].params[3].parts
                : [];
            let initialData: IInitialData = {
                fields: {
                    cuesFields: generateFields(null),
                    fireMachines: {
                        staticFields: generateFields(parts.filter(p => p.type === 'static')),
                        dynamicFields: generateFields(parts.filter(p => p.type === 'dynamic')),
                        longFields: generateFields(parts.filter(p => p.type === 'long'))
                    },
                    fireWorks: {
                        fields: generateFields(null)
                    }
                },
                fixtures: fixtures
            };
            dataStorage.set('showData', initialData);
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

const mapStateToProps = (state: RootState) => ({});

const ApplicationContainer = connect(mapStateToProps, {
    patchFixturesAC, setInitialFields
})(Application);

export default hot(ApplicationContainer);
