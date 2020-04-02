import * as React from "react";
import {connect} from "react-redux";
import CueLine from './CueLine/CueLine';
<<<<<<< HEAD
import { getTimelineBackground } from "../../assets/imageGetter";
=======
import { getTimeLineBackground } from '../../assets/imageGetter';
>>>>>>> b8e90f9dc8f403df44e533f8099616e4d14f5237

require('./TimeLine.scss');

const TimeLine:React.FC = () => {
    let cues = [{},{},{},{}];
    return (
<<<<<<< HEAD
        <div style={{backgroundImage: `url(${getTimelineBackground()})`}} className={'timelineBlock'}>
=======
        <div style={{backgroundImage: `url(${getTimeLineBackground()})`}} className={'timelineBlock'}>
>>>>>>> b8e90f9dc8f403df44e533f8099616e4d14f5237
                TIMELINE
            {cues.map((c, i) =>
                <CueLine key={'cue' + i} />
            )}
        </div>
    )
};

export default connect(null, null)(TimeLine);
