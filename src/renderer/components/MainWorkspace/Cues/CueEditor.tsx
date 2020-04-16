import * as React from "react";
import { updateCue } from '../../../store/cuesReducer/cuesActions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue } from '../../../store/cuesReducer/cuesSelector';
import { ICue, ICueAction } from '../../../../types/cuesTypes';
import ActionRow from './ActionRow';


require('./CueEditor.scss');

interface IProps {
    selectedCue: ICue | null,
    updateCue: (cue: ICue) => void
}

const CueEditor:React.FC<IProps> = ({selectedCue, updateCue}) => {

    return (
        <div className="WrapCues">
            <table className="TableCues">
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
                    ) : null}
            </table>
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    selectedCue: getSelectedCue(state)
});

export default connect(mapStateToProps, { updateCue })(CueEditor)
