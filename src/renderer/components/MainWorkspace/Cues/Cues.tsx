import * as React from "react";
import {connect} from "react-redux";

require('./Cues.scss');

const Cues:React.FC = () => {
    return (
        <div className="WrapCues">            
            <table className="TableCues">
                <tr className="headerTableCues">
                    <td>№</td>
                    <td>Fixture</td>
                    <td>IMG pattern</td>
                    <td>Pattern</td>
                    <td>Time</td>
                    <td>Time between</td>
                    <td>Prefire</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Fire 1</td>
                    <td><img src="src/renderer/assets/no_img-block-right.svg" alt=""/></td>
                    <td>22</td>
                    <td>0</td>
                    <td>2</td>
                    <td>0.02</td>
                </tr>
                <tr className="headerTableCues-active">
                    <td>1</td>
                    <td>Fire 1</td>
                    <td><img src="src/renderer/assets/no_img-block-right.svg" alt=""/></td>
                    <td>22</td>
                    <td>0</td>
                    <td>2</td>
                    <td>0.02</td>
                </tr>
            </table>
        </div>
    )
};

export default connect(null, null)(Cues)
