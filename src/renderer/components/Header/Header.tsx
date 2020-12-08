import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../common/ModalWrapper';
import {
  loadShowFile,
  selectMusicFile,
  setError,
  storeShowFile,
  switchAppScreenMode
} from '../../store/appReducer/appActions';
import { MusicInput, TextPatternsInput } from '../common/modalContent/AudioInput';
import { IAppScreenModes } from '../../../types/appTypes';
import { getLoadFilePath, IInitAppParams, setSaveFilePath } from '../../store/getInitalState';
import { RootState } from '../../store/rootReducer';
import { IPattern } from '../../../types/fixtureTypes';

require('./Header.scss');

interface IProps {
  hideContextMenu: () => void
  resetData: (params: IInitAppParams, patterns?: IPattern[]) => void
}

interface IConnectedProps {
  error: any
  appScreenMode: IAppScreenModes
  storeShowFile: (path: string) => void
  loadShowFile: (path: string) => void
  switchAppScreenMode: (payload: IAppScreenModes) => void
  selectMusicFile: (payload: string) => {},
  setError: (payload: any) => {},
}

const Header: React.FC<IProps & IConnectedProps> = ({
                                                      error,
                                                      resetData,
                                                      loadShowFile,
                                                      storeShowFile,
                                                      selectMusicFile,
                                                      appScreenMode,
                                                      switchAppScreenMode
                                                    }) => {
  const [menuShown, setMenuShow] = useState<null | 'FILE' | 'MENU'>(() => null);
  const menuWrapperRef = React.createRef<HTMLDivElement>();
  const [activeBtn, setActiveBtn] = useState<string>(() => '');
  const [modalContent, setModalContent] = useState<any | null>(null);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  useEffect(() => {
    console.log(error);
    if (error.load) {
      setModalContent(() =>
        <div className={'importWrapper'}>
          <div className={'errorMessage'}>
            {error.load}
          </div>
        </div>);
      setIsModalShown(true);
    }
  }, [error]);

  const contextMenuOptions = [
    {
      title: 'Reset State',
      disabled: false,
      callback: () => {
        showModal('reset');
        setMenuShow(null);
      }
    },
    {
      title: 'Import Music',
      disabled: false,
      callback: () => {
        showModal('music');
        setMenuShow(null);
      }
    },
    {
      title: 'Parse .TXT',
      disabled: false,
      callback: () => {
        showModal('parser');
        setMenuShow(null);
      }
    },
  ];
  const contextFileOptions = [
    {
      title: 'loadData',
      disabled: false,
      callback: () => {
        getLoadFilePath().then((res: string) => {
          if (res) {
            loadShowFile(res);
          }
        });
        setMenuShow(null);
      }
    },
    {
      title: 'saveData',
      disabled: false,
      callback: () => {
        setSaveFilePath().then((path: any) => {
          console.log(path);
          storeShowFile(path);
        });
        setMenuShow(null);
      }
    }
  ];

  const onResetAppDataConfirm = (resetAppDataOptions: IInitAppParams) => {
    resetData(resetAppDataOptions);
    closeModal();
  };

  const showModal = useCallback((type: 'music' | 'reset' | 'parser') => {
    if (type === 'music') {
      setModalContent(() =>
        <div className={'importWrapper'}>
          <MusicInput
            label={'Select track'}
            onSelect={(path: string) => {
              selectMusicFile(path);
            }}
            onChange={() => {
            }}
          />
        </div>
      );
    } else if (type === 'parser') {
      setModalContent(() =>
        <div className={'importWrapper'}>
          <TextPatternsInput
            label={'Select txt file'}
            onSelect={(patterns: IPattern []) => {
              resetData({fixtures: 12, static: 27, dynamic: 27, long: 12}, patterns)
            }}
          />
        </div>
      );
    } else {
      setModalContent(
        <ResetAppForm onResetAppDataConfirm={onResetAppDataConfirm}/>
      );
    }
    setIsModalShown(true);
  }, [resetData, selectMusicFile]);

  const closeModal = useCallback(() => {
    if (error) {
      setError({});
    }
    setModalContent(null);
    setIsModalShown(false);
  }, [error]);

  useEffect(() => {
    const handleOuterClick = (e: any) => {
      if (menuWrapperRef.current && e.target && !menuWrapperRef.current.contains(e.target)) {
        setMenuShow(null);
        setActiveBtn('');
      }
    };
    if (menuShown) {
      window.addEventListener('click', handleOuterClick);
    } else {
      window.removeEventListener('click', handleOuterClick);
      setActiveBtn('');
    }
    return () => {
      window.removeEventListener('click', handleOuterClick);
    };
  }, [menuShown, menuWrapperRef]);

  return (
    <React.Fragment>
      <div className={'headerContent'}>
        <img className={'logoImg'} src="../src/assets/images/svg/logoImg.svg" alt=""/>
        <button className={activeBtn === 'FILE' ? 'ActiveBtn' : ''} onClick={() => {
          setMenuShow('FILE');
          setActiveBtn('FILE');
        }}
        >File
        </button>
        <button className={activeBtn === 'MENU' ? 'ActiveBtn' : ''} onClick={() => {
          setMenuShow('MENU');
          setActiveBtn('MENU');
          switchAppScreenMode(appScreenMode === 'main' ? 'main' : 'main');
        }}
        >Menu
        </button>
        <button
          style={appScreenMode === 'patch' ? { backgroundColor: '#222222', color: '#fff' } : {}}
          onClick={() => switchAppScreenMode(appScreenMode !== 'patch' ? 'patch' : 'main')}
        >
          Patch
        </button>
        <button
          style={appScreenMode === 'output' ? { backgroundColor: '#222222', color: '#fff' } : {}}
          onClick={() => switchAppScreenMode(appScreenMode !== 'output' ? 'output' : 'main')}
        >
          Output
        </button>
        <>
          {menuShown !== null ?
            <div ref={menuWrapperRef} className="contextMenu" style={menuShown === 'FILE' ? { left: '45px' } : {}}>
              {menuShown === 'MENU' ? contextMenuOptions.map((o, i) => (
                <div key={o.title + i}
                     className={`contextMenu--option${o.disabled ? ' disabled' : ''}`}
                     onClick={o.callback}>
                  {o.title}
                </div>
              )) : menuShown === 'FILE' ? contextFileOptions.map((o, i) => (
                <div key={o.title + i}
                     className={`contextMenu--option${o.disabled ? ' disabled' : ''}`}
                     onClick={o.callback}>
                  {o.title}
                </div>
              )) : null}
            </div> : null}
        </>
      </div>
      <Modal
        isShown={isModalShown}
        closeModal={closeModal}
        noActions={true}
      >
        {modalContent}
      </Modal>
    </React.Fragment>
  );
};

interface IformProps {
  onResetAppDataConfirm: (val: IInitAppParams) => void
}

const ResetAppForm: React.FC<IformProps> = ({ onResetAppDataConfirm }) => {
  const [resetAppDataOptions, setResetAppDataOptions] = useState<IInitAppParams>({
    fixtures: 5,
    static: 5,
    dynamic: 5,
    long: 5
  });

  return (
    <div className="modalFormWrapp renameInput">
      <h2>Select InitialParams</h2>
      <div className="modalFormInner">
        <div className="modalFormItem">
          <span>fixtures</span>
          <input
            type="number"
            onChange={(e) => {
              setResetAppDataOptions({ ...resetAppDataOptions, fixtures: +e.currentTarget.value });
            }}
            value={resetAppDataOptions.fixtures}
          />
        </div>
        <div className="modalFormItem">
          <span>static</span>
          <input
            type="number"
            onChange={(e) => setResetAppDataOptions({ ...resetAppDataOptions, static: +e.currentTarget.value })}
            value={resetAppDataOptions.static}
          />
        </div>
        <div className="modalFormItem">
          <span>dynamic</span>
          <input
            type="number"
            onChange={(e) => setResetAppDataOptions({ ...resetAppDataOptions, dynamic: +e.target.value })}
            value={resetAppDataOptions.dynamic}
          />
        </div>
        <div className="modalFormItem">
          <span>long</span>
          <input
            type="number"
            onChange={(e) => setResetAppDataOptions({ ...resetAppDataOptions, long: +e.target.value })}
            value={resetAppDataOptions.long}
          />
        </div>
      </div>


      <button onClick={() => onResetAppDataConfirm(resetAppDataOptions)}>Reset</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  contextOptions: state.app.contextMenuOptions,
  appScreenMode: state.app.appScreenMode,
  error: state.app.error
});

export default connect(mapStateToProps, {
  selectMusicFile,
  switchAppScreenMode,
  storeShowFile,
  loadShowFile,
  setError
})(Header);
