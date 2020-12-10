import { RootState } from '../rootReducer';
import { ICue, ICueLineCue } from '../../../types/cuesTypes';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export const getSelectedCue = (state:RootState):ICue | null => state.cues.selectedCue;

export const getTimelineCues = (state:RootState):ICue[] => state.cues.timelineCues;

export const getCueById = (state:RootState, cueId: string):ICue => {
  let idx = _.findIndex(state.cues.timelineCues, {id: cueId})
    return state.cues.timelineCues[idx];
}

export const getTimelineCuesTimes = createSelector([getTimelineCues], (cues:ICue[]):ICueLineCue[] => {
  return cues.map(c => ({
    id: c.id,
    startTime: c.startTime,
    endTime: c.endTime,
    actions: c.actions
  }))
})

export const getTimelineCueById = createSelector([getCueById], (cue:ICue):ICueLineCue => {
  return {
    id: cue.id,
    startTime: cue.startTime,
    endTime: cue.endTime,
    actions: cue.actions
  };
})
