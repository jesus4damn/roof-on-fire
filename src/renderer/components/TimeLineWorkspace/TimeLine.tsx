import * as React from "react";
import {connect} from "react-redux";

require('./TimeLine.scss');

const TimeLine:React.FC = () => {
    return (
        <div className={'timelineBlock'}>
            <h2>
                TIMELINE
            </h2>
        </div>
    )
}

export default connect(null, null)(TimeLine)