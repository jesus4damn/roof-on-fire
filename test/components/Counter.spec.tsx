import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Visualizer from '../../src/renderer/components/MainWorkspace/Visualizer/Visualizer';

describe('Visualizer component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Visualizer value={1} incrementValue={jest.fn()} decrementValue={jest.fn()} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
