import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../common/ModalWrapper';
import { selectMusicFile } from '../../store/appReducer/appActions';
import { MusicInput } from '../common/modalContent/AudioInput';
import ExcelReader from '../../../data-helper/ExcelReader';
import { IInitAppParams } from '../../store/getInitalState';

require('./Header.scss');

interface IProps {
    hideContextMenu: () => void
    resetData: (params: IInitAppParams) => void
    loadData: () => void
    saveData: () => void
    selectMusicFile: (payload: string) => {}
}
// const logoImg = require('../../../../assets/images/svg/logoImg.svg');
// export const getLogoImg = () => {
//     return logoImg
// };
const Header:React.FC<IProps> = ({resetData, loadData, saveData, selectMusicFile}) => {
    const [menuShown, setMenuShow] = useState(false);
    const menuWrapperRef = React.createRef<HTMLDivElement>();
    const [activeBtn,setActiveBtn]= useState(false);
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    const contextOptions = [
        {
            title: 'resetState',
            disabled: false,
            callback: () => {
                showModal('reset');
                setMenuShow(false)
            }
        },
        {
            title: 'loadData',
            disabled: false,
            callback: () => {
                loadData();
                setMenuShow(false)
            }
        },
        {
            title: 'saveData',
            disabled: false,
            callback: () => {
                saveData();
                setMenuShow(false)
            }
        },
        {
            title: 'Import',
            disabled: false,
            callback: () => {
                showModal('music');
                setMenuShow(false)
            }
        },
        {
            title: 'Parse Pdf',
            disabled: false,
            callback: () => {
                showModal('parser');
                setMenuShow(false)
            }
        },
    ];

    const onResetAppDataConfirm = (resetAppDataOptions: IInitAppParams) => {
        resetData(resetAppDataOptions);
        closeModal();
    };

    const showModal = (type: 'music' | 'reset' | 'parser') => {
        if (type === 'music') {
            setModalContent(() =>
                <div className={"importWrapper"}>
                    <MusicInput
                        label={"Select track"}
                        onSelect={(path:string)=>{selectMusicFile(path)}}
                        onChange={onChange}
                    />
                </div>
            );
        } else if (type === 'parser') {
            setModalContent(() =>
                <div className={"importWrapper"}>
                    <ExcelReader />
                </div>
            );
        } else {
            setModalContent(
                <ResetAppForm onResetAppDataConfirm={onResetAppDataConfirm}/>
            );
        }
        setIsModalShown(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalShown(false);
    };

    const onChange = (value:any) => {
        console.log(value);
        //onChange(e.target.files[0])
    };

    useEffect(() => {
        const handleOuterClick = (e: any) => {
            if ( menuShown && menuWrapperRef.current && e.target && !menuWrapperRef.current.contains(e.target) ) {
                setMenuShow(false);
                setActiveBtn(!activeBtn);
            }
        };
        if (menuShown) {
            window.addEventListener("click", handleOuterClick)


        } else {
            window.removeEventListener("click", handleOuterClick);
            setActiveBtn(!activeBtn);
        }
        return () => {
            window.removeEventListener("click", handleOuterClick);

        }
    }, [menuShown]);

    return (
        <React.Fragment>
            <div className={'headerContent'}>
                <img className={'logoImg'} src="../src/assets/images/svg/logoImg.svg" alt=""/>
                <button>File</button>
                <button className={activeBtn ? '' :'ActiveBtn'} onClick={() => {
                    setMenuShow(true);
                    setActiveBtn(false);

                }
                }>Menu</button>
                <button>Patch</button>
                <button>Outline</button>
                <>
                    {(menuShown || null) && <div ref={menuWrapperRef} className="contextMenu">
                        {contextOptions.map((o, i)=> (
                            <div key={o.title + i}
                                 className={`contextMenu--option${o.disabled ? ' disabled' : ''}`}
                                 onClick={o.callback}>
                                {o.title}
                            </div>
                        ))}
                    </div>}
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
    )
};

export default connect(null, {selectMusicFile})(Header)

interface IformProps {
    onResetAppDataConfirm: (val: IInitAppParams) => void
}
const ResetAppForm: React.FC<IformProps> = ({onResetAppDataConfirm}) => {
    const [resetAppDataOptions, setResetAppDataOptions] = useState<IInitAppParams>({fixtures: 5, static: 5, dynamic: 5, long: 5});

    return (
    <div className="modalFormWrapp renameInput">
        <h2>Select InitialParams</h2>
        <span>fixtures</span>
        <input
            type="number"
            onChange={(e) => {
                console.log(e.currentTarget.value)
                console.log(e.target.value)
                setResetAppDataOptions({...resetAppDataOptions, fixtures: +e.currentTarget.value})
            }}
            value={resetAppDataOptions.fixtures}
        />
        <span>static</span>
        <input
            type="number"
            onChange={(e) => setResetAppDataOptions({...resetAppDataOptions, static: +e.currentTarget.value})}
            value={resetAppDataOptions.static}
        />
        <span>dynamic</span>
        <input
            type="number"
            onChange={(e) => setResetAppDataOptions({...resetAppDataOptions, dynamic: +e.target.value})}
            value={resetAppDataOptions.dynamic}
        />
        <span>long</span>
        <input
            type="number"
            onChange={(e) => setResetAppDataOptions({...resetAppDataOptions, long: +e.target.value})}
            value={resetAppDataOptions.long}
        />
        <button onClick={() => onResetAppDataConfirm(resetAppDataOptions)}>Reset</button>
    </div>
    )
};
