import * as React from "react";
import {connect} from "react-redux";
const baseUrl = require("../../assets/timecode.svg");

require('./TimeLine.scss');

const TimeLine:React.FC = () => {
    return (
        <div style={{backgroundImage: `url(${baseUrl})`}} className={'timelineBlock'}>
                TIMELINE
        </div>
    )
}

export default connect(null, null)(TimeLine)