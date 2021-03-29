import * as React from 'react';
import { RootState } from '../../store/rootReducer';
import styled from "styled-components";
import { switchMainRightPartAction, switchMainScreenAction } from '../../store/appReducer/appActions';
import { connect } from 'react-redux';
import { IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import Visualizer from './Visualizer/VisualizerContainer';
import Fixtures from './Fixtures/Fixtures';
import CueList from './CueList/CueList';
import Cues from './Cues/CueEditor';

require('./MainWorkspace.scss');

export interface IConnectedProps {
  mainLeftScreenSwitcher: IMainScreenSwitchers,
  mainRightScreenSwitcher: IMainRightScreenSwitchers,
  backgroundImage: any
}

export interface IDispatchedProps {
  switchMainScreenAction: (val: IMainScreenSwitchers) => void
  switchMainRightPartAction: (val: IMainRightScreenSwitchers) => void
}

interface IAllProps extends IConnectedProps, IDispatchedProps {
}

const MainWorkspaceContent = styled.div<{background: string}>`
  background-image: ${({background}) => `url(${background})` };
  background-size: cover;
`;

const MainWorkspace: React.FunctionComponent<IAllProps> = ({
                                                             mainLeftScreenSwitcher,
                                                             mainRightScreenSwitcher,
                                                             switchMainScreenAction,
                                                             switchMainRightPartAction,
                                                             backgroundImage
                                                           }) => {
  
  const [backgroundSrc,setBackgroundImageUrl] = React.useState('');
  React.useEffect(() => {
    if(typeof backgroundImage === 'object'){
      console.log("Change background");
      setBackgroundImageUrl(URL.createObjectURL(backgroundImage));
    }
  },[backgroundImage]);
  
  return (
    <MainWorkspaceContent className='mainWorkspaceContent' background={backgroundSrc}>
      <div className="navGroup">
        <div className="navGroupButton">
          <button className={mainLeftScreenSwitcher === 'visualiser' ? 'navGroupButtonActive' : ''} onClick={() => {
            switchMainScreenAction('visualiser');
          }}>
            Визуализация
          </button>
          <button className={mainLeftScreenSwitcher === 'cueListWindow' ? 'navGroupButtonActive' : ''} onClick={() => {
            switchMainScreenAction('cueListWindow');
          }}>
            Список Кью
          </button>
        </div>

        <div className="navGroupButton">
          <button className={mainRightScreenSwitcher === 'fixtures' ? 'navGroupButtonActive' : ''} onClick={() => {
            switchMainRightPartAction('fixtures');
          }}>
            Список Приборов
          </button>
          <button className={mainRightScreenSwitcher === 'cuesWindow' ? 'navGroupButtonActive' : ''} onClick={() => {
            switchMainRightPartAction('cuesWindow');
          }}>
            Контент Кью
          </button>
        </div>
      </div>

      <div className="workspaceContent">
        <div className="workspaceContainer" style={{
          maxWidth: mainRightScreenSwitcher ? '43%' : '100%',
          width: mainRightScreenSwitcher ? '43%' : '100%'
        }}>
          {mainLeftScreenSwitcher === 'visualiser' && <Visualizer/>}
          {mainLeftScreenSwitcher === 'cueListWindow' && <CueList/>}
        </div>
        {mainRightScreenSwitcher && <div className="workspaceContainer" style={{ maxWidth: '57%', width: '57%' }}>
          {mainRightScreenSwitcher === 'fixtures' && <Fixtures/>}
          {mainRightScreenSwitcher === 'cuesWindow' && <Cues/>}
        </div>}
      </div>
    </MainWorkspaceContent>
  );
};

const mapStateToProps = (state: RootState) => ({
  mainLeftScreenSwitcher: state.app.mainLeftScreenSwitcher,
  mainRightScreenSwitcher: state.app.mainRightScreenSwitcher,
  backgroundImage: state.app.mainScreenSettings.image
});

export default connect(mapStateToProps, { switchMainScreenAction, switchMainRightPartAction })(MainWorkspace);
