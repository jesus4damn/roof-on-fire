import * as React from "react";
import {connect} from "react-redux";
import ExcelReader from "../../../data-helper/ExcelReader";

require('./Header.scss');

interface IProps {
    resetData: () => void
    loadData: () => void
    saveData: () => void
}

const Header:React.FC<IProps> = ({resetData, loadData, saveData}) => {
    return (
        <>
        <div className={'headerContent'}>
            <button onClick={resetData}>resetState</button>
            <button onClick={loadData}>loadData</button>
            <button onClick={saveData}>saveData</button>          
        </div>
        
         <ExcelReader/>
         </>
    )
};

export default connect(null, null)(Header)
