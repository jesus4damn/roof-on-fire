import * as React from "react";
import {connect} from "react-redux";
import { RefObject, useEffect, useRef, useState } from 'react';
import Modal from '../common/ModalWrapper';
import { selectMusicFile, setContextMenuOptions } from '../../store/appReducer/appActions';
import { IContextMenuOption } from '../../../types/appTypes';
import { MusicInput } from '../common/modalContent/AudioInput';

require('./Header.scss');

interface IProps {
    hideContextMenu: () => void
    resetData: () => void
    loadData: () => void
    saveData: () => void
    selectMusicFile: (payload: string) => {}
}

const Header:React.FC<IProps> = ({resetData, loadData, saveData, selectMusicFile}) => {
    const [menuShown, setMenuShow] = useState(false);
    const menuWrapperRef = React.createRef<HTMLDivElement>();
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    const contextOptions = [
        {
            title: 'resetState',
            disabled: false,
            callback: () => {
                resetData();
                setMenuShow(false)
            }
        },
        {
            title: 'loadData',
            disabled: false,
            callback: () => {
                console.log('load!!!!!!')
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
                showModal();
                setMenuShow(false)
            }
        },
    ];

    const showModal = () => {
        setIsModalShown(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalShown(false);
    };

    const onChange = (value:any) => {
        console.log(value);
        //onChange(e.target.files[0])
    }

    return (
        <div>
            <div className={'headerContent'}>
                <button onClick={() => {
                    setMenuShow(true)}
                }>MENU</button>
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
                <div className={"importWrapper"}>
                    <MusicInput
                        label={"Select track"}
                        onSelect={(path:string)=>{selectMusicFile(path)}}
                        onChange={onChange}
                    />
                </div>
            </Modal>
        </div>
    )
};

export default connect(null, {selectMusicFile})(Header)
