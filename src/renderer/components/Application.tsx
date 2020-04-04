import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TimeLine from './TimeLineWorkspace/TimeLine';
import Header from './Header/Header';
import MainWorkspace from './MainWorkspace/MainWorkspace';
import CuesWorkspace from './ButtonsWorkspace/ButtonsWorkspace';
import { IFieldsState } from '../store/fieldsReducer/fieldsReducer';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sETFixturesSateAC } from '../store/fixturesReducer/fixturesActions';
import { IFixturesState } from '../store/fixturesReducer/fixturesReducer';
import { loadPrevious, resetState, saveState } from '../store/getInitalState';
import { setInitialFields } from '../store/fieldsReducer/fieldsActions';
import { ContextMenu } from './common/ContextWrapper';
import { useState } from 'react';
import Modal from './common/ModalWrapper';
import { setContextMenuOptions } from '../store/appReducer/appActions';
import { IContextMenuOption } from '../../types/appTypes';

require('./App.scss');

interface IProps {
    sETFixturesSateAC: (payload: IFixturesState) => void
    setInitialFields: (fields: IFieldsState) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
    contextOptions: IContextMenuOption[]
    fixtures: IFixturesState
    fields: IFieldsState
}

const Application = ({
                         sETFixturesSateAC,
                         setInitialFields,
                         fixtures,
                         fields,
                         setContextMenuOptions,
                         contextOptions
                    }: IProps) => {

    const hideContextMenu = () => {
        setContextMenuOptions([]);
    };

    const loadData = () => {
        try {
            const getData = () => {
                const commonData = loadPrevious();
                sETFixturesSateAC(commonData.fixtures);
                setInitialFields(commonData.fields);
            };
            getData();
        } catch (e) {
            resetState();
        }
    };

    const resetData = () => {
        const common = resetState();
        sETFixturesSateAC(common.fixtures);
        setInitialFields(common.fields);
    };

    const saveData = () => {
        saveState({ fixtures, fields });
    };
    return (
        <div className="appWrapper">
            <ContextMenu options={contextOptions} onClose={hideContextMenu}>
                <div className="headerWrapper"><Header resetData={resetData} loadData={loadData} saveData={saveData}/>
                </div>
                <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
                <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div>
                <div className="timeLineWorkspaceWrapper"><TimeLine/></div>
            </ContextMenu>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    fixtures: state.fixtures,
    fields: state.fields,
    contextOptions: state.app.contextMenuOptions
});

const ApplicationContainer = connect(mapStateToProps, {
    sETFixturesSateAC, setInitialFields, setContextMenuOptions
})(Application);

export default hot(ApplicationContainer);
