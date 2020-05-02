import * as React from "react"
import { Sprite, useTick, Stage } from "@inlet/react-pixi";
import { IFixture } from "../../../../../types/fixtureTypes";


const width = 30
const height = 200

const Bunny = () => {
    const [i, setI] = React.useState(0)
    
    useTick(() => {
        setI((i: number) => i + 0.1);
    },i < 6)

    return (
        <Sprite
            y={height / 2 + Math.cos(i / 5) * 100}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        />
    )
}

export interface IProps {
    workTime: number,
    rectangel? : number,
    fixture :IFixture
}

const Fire: React.FC<IProps> = (props) => {
    
    return (
        <Stage width={width} height={height}>
            {(props.workTime > 3 && props.workTime < 4) &&
            <Bunny/>           
            }
        </Stage>
    )
};

export default Fire;
