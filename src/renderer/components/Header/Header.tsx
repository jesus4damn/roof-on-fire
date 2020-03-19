import * as React from "react";
import {connect} from "react-redux";

require('./Header.scss')

const Header:React.FC = () => {
    return (
        <div className={'headerContent'}>
            <h2>
                roof on fire
            </h2>
        </div>
    )
}

export default connect(null, null)(Header)