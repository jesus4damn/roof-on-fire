import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IFixture, IPattern } from '../../../../types/fixtureTypes';

import { IContextMenuOption } from '../../../../types/appTypes';
import { setContextMenuOptions } from '../../../store/appReducer/appActions';
import { useCallback, useState } from 'react';
import FormsModal, { IInputField } from '../../common/modalContent/FormsModal';
import PickerModal from '../../common/modalContent/PickerModal';
import Modal from '../../common/ModalWrapper';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import Field from '../components/Field';
import { ICue } from '../../../../types/cuesTypes';
import { ICueField, IField } from '../../../../types/fieldsTypes';
import { getSelectedFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import {
    createNewCue,
    createTimelineCue, deleteCue,
    setSelectedCue,
    updateCue
} from '../../../store/cuesReducer/cuesActions';
import { isCueField } from '../../../store/fieldsReducer/fieldsReducer';
import { updateField } from '../../../store/fieldsReducer/fieldsActions';

interface IProps {
    field: ICueField | IField,
    selectedFixtures: IFixture[]
    createNewCue: (fixtures: IFixture[], field: IField) => void,
    updateCue: (cue: ICue) => void,
    deleteCue: (cueId: string, isTimeline: boolean) => void,
    updateField: (field: IField | ICueField, fieldType: string) => void,
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
    setSelectedCue: (cue: ICue | null) => void
    createTimelineCue: (cue: ICue, startTime: number) => void
}

const CueFieldWrapper: React.FC<IProps> = ({
                                               field,
                                               selectedFixtures,
                                               createNewCue,
                                               updateCue,
                                               deleteCue,
                                               updateField,
                                               setContextMenuOptions,
                                               setSelectedCue,
                                               createTimelineCue
                                           }) => {
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const connected = isCueField(field) ? field.connected : null;
    const [{ isDragging }, drag, preview] = useDrag({
        item: { id: connected ? connected.id : 'noId', type: 'CUE_FIELD' },
        end: (item: { id: string }
            | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && connected) {
                createTimelineCue(connected, dropResult.startTime ? dropResult.startTime : 0);
                console.log(`You dropped ${item.id} into ${dropResult.cueList}!`);
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

    const showModal = useCallback((fields: IInputField[]) => {
        setModalContent(
            <FormsModal
                fields={fields}
                onSubmit={(fields: IInputField[]) => {
                    fields.forEach(f => {
                        if (connected && Object.keys(connected).includes(f.title)) {
                            let newCue = {...connected, [f.title]: f.value};
                            updateCue(newCue);
                            updateField({...field, connected: newCue}, 'cue');
                        }
                    });
                    closeModal();
                }}
            />);
        setIsModalShown(true);
    }, [connected]);

    const showSelectModal = (type: keyof IField | keyof ICue) => {
        setIsModalShown(true);
        setModalContent(
            <PickerModal type={type} onSubmit={(value: string) => {
                updateField({...field, [type]: value}, 'cue');
                if (connected && Object.keys(connected).includes(type)) {
                    updateCue({...connected, [type]: value});
                }
                closeModal();
            }}/>
        );
    };

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
        },
        {
            title: 'Record cue',
            disabled: !selectedFixtures.length,
            callback: () => {
                createNewCue(selectedFixtures, field);
            }
        },
        {
            title: 'Delete cue',
            disabled: connected === null,
            callback: () => {
                if (connected) {
                    deleteCue(connected.id, false);
                    updateField({
                        id: field.id,
                        color: '',
                        img: ''
                    }, 'cue')
                }
            }
        }
    ];

    const setActiveCue = useCallback(() => {
        setSelectedCue(connected);
    }, []);

    const onUpdateCue = <Key extends keyof ICue, Value extends ICue[Key]>(key: Key, value: Value) => {
        if (connected !== null) {
            const toUpdate = { ...connected, [key]: value };
            console.log(toUpdate);
            //updatePattern(toUpdate);
        }
    };

    return (
        <div ref={drag}>
            <Field
                active={connected && connected.active}
                color={connected && field.color}
                name={connected && connected.name}
                img={connected && field.img}
                select={setActiveCue}
                callContext={() => {
                    setContextMenuOptions(contextOptions);
                }}
            />
            {isModalShown && <Modal
                isShown={isModalShown}
                closeModal={closeModal}
                noActions={true}
            >
                {modalContent}
            </Modal>}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedFixtures: getSelectedFixtures(state)
});

export default connect(mapStateToProps, {
    setContextMenuOptions,
    createNewCue,
    updateCue,
    updateField,
    setSelectedCue,
    deleteCue,
    createTimelineCue
})(CueFieldWrapper);
