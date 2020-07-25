import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../../types/cuesTypes';
import { dragTypes } from '../../../../types/dragTypes';
import CueListItem from './CueListItem';
import { useDrop } from 'react-dnd';
import { setSelectedCue, updateCue } from '../../../store/cuesReducer/cuesActions';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

require('./CueList.scss');

interface IProps {
    cues: ICue[],
    musicTotalTime: number,
    selectedCue: ICue | null,
    setSelectedCue: (cue: ICue) => void
    updateCue: (cue: ICue) => void
}

const grid = 8;

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `${grid * 2}px 0`,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'inherit',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? '#444444' : '#333333',
    width: "100%"
});


const CueList: React.FC<ConnectedProps<IProps>> = ({ cues, selectedCue, setSelectedCue, updateCue }: IProps) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [dragTypes.CUE_FIELD, dragTypes.FIXTURE],
        drop: () => ({ cueList: 'CUELIST', startTime: getLastCueTime() }),
        canDrop: () => {
            return true;
        },//onDropPattern(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });
    const getLastCueTime = (): number => {
        if (cues.length && cues[cues.length - 1].startTime) {
            return +(+cues[cues.length - 1].startTime + 1).toFixed();
        } else {
            return 2;
        }
    };
    const setSelectedCueCallback = useCallback(cue => setSelectedCue(cue), []);
    const updateCueCallback = useCallback(cue => updateCue(cue), []);

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const from = cues[result.source.index];
        const to = cues[result.destination.index];

        if (from.id && to.id) {
            updateCueCallback({...from, startTime: to.startTime, endTime: to.startTime + (from.endTime - from.startTime)});
            updateCueCallback({...to, startTime: from.startTime, endTime: from.startTime + (to.endTime - to.startTime)});
        }
    };

    return (
        <div className="WrapCuesList">
            <div className="WrapCues" ref={drop}>
               <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    className={`TableCuesList ${canDrop && isOver ? 'TableCuesList-active' : ''}`}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >

                                <div className="headerTableCuesList">
                                    <span>№</span>
                                    <span>Cue</span>
                                    <span>Start time</span>
                                    <span>Total time</span>
                                    <span>Offset</span>
                                    <span>Type</span>
                                </div>

                                {cues.map((cue: ICue, index: number) => (
                                    <Draggable
                                        key={cue.id}
                                        draggableId={cue.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    style={getItemStyle(
                                                        provided.draggableProps.style,
                                                        snapshot.isDragging
                                                    )}
                                                >
                                                    <CueListItem
                                                        key={cue.id}
                                                        cue={cue} index={index}
                                                        selected={selectedCue && selectedCue.id === cue.id}
                                                        setSelectedCue={setSelectedCueCallback}
                                                        updateCue={updateCueCallback}
                                                    />
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

            </div>


            <div className="WrapEffect">
                <button className="EffectBt">Effect</button>
                <div className="EffectItem">
                    <span>
                    Offset
                    </span>
                    <span>
                        1
                    </span>
                </div>
                <div className="EffectItem">
                    <span>
                    Time
                    </span>
                    <span>
                        5
                    </span>
                </div>
                <button>Forward</button>
                <button>Backward</button>
                <button>Inside</button>
                <button>Outside</button>
                <button>Mirror</button>
                <div className="EffectWrapTest">
                    <span className="EffectItemTest">
                    Test
                    </span>
                    <div className="Effecttest">
                        <span className="Effecttest-active"></span>
                        <span></span>
                        <span></span>
                        <span className="Effecttest-active"></span>
                        <span className="Effecttest-error"></span>
                        <span></span>
                        <span className="Effecttest-active"></span>
                        <span></span>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    selectedCue: getSelectedCue(state),
    musicTotalTime: state.app.musicTotalTime
});

export default connect(mapStateToProps, { setSelectedCue, updateCue })(CueList);
