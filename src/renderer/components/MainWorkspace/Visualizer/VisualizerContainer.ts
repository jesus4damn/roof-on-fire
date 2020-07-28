import { connect } from 'react-redux';

import Visualizer from './Visualizer';
import { RootState } from '../../../store/rootReducer';
import { getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { setAllowAPI } from '../../../store/appReducer/appActions';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { addFixturesToCue } from '../../../store/cuesReducer/cuesActions';

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value,
    allowedAPI: state.app.allowedAPI,
    fixtures: getFixtures(state)
});

export default connect(mapStateToProps, {setAllowAPI, updateFixture, addFixturesToCue})(Visualizer);
