import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TimeLine from './TimeLineWorkspace/TimeLine';
import Header from './Header/Header';
import MainWorkspace from './MainWorkspace/MainWorkspace';
import CuesWorkspace from './ButtonsWorkspace/ButtonsWorkspace';
import { useEffect } from 'react';
import { IFieldsState } from '../store/fieldsReducer/fieldsReducer';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sETFixturesSateAC } from '../store/fixturesReducer/fixturesActions';
import { IFixturesState } from '../store/fixturesReducer/fixturesReducer';
import { loadPrevious, resetState } from '../store/getInitalState';
import { setInitialFields } from '../store/fieldsReducer/fieldsActions';

require('./App.scss');

interface IProps {
    sETFixturesSateAC: (payload: IFixturesState) => void
    setInitialFields: (fields: IFieldsState) => void
}

const Application = ({ sETFixturesSateAC, setInitialFields }: IProps) => {
    const loadData = () => {
        try {
            const getData = () => {
                const commonData = loadPrevious();
                sETFixturesSateAC(commonData.fixtures);
                setInitialFields(commonData.fields);
            };
            getData();
        } catch (e) {
            resetState()
        }
    }
    const resetData = () => {
        const common = resetState();
        sETFixturesSateAC(common.fixtures);
        setInitialFields(common.fields);
    };
    return (
        <div className="appWrapper">
            <div className="headerWrapper"><Header resetData={resetData} loadData={loadData} /></div>
            <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
            <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div>
            <div className="timeLineWorkspaceWrapper"><TimeLine/></div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({});

const ApplicationContainer = connect(mapStateToProps, {
    sETFixturesSateAC, setInitialFields
})(Application);

export default hot(ApplicationContainer);
