import React from 'react';
import Animated from 'react-native-reanimated';
import { StopGradient, TextStyle } from './Circles';
interface CircularPogressProps {
    canvasSize: number;
    padding: number;
    strokeWidth: number;
    strokeWidthDecoration: number;
    finalValue: Animated.Node<number>;
    maxValue: number;
    negative: boolean;
    colors: Array<string>;
    textStyle: TextStyle;
    textDisplay: boolean;
    rotation: number;
    gradientInt: Array<StopGradient>;
    gradientExt: Array<StopGradient>;
    legendFontSize: number;
    startOffset: string;
    textAnchor: "end" | "start" | "middle" | undefined;
    legendColor: string;
    displayValue: string;
    legendText: string;
    legendFontWeight: string;
    legendTextRotateZ: number;
    dy: number;
    yOffset: number;
}
interface CircularPogressState {
    cx: number;
    cy: number;
    r: number;
    plateRadius: number;
    canvasRadius: number;
    startAngle: Animated.Value<number>;
    endAngle: Animated.Value<number>;
    α: Animated.Value<number>;
    startX: number;
    startY: number;
    endX: Animated.Value<number>;
    endY: Animated.Value<number>;
    x: Animated.Value<number>;
    y: Animated.Value<number>;
    aroundCount: Animated.Value<number>;
    previousAngle: Animated.Value<number>;
    translateX: Animated.Value<number>;
    translateY: Animated.Value<number>;
    largeArcFlag: Animated.Value<number>;
    isNegative: Animated.Value<0 | 1>;
    previousIsNegative: Animated.Value<0 | 1>;
    sweep: string;
    counterclockwise: Animated.Value<0 | 1>;
    init: Animated.Value<0 | 1>;
    rapport: Animated.Value<number>;
    mantisse: Animated.Value<number>;
}
export default class CircularProgress extends React.Component<CircularPogressProps, CircularPogressState> {
    constructor(props: CircularPogressProps);
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=CircularProgress.d.ts.map