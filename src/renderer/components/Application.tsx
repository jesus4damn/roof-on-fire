import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TimeLine from './TimeLineWorkspace/TimeLineContainer';
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
// @ts-ignore
import { setContextMenuOptions } from '../store/appReducer/appActions';
import { IContextMenuOption } from '../../types/appTypes';
import { ICuesState } from '../store/cuesReducer/cuesReducer';
import { MusicContextProvider } from '../misicContext/musicContext';
import { setCuesData } from '../store/cuesReducer/cuesActions';

require('./App.scss');

interface IProps {
    sETFixturesSateAC: (payload: IFixturesState) => void
    setInitialFields: (fields: IFieldsState) => void
    setCuesData: (state: ICuesState) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
    contextOptions: IContextMenuOption[]
    fixtures: IFixturesState
    fields: IFieldsState
    cues: ICuesState
}

const Application = ({
                         sETFixturesSateAC,
                         setInitialFields,
                         fixtures,
                         fields,
                         cues,
                         setContextMenuOptions,
                         contextOptions,
                         setCuesData
                    }: IProps) => {

    const hideContextMenu = () => {
        setContextMenuOptions([]);
    };

    const loadData = () => {
        console.log('load ==========>');
        try {
            const getData = () => {
                const commonData = loadPrevious();
                sETFixturesSateAC(commonData.fixtures);
                setInitialFields(commonData.fields);
                setCuesData(commonData.cues)
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
        saveState({ fixtures, fields, cues });
    };
    return (
        <div className="appWrapper">
            <ContextMenu options={contextOptions} onClose={hideContextMenu}>
                <MusicContextProvider>
                    <div className="headerWrapper">
                        <Header
                            hideContextMenu={hideContextMenu}
                            resetData={resetData}
                            loadData={loadData}
                            saveData={saveData}/>
                    </div>
                    <div className="contentWorkspaceWrapper">
                    <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
                    <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div>
                    </div>
                    
                    <div className="timeLineWorkspaceWrapper">
                            <TimeLine />
                    </div>
                </MusicContextProvider>
            </ContextMenu>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    fixtures: state.fixtures,
    fields: state.fields,
    cues: state.cues,
    contextOptions: state.app.contextMenuOptions
});

const ApplicationContainer = connect(mapStateToProps, {
    sETFixturesSateAC, setInitialFields, setContextMenuOptions, setCuesData
})(Application);

export default hot(ApplicationContainer);
