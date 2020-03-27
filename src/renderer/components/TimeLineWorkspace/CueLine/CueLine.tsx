import * as React from "react";
const baseUrl = require("../../assets/timecode.svg");

require('./TimeLine.scss');

const CueLine:React.FC = () => {
    const isOpen = false;

    return (
        <div className={'timelineBlock'}>
            { isOpen
                ? <div>opened</div>
                : <div className={'timelineCue'}>  </div>
            }
        </div>
    )
}

export default CueLine;
