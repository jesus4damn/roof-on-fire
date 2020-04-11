import { RootState } from '../rootReducer';
import { ICue } from '../../../types/cuesTypes';

export const getSelectedCue = (state:RootState):ICue | null => state.cues.selectedCue;
