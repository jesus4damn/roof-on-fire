import * as React from "react";
import {connect} from "react-redux";

const Fixtures:React.FC = () => {
    return (
        <div>
            <h2>
                Fixtures
            </h2>
        </div>
    )
};

export default connect(null, null)(Fixtures)
