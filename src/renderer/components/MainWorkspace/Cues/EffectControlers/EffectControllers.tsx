import * as React from 'react';
import { ICue } from '../../../../../types/cuesTypes';

require('./EffectControllers.scss');

interface IProps {
  selectedCue: ICue | null,
  reorderOnEffect: (cue: ICue, direction: TEffects) => void
}

export type TEffects = 'Forward' | 'Backward' | 'Inside' | 'Outside' | 'Together';
export const effects: TEffects[] = ['Forward', 'Backward', 'Inside', 'Outside', 'Together'];


const EffectControllers: React.FC<IProps> = ({ selectedCue, reorderOnEffect }) => {
  const disabled = !selectedCue || !selectedCue.actions.length;

  const callReorder = (effName: TEffects) => {
    if (!disabled && selectedCue) {
      reorderOnEffect(selectedCue, effName);
    }
  };

  return (
    <div className="WrapEffect">
      {/*<button className="EffectBt">Effect</button>*/}
      <div className="EffectItem">
        <span>Offset</span>
        <span>{selectedCue?.startTime}</span>
      </div>
      <div className="EffectItem">
        <span>Time</span>
        <span>{selectedCue ? (selectedCue?.startTime - selectedCue?.endTime).toFixed(2) : ''}</span>
      </div>
      {effects.map(e =>
        <button key={e} onClick={() => callReorder(e)}>{e}</button>
      )}
      {/*<div className="EffectWrapTest">
                    <span className="EffectItemTest">
                    Example
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

      </div>*/}
    </div>
  );
};

export default EffectControllers;
