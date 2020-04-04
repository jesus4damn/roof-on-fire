import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';
import { setFixturePattern, updateFixturePattern } from '../../../store/fixturesReducer/fixturesActions';
import { IContextMenuOption } from '../../../../types/appTypes';
import { setContextMenuOptions } from '../../../store/appReducer/appActions';
import {  useState } from 'react';
import FormsModal, { IInputField } from '../../common/modalContent/FormsModal';
import PickerModal from '../../common/modalContent/PickerModal';
import Modal from '../../common/ModalWrapper';
import { IField } from '../../../../types/fieldsTypes';

require('./Field.scss');

interface IProps {
    id: string,
    connected: IPattern | null
    setFixturePattern: (pattern: IPattern) => void
    updateFixturePattern: (pattern: IPattern) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
}
type PatternKeys = keyof IPattern;

const Field: React.FC<IProps> = ({id, connected, setFixturePattern, setContextMenuOptions, updateFixturePattern}) => {
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    const closeModal = () => {
        setModalContent(null);
        setIsModalShown(false);
    };
    const showModal = (fields: IInputField[]) => {
        setModalContent(
            <FormsModal
            fields={fields}
            onSubmit={(fields: IInputField[]) => {
                fields.forEach(f => {
                    if (connected && Object.keys(connected).includes(f.title)) {
                        // @ts-ignore
                        onUpdatePattern(f.title, f.value)
                    }
                });
                closeModal();
            }}
            />);
        setIsModalShown(true);
    };

    const showSelectModal = (type: keyof IPattern) => {
        setIsModalShown(true);
        setModalContent(
            <PickerModal type={type} onSubmit={(value: string) => {
                onUpdatePattern(type, value);
                closeModal();
            }} />
        )
    };
    const itemBase = {
        name: '',
        id: '',
        img: ''
    };
    const item = {...itemBase, ...connected};

    const contextOptions = [
        {
            title: 'Set image',
            disabled: connected === null,
            callback: () => {showSelectModal('img')}
        },
        {
            title: 'Set color',
            disabled: connected === null,
            callback: () => {
                showSelectModal('color')}
        },
        {
            title: 'Rename',
            disabled: connected === null,
            callback: () => {showModal([{title: 'name', type: "text", placeholder: 'name', value: connected && connected.name}])}
        }
    ];

    const setActivePattern = () => {
        if(connected !== null) {
            setFixturePattern({...connected, active: true})
        }
    };

    const onUpdatePattern = <Key extends keyof IPattern, Value extends IPattern[Key]>(key: Key, value: Value) => {
        if(connected !== null) {
            const toUpdate = {...connected, [key]: value};
            console.log(toUpdate);
            updateFixturePattern(toUpdate)
        }
    };

    return (
        <div className="totalWrap"
             style={{borderColor: connected && connected.active ? 'orange' : 'inherit'}}
        >
            <div className="wrap"
                 onClick={setActivePattern}
                 onContextMenu={() => {setContextMenuOptions(contextOptions)}}
            >
                <div className="imgWrap" style={{borderColor: connected && connected.color ? connected.color : '#666666'}}>
                    <div className="image">
                        <img className="preview__img" src={item.img} alt=""/>
                    </div>
                </div>
                <div className="titleWrap" style={{borderColor: item.id ? '#FFF' : '#666666'}}>
                    <span className="title"><a>{item.name ? item.name : ''}</a></span>
                </div>
            </div>
            <Modal
                isShown={isModalShown}
                closeModal={closeModal}
                noActions={true}
            >
                {modalContent}
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps,{ setFixturePattern, setContextMenuOptions, updateFixturePattern })(Field);
