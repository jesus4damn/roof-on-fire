import * as React from "react";
import { connect, useSelector } from 'react-redux';
import { patchFixtures } from '../../store/fixturesReducer/fixturesActions';
import { RootState } from '../../store/rootReducer';
import { TFixturesTypes } from '../../../types/fixtureTypes';

interface IProps {
    patchFixtures: (payload: {count: number, fixtureType: TFixturesTypes}) => Promise<void>
}
interface ISelectorProps {
    fixtureTypes: TFixturesTypes[],
}

const Patch:React.FC<IProps> = ({patchFixtures}:IProps) => {
    const {fixtureTypes}: ISelectorProps = useSelector( (state: RootState) => ({fixtureTypes: state.fixtures.fixtureTypes}));
    return (
        <div className="patchWrapper">
            <h2>
                Patch
            </h2>
            <div className="typesWrapper">
                {fixtureTypes.map((t, i) =>
                    <div key={t + i}>{t}</div>
                )}
            </div>
        </div>
    )
};

export default connect(null, {patchFixtures})(Patch)
