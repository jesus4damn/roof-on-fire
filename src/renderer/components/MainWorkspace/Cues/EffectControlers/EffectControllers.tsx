import * as React from 'react';
import { connect } from 'react-redux';
import { updateCue } from '../../../../store/cuesReducer/cuesActions';
import { RootState } from '../../../../store/rootReducer';
import { getSelectedCue } from '../../../../store/cuesReducer/cuesSelector';
import { ICue, ICueAction } from '../../../../../types/cuesTypes';
import { useState } from 'react';

require('./EffectControllers.scss');

interface IProps {
    selectedCue: ICue | null,
    reorderOnEffect: (cue: ICue, direction: TEffects) => void
}

export type TEffects = 'Forward' | 'Backward' | 'Inside' | 'Outside';
export const effects: TEffects[] = ['Forward', 'Backward', 'Inside', 'Outside'];


const EffectControllers: React.FC<IProps> = ({ selectedCue, reorderOnEffect }) => {
    const disabled = !selectedCue || !selectedCue.actions.length;

    const callReorder = (effName: TEffects) => {
        if (!disabled && selectedCue) {
            reorderOnEffect(selectedCue, effName);
        }
    };

    return (
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
            {effects.map(e =>
                <button key={e} onClick={() => callReorder(e)}>{e}</button>
            )}
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
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedCue: getSelectedCue(state)
});

export default EffectControllers;
