import * as React from "react";
import {connect} from "react-redux";
require('./CueList.scss');

const CueList:React.FC = () => {
    return (
        <div className="WrapCuesList">
        <div className="WrapCuesListTable">
        <table className="TableCuesList">
                    <tr className="headerTableCuesList">
                        <td>№</td>
                        <td>Cue</td>
                        <td>Start time</td>
                        <td>Total time</td>
                        <td>Offset</td>
                        <td>Type</td>
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

        <div className="WrapEffect">
                <button className="EffectBt">Effect</button>
                <div className="EffectItem">
                    <span>
                    Offset
                    </span>
                    <span>
                        1
                    </span>
                </div>
                <div className="EffectItem">
                    <span>
                    Time
                    </span>
                    <span>
                        5
                    </span>
                </div>
                <button>Forward</button>
                <button>Backward</button>
                <button>Inside</button>
                <button>Outside</button>
                <button>Mirror</button>
                <div className="EffectWrapTest">
                    <span className="EffectItemTest">
                    Test
                    </span>
                    <div className="Effecttest">
                         <span className="Effecttest-active"></span>
                         <span></span>
                         <span></span>
                         <span className="Effecttest-active"></span>
                         <span className="Effecttest-error"></span>
                         <span></span>
                         <span className="Effecttest-active"></span>
                         <span></span>
                     </div>

                </div>
            </div>
    </div>

    )
};

export default connect(null, null)(CueList)
