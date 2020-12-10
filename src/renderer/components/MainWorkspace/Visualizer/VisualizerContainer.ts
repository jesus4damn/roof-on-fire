import { connect } from 'react-redux';

import Visualizer from './Visualizer';
import { RootState } from '../../../store/rootReducer';
import { getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { addFixturesToCue } from '../../../store/cuesReducer/cuesActions';

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value,
    fixtures: getFixtures(state)
});

export default connect(mapStateToProps, { updateFixture, addFixturesToCue})(Visualizer);
