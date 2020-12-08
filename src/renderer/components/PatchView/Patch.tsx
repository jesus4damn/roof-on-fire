import * as React from "react";
import { connect, useSelector } from 'react-redux';
import { patchFixtures } from '../../store/fixturesReducer/fixturesActions';
import { RootState } from '../../store/rootReducer';
import { TFixturesTypes } from '../../../types/fixtureTypes';
import Accordeon from '../common/Accordeon/Accordeon';
import "./Patch.scss";
import { useState } from 'react';

interface IProps {
    patchFixtures: (payload: {count: number, fixtureType: TFixturesTypes}) => Promise<void>
}
interface ISelectorProps {
    fixtureTypes: TFixturesTypes[],
}

const Patch:React.FC<IProps> = ({patchFixtures}:IProps) => {
    const {fixtureTypes}: ISelectorProps = useSelector( (state: RootState) => ({fixtureTypes: state.fixtures.fixtureTypes}));
    const [selectedType, setSelectedType] = useState(false);

    return (
        <div className="patchWrapper">
            <h2>
            Device library
            </h2>
            <div className="DeviceLibraryWrapper">
              <Accordeon headerTitle={"Crazy Flame Mod 1"} selected={selectedType} onClick={(val) => setSelectedType(val)}>
                  <div className="typesWrapper">
                    <div>Crazy Flame</div>
                  </div>
              </Accordeon>

            </div>

            <div className={"patchControlsWrapper"}>
              <span>{selectedType ? 'Crazy Flame' : ''}</span>
                <div className={"rowWrapper"}>
                    <div className={"row"}><div><span>Address</span></div>
                    <input type="number" /></div>
                    <div className={"row"}><div><span>Quantity</span></div>
                    <input type="number" /></div>
                    <div className={"row"}><div><span>Address gap</span></div>
                    <input type="number" /></div>
                    
                    
                    
                </div>
                <div className={"rowBtn"}>
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default connect(null, {patchFixtures})(Patch)
