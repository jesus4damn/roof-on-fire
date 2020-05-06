import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';
import {
    setFixturePattern,
    setSelectedFixturesPattern,
    updatePattern

} from '../../../store/fixturesReducer/fixturesActions';
import { IContextMenuOption } from '../../../../types/appTypes';
import { setContextMenuOptions } from '../../../store/appReducer/appActions';
import { useCallback, useState } from 'react';
import FormsModal, { IInputField } from '../../common/modalContent/FormsModal';
import PickerModal from '../../common/modalContent/PickerModal';
import Modal from '../../common/ModalWrapper';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import Field from '../components/Field';
import { dragTypes } from '../../../../types/dragTypes';

interface IProps {
    id: string,
    connected: IPattern | null
    updatePattern: (pattern: IPattern) => void
    setSelectedFixturesPattern: (pattern: IPattern) => void
    setFixturePattern: (pattern: IPattern, fixtureId: string) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
}

const PatternFieldWrapper: React.FC<IProps> = ({
                                                   id,
                                                   connected,
                                                   updatePattern,
                                                   setContextMenuOptions,
                                                   setFixturePattern,
                                                   setSelectedFixturesPattern
                                               }) => {
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [{ isDragging }, drag, preview] = useDrag({
        item: { pattern: connected ? connected : null, type: dragTypes.PATTERN_FIELD },
        end: (item: { name: string }
            | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && connected) {
                setFixturePattern(connected, dropResult.fixtureId);
                //console.log(`You dropped ${item.name} into ${dropResult.fixtureId}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: (monitor => !!(connected && connected.id))
    });

    const closeModal = useCallback(() => {
        setModalContent(null);
        setIsModalShown(false);
    }, []);

    const showModal = (fields: IInputField[]) => {
        setModalContent(
            <FormsModal
                fields={fields}
                onSubmit={(fields: IInputField[]) => {
                    fields.forEach(f => {
                        if (connected && Object.keys(connected).includes(f.title)) {
                            // @ts-ignore
                            onUpdatePattern(f.title, f.value);
                        }
                    });
                    closeModal();
                }}
            />);
        setIsModalShown(true);
    };

    const showSelectModal = useCallback((type: keyof IPattern) => {
        setIsModalShown(true);
        setModalContent(
            <PickerModal type={type} onSubmit={(value: string) => {
                onUpdatePattern(type, value);
                closeModal();
            }}/>
        );
    }, []);

    const itemBase = {
        name: '',
        id: '',
        img: ''
    };

    const item = { ...itemBase, ...connected };

    const contextOptions = [
        {
            title: 'Set image',
            disabled: connected === null,
            callback: () => {
                showSelectModal('img');
            }
        },
        {
            title: 'Set color',
            disabled: connected === null,
            callback: () => {
                showSelectModal('color');
            }
        },
        {
            title: 'Rename',
            disabled: connected === null,
            callback: () => {
                showModal([{ title: 'name', type: 'text', placeholder: 'name', value: connected && connected.name }]);
            }
        }
    ];

    const setActivePattern = useCallback(() => {
        if (connected !== null) {
            setSelectedFixturesPattern({ ...connected, active: true });
        }
    }, [connected]);

    const onUpdatePattern = useCallback(<Key extends keyof IPattern, Value extends IPattern[Key]>(key: Key, value: Value) => {
        if (connected !== null) {
            const toUpdate = { ...connected, [key]: value };
            console.log(toUpdate);
            updatePattern(toUpdate);
        }
    }, [connected]);

    return (
        <div ref={drag}>
            <Field
                active={connected && connected.active}
                color={connected && connected.color}
                name={item.name}
                img={item.img}
                select={setActivePattern}
                callContext={() => {
                    setContextMenuOptions(contextOptions);
                }}
            />
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

export default connect(mapStateToProps, {
    updatePattern,
    setContextMenuOptions,
    setSelectedFixturesPattern,
    setFixturePattern
})(PatternFieldWrapper);
