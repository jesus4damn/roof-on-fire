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
  resetShowData, selectMusicFile,
  setContextMenuOptions,
  switchAppScreenMode
} from '../store/appReducer/appActions';
import { IAppScreenModes, IContextMenuOption } from '../../types/appTypes';
import { MusicContextProvider } from '../misicContext/musicContext';
import Patch from './PatchView/Patch';
import Output from './OutputView/Output';
import ErrorBoundary from './common/ErrorBounary/ErrorBounary';
import { IPattern } from '../../types/fixtureTypes';

require('./App.scss');

interface IProps {
    resetShowData: (params: IInitAppParams, patterns?: IPattern[]) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
    contextOptions: IContextMenuOption[]
    appScreenMode: IAppScreenModes
    loadShowFile: (path: string) => void
    selectMusicFile: (payload: string) => void,
}

const Application = ({
                         setContextMenuOptions,
                         contextOptions,
                         appScreenMode,
                         resetShowData,
                        loadShowFile,
                       selectMusicFile
                     }: IProps) => {

    const hideContextMenu = () => {
        setContextMenuOptions([]);
    };

    const resetData = (params: IInitAppParams, patterns?: IPattern[]) => {
        resetShowData(params, patterns);
    };

    useEffect(() => {
        loadShowFile('');
        return () => {};
    }, []);

    return (
      <ErrorBoundary onErrorCallback={() => resetData({fixtures: 12, static: 27, dynamic: 27, long: 12})}>
        <div
            className={`appWrapper ${appScreenMode === 'patch' ? 'patchMode' : appScreenMode === 'output' ? 'outputMode' : ''}`}>
            <ContextMenu options={contextOptions} onClose={hideContextMenu}>
                <MusicContextProvider>
                  <ErrorBoundary onErrorCallback={() => resetData({fixtures: 12, static: 27, dynamic: 27, long: 12})}>
                    <div className="headerWrapper">
                        <Header
                            hideContextMenu={hideContextMenu}
                            resetData={resetData}
                        />
                    </div>
                  </ErrorBoundary>
                  <ErrorBoundary onErrorCallback={() => loadShowFile("")}>
                    <div className="contentWorkspaceWrapper"
                         style={appScreenMode !== 'output' ? {} : { display: 'none' }}>
                        <div className="mainWorkspaceWrapper"><MainWorkspace/></div>
                        {appScreenMode === 'main'
                            ? <div className="cuesWorkspaceWrapper"><CuesWorkspace/></div> : ''}
                    </div>
                  </ErrorBoundary>
                  <ErrorBoundary onErrorCallback={() => selectMusicFile("")}>
                    <div className="timeLineWorkspaceWrapper"
                         style={appScreenMode !== 'main' ? { display: 'none' } : {}}>
                        <TimeLine/>
                    </div>
                  </ErrorBoundary>
                  <ErrorBoundary onErrorCallback={() => loadShowFile("")}>
                    {appScreenMode === 'output'
                        ? <div className="outputWorkspaceWrapper">
                            <Output/>
                        </div>
                        : appScreenMode === 'patch' ? <div className="patchWorkspaceWrapper">
                            <Patch/>
                        </div> : ''}
                  </ErrorBoundary>
                </MusicContextProvider>
            </ContextMenu>
        </div>
      </ErrorBoundary>
    );
};

const mapStateToProps = (state: RootState) => ({
    contextOptions: state.app.contextMenuOptions,
    appScreenMode: state.app.appScreenMode
});

const ApplicationContainer = connect(mapStateToProps, {
    setContextMenuOptions, switchAppScreenMode, resetShowData, loadShowFile, selectMusicFile
})(Application);

export default hot(ApplicationContainer);
