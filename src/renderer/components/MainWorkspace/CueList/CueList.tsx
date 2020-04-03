import * as React from "react";
import {connect} from "react-redux";
require('./CueList.scss');

const CueList:React.FC = () => {
    return (
        <div className="WrapCuesList">
        <table className="TableCuesList">
            <tr className="headerTableCuesList">
                <td>№</td>
                <td>Cue</td>
                <td>Start time</td>
                <td>Total time</td>
                <td>Offset</td>
                <td>Type</td>
                <td>Type 9 ne mogu zvonit'</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Global offset</td>
                <td>0</td>
                <td>0</td>
                <td>2s</td>
                <td className="headerTableCuesList-dmx">dmx</td>
            </tr>
            <tr >
                <td>1</td>
                <td>Fire 1</td>
                <td>5</td>
                <td>22</td>
                <td>1s</td>
                <td className="headerTableCuesList-dmx">dmx</td>
            </tr>
            <tr >
                <td>1</td>
                <td>Fire 1</td>
                <td>3</td>
                <td>22</td>
                <td>1s</td>
                <td className="headerTableCuesList-dmx">dmx</td>
            </tr>
            <tr className="headerTableCuesList-active">
                <td>1</td>
                <td>Fire 1</td>
                <td>1</td>
                <td>22</td>
                <td>1s</td>
                <td className="headerTableCuesList-hex">hex</td>
            </tr>
        </table>
    </div>
    )
};

export default connect(null, null)(CueList)
