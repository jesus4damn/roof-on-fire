import * as React from "react";
import {connect} from "react-redux";

const Output:React.FC = () => {
    return (
        <div>
            <h2>
                Output
            </h2>
        </div>
    )
};

export default connect(null, null)(Output)
