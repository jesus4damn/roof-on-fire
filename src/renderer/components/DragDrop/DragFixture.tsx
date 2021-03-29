import * as React from 'react';
import { useCallback } from 'react';
import { DragSourceMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { dragTypes } from '../../../types/dragTypes';
import { IFixture } from '../../../types/fixtureTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addFixturesToCue, createNewCue } from '../../store/cuesReducer/cuesActions';
import { getFixtureById } from '../../store/fixturesReducer/fixturesSelector';

interface IFixtureProps {
  fixtureId: string
  children?: JSX.Element | JSX.Element[];
  updateFixturePosition:(id:string,x:number,y:number) => void
}

const DragFixture: React.FC<IFixtureProps> = ({ fixtureId, children }: IFixtureProps) => {
  const selector = useCallback(state => getFixtureById(state, fixtureId),[fixtureId]);
  const fixture: IFixture = useSelector(selector);
  const dispatch = useDispatch();
  const [{}, drag] = useDrag({
    item: { id: fixture.selected ? fixture.id : 'noId', type: dragTypes.FIXTURE },
    end: (item: { id: string }
      | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      console.log(item,fixture.selected);
      if (item && fixture.selected) {
        if (dropResult && dropResult.cueType && item.id) {
          dispatch(addFixturesToCue())
          console.log(dropResult);
          console.log(`You dropped ${item.id} into ${dropResult.cueType}!`);
        }
        if (dropResult && dropResult.cueList === "CUE_TIMELINE" && item.id) {
          dispatch(createNewCue(null, dropResult.startTime ? dropResult.startTime : 0));
          console.log(`You dropped ${item.id} into ${dropResult.cueList}!`);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    canDrag: (monitor => !!(fixture.selected && fixture.activePattern && fixture.activePattern.id))
  });

  return (
    <div ref={drag}>
      {children}
    </div>
  );
};
export default DragFixture;

