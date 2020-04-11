import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IFixture, IPattern } from '../../../../types/fixtureTypes';
import {
    setFixturePattern,
    setSelectedFixturesPattern,
    updatePattern

} from '../../../store/fixturesReducer/fixturesActions';
import { IContextMenuOption } from '../../../../types/appTypes';
import { setContextMenuOptions } from '../../../store/appReducer/appActions';
import { useState } from 'react';
import FormsModal, { IInputField } from '../../common/modalContent/FormsModal';
import PickerModal from '../../common/modalContent/PickerModal';
import Modal from '../../common/ModalWrapper';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import Field from '../components/Field';
import { ICue } from '../../../../types/cuesTypes';
import { ICueField, IField, IPatternField } from '../../../../types/fieldsTypes';
import { getSelectedFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { createCue, createNewCue, setSelectedCue, updateCue } from '../../../store/cuesReducer/cuesActions';
import { isCueField } from '../../../store/fieldsReducer/fieldsReducer';
import { updateField } from '../../../store/fieldsReducer/fieldsActions';

interface IProps {
    field: ICueField | IField,
    selectedFixtures: IFixture[]
    createNewCue: (fixtures:IFixture[], field: IField) => void,
    updateCue: (cue: ICue) => void
    updateField: (field: IPatternField | ICueField) => void,
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
    setSelectedCue: (cue: ICue | null) => void
}

const CueFieldWrapper: React.FC<IProps> = ({
                                               field,
                                               selectedFixtures,
                                               createNewCue,
                                               updateCue,
                                               updateField,
                                               setContextMenuOptions,
                                               setSelectedCue,
                                           }) => {
    const [modalContent, setModalContent] = useState<any | null>();
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const connected = isCueField(field) ? field.connected : null;
    const [{ isDragging }, drag, preview] = useDrag({
        item: { name: connected ? connected.name : 'noname', type: 'CUE_FIELD' },
        end: (item: { name: string }
            | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && connected) {
                console.log(`You dropped ${item.name} into ${dropResult}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: (monitor => !!(connected && connected.id))
    });

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

                            //onUpdatePattern(f.title, f.value);
                        }
                    });
                    closeModal();
                }}
            />);
        setIsModalShown(true);
    };

    const showSelectModal = (type: keyof IField | keyof ICue) => {
        setIsModalShown(true);
        setModalContent(
            <PickerModal type={type} onSubmit={(value: string) => {
                closeModal();
            }}/>
        );
    };

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
        },
        {
            title: 'Record cue',
            disabled: !selectedFixtures.length,
            callback: () => {
                createNewCue(selectedFixtures, field);
            }
        }
    ];

    const setActiveCue = () => {
        setSelectedCue(connected);
    };

    const onUpdateCue = <Key extends keyof ICue, Value extends ICue[Key]>(key: Key, value: Value) => {
        if (connected !== null) {
            const toUpdate = { ...connected, [key]: value };
            console.log(toUpdate);
            //updatePattern(toUpdate);
        }
    };

    return (
        <div>
            <Field
                active={connected && connected.active}
                color={connected && field.color}
                name={item.name}
                img={item.img}
                select={setActiveCue}
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

const mapStateToProps = (state: RootState) => ({
    selectedFixtures: getSelectedFixtures(state)
});

export default connect(mapStateToProps, {
    setContextMenuOptions,
    createNewCue,
    updateCue,
    updateField,
    setSelectedCue
})(CueFieldWrapper);
