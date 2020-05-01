import * as React from "react"
import { Sprite, useTick, Stage } from "@inlet/react-pixi";


const width = 30
const height = 400
const backgroundColor = 0x1d2330
let time = 0

const Bunny = () => {
    const [i, setI] = React.useState(0)
    
    useTick(() => {
        setI((i: number) => i + 0.1);
    },true)

    return (
        <Sprite
            y={height / 2 + Math.cos(i / 5) * 100}
            //x={height / 2 + Math.cos(i / 5) * 100}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        />
    )
}

export interface IProps {
    workTime?: number,
    rectangel? : number,
}

const Fire: React.FC<IProps> = () => {
    return (
        <Stage width={width} height={height}>
            <Bunny/>
        </Stage>
    )
};

export default Fire;
