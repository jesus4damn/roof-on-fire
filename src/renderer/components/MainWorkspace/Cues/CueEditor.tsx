import * as React from "react";
import { updateCue } from '../../../store/cuesReducer/cuesActions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue } from '../../../store/cuesReducer/cuesSelector';
import { ICue, ICueAction } from '../../../../types/cuesTypes';
import ActionRow from './ActionRow';
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IContextMenuOption } from '../../../../types/appTypes';
import { setContextMenuOptions } from '../../../store/appReducer/appActions';

require('./CueEditor.scss');

interface IProps {
    selectedCue: ICue | null,
    updateCue: (cue: ICue) => void
    setContextMenuOptions: (payload: IContextMenuOption[]) => void
}

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'inherit',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? '#444444' : '#333333',
    width: "100%"
});
const reorder =  (list: ICueAction[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const CueEditor:React.FC<IProps> = ({selectedCue, updateCue, setContextMenuOptions}) => {
    const [{ isOver, canDrop, item }, drop] = useDrop({
        accept: [dragTypes.FIXTURE],
        drop: () => {
            return { cueType: 'CUE_REDACTOR', id: selectedCue ? selectedCue.id : '' }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            item: monitor.getItem()
        }),
    });

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination || !selectedCue) {
            return;
        }

        let part = (selectedCue.endTime - selectedCue.startTime) / (selectedCue.actions.length -1);
        if (selectedCue.actions[result.source.index] && selectedCue.actions[result.destination.index]) {
            updateCue({
                ...selectedCue,
                actions: reorder(selectedCue.actions, result.source.index, result.destination.index)
                    .map( (a, i) => i === 0 ? {...a, startTime: 0} : {...a, startTime: i * part})
            });
        }
    };

    const onCallContext = (id: string) => {
        setContextMenuOptions([
            {
                title: 'Delete Step',
                disabled: false,
                callback: () => {onDeletePattern(id)}
            }
        ])
    };

    const onDeletePattern = (id: string) => {
        if (!id || !selectedCue) {
            return;
        }
        let part = (selectedCue.endTime - selectedCue.startTime) / (selectedCue.actions.length -2);
        updateCue({...selectedCue, actions: selectedCue.actions.filter(act => act.id !== id)
                .map( (a, i) => i === 0 ? {...a, startTime: 0} : {...a, startTime: i * part})});
    };
    return (
        <div
            className="WrapCues"
            ref={drop}
            style={{backgroundColor: canDrop ? isOver ? '#3cd07a2e' : 'rgba(114,207,174,0.18)' : ""}}
        >
            <table className="TableCues">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <tbody
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >

                            <tr className="headerTableCues">
                                <td>№</td>
                                <td>Fixture</td>
                                <td>IMG pattern</td>
                                <td>Pattern</td>
                                <td>Time</td>
                                <td>Time between</td>
                                <td>Prefire</td>
                            </tr>

                            {selectedCue ? selectedCue.actions.map((a, i) =>
                                <Draggable
                                    key={a.id}
                                    draggableId={a.id}
                                    index={i}
                                >
                                    {(provided, snapshot) => {
                                        return (
                                            <tr
                                                className="headerTableCues-active"
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                style={getItemStyle(
                                                    provided.draggableProps.style,
                                                    snapshot.isDragging
                                                )}
                                                onContextMenu={() => {onCallContext(a.id)}}
                                            >
                                                <ActionRow
                                                    key={a.id}
                                                    index={i}
                                                    action={a}
                                                    onUpdate={(toUpdate: ICueAction) => {
                                                        updateCue({
                                                            ...selectedCue,
                                                            actions: selectedCue.actions
                                                                .map(ac => ac.id === toUpdate.id ? toUpdate : ac)
                                                        })
                                                    }}
                                                />
                                            </tr>
                                        );
                                    }}
                                </Draggable>
                            ) : null}
                            {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                </DragDropContext>
            </table>
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    selectedCue: getSelectedCue(state)
});

export default connect(mapStateToProps, { updateCue, setContextMenuOptions })(CueEditor)
