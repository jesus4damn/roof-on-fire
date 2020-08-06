import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { useEffect } from 'react';
import TimeLine from './TimeLineWorkspace/TimeLineContainer';
import Header from './Header/Header';
import MainWorkspace from './MainWorkspace/MainWorkspace';
import CuesWorkspace from './ButtonsWorkspace/ButtonsWorkspace';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { IInitAppParams } from '../store/getInitalState';
import { ContextMenu } from './common/ContextWrapper';
// @ts-ignore
import {
  loadShowFile,
  resetShowData,
  setContextMenuOptions,
  storeShowFile,
  switchAppScreenMode
} from '../store/appReducer/appActions';
import { IAppScreenModes, IContextMenuOption } from '../../types/appTypes';
import { MusicContextProvider } from '../misicContext/musicContext';
import Patch from './PatchView/Patch';
import Output from './OutputView/Output';

require('./App.scss');

interface IProps {
  storeShowFile: () => void
  loadShowFile: () => void
  resetShowData: (params: IInitAppParams) => void
  setContextMenuOptions: (payload: IContextMenuOption[]) => void
  contextOptions: IContextMenuOption[]
  appScreenMode: IAppScreenModes
}

const Application = ({
                       storeShowFile,
                       setContextMenuOptions,
                       contextOptions,
                       appScreenMode,
                       loadShowFile,
                       resetShowData
                     }: IProps) => {

  const hideContextMenu = () => {
    setContextMenuOptions([]);
  };

  const loadData = () => {
    loadShowFile();
  };

  const resetData = (params: IInitAppParams) => {
    resetShowData(params);
  };

  const saveData = () => {
    storeShowFile();
  };

  useEffect(() => {
    resetData({ fixtures: 8, static: 5, dynamic: 5, long: 5 });
    return () => {
    };
  }, []);

  return (
    <div className={`appWrapper ${appScreenMode === 'patch' ? 'patchMode' : appScreenMode === 'output' ? 'outputMode' : ''}`}>
      <ContextMenu options={contextOptions} onClose={hideContextMenu}>
        <MusicContextProvider>
          <div className="headerWrapper">
            <Header
              appScreenMode={appScreenMode}
              hideContextMenu={hideContextMenu}
              resetData={resetData}
              loadData={loadData}
              saveData={saveData}/>
          </div>

          <div className="contentWorkspaceWrapper" style={appScreenMode !== 'output' ? {} : { display: 'none' }}>
            <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
            {appScreenMode === 'main'
              ? <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div> : ''}
          </div>
          <div className="timeLineWorkspaceWrapper" style={appScreenMode !== 'main' ? { display: 'none' } : {}}>
            <TimeLine/>
          </div>
          {appScreenMode === 'output'
            ? <div className="outputWorkspaceWrapper">
              <Output/>
            </div>
            : appScreenMode === 'patch' ? <div className="patchWorkspaceWrapper">
              <Patch/>
            </div> : ''}

        </MusicContextProvider>
      </ContextMenu>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  contextOptions: state.app.contextMenuOptions,
  appScreenMode: state.app.appScreenMode
});

const ApplicationContainer = connect(mapStateToProps, {
  setContextMenuOptions, switchAppScreenMode, storeShowFile, loadShowFile, resetShowData
})(Application);

export default hot(ApplicationContainer);
