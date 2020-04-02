import * as React from "react";
import {connect} from "react-redux";
import CueLine from './CueLine/CueLine';
import { getTimelineBackground } from "../../assets/imageGetter";

require('./TimeLine.scss');

const TimeLine:React.FC = () => {
    let cues = [{},{},{},]
    return (
        <div style={{backgroundImage: `url(${getTimelineBackground()})`}} className={'timelineBlock'}>
                TIMELINE
            {cues.map((c, i) =>
                <CueLine key={'cue' + i} />
            )}
        </div>
    )
};

export default connect(null, null)(TimeLine);
