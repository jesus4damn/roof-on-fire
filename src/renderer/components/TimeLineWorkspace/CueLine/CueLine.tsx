import * as React from "react";

require('./CueLine.scss');

const CueLine:React.FC = () => {
    const isOpen = false;

    return (
        <div className={'timelineCue'}>
            { isOpen
                ? <div>opened</div>
                : <div>closed</div>
            }
        </div>
    )
};

export default CueLine;
