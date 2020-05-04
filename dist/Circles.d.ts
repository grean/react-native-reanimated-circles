import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import CircularProgress from './CircularProgress';
export interface CirclesProps {
    margin: number | string;
    padding: number | string;
    paddingBetween: number | string;
    strokeWidthDecoration: number | string;
    data: Array<CircleParams>;
    rotation: number;
    gradientInt: Array<StopGradient>;
    gradientExt: Array<StopGradient>;
    style: object;
    canvasSize: number | undefined;
    legendStyle: LegendTextStyle;
    textStyle: TextStyle;
}
export interface CircleParams {
    name: string;
    strokeWidth: number | string;
    value: number;
    valueOld: number;
    maxValue: number;
    negative: boolean;
    colors: Array<string>;
    textDisplay: boolean;
    displayValue: string;
    unit: string;
}
export interface StopGradient {
    offset: string;
    stopColor: string;
    stopOpacity: string;
}
export interface TextStyle {
    color: string;
    textAlign: "auto" | "center" | "left" | "right" | "justify" | undefined;
    fontSize: string;
}
export interface LegendTextStyle {
    color: string;
    fontSize: number | string;
    startOffset: string;
    fontWeight: string;
    textAnchor: "end" | "start" | "middle" | undefined;
    rotate: number;
    yOffset: number;
}
export interface CirclesState {
    cpRef: React.RefObject<CircularProgress>;
    canvasSize: number | undefined;
    refreshKey: number;
}
export default class Circles extends React.Component<CirclesProps, CirclesState> {
    constructor(props: CirclesProps);
    onLayout: (event: LayoutChangeEvent) => void;
    runTiming: (clock: Animated.Clock, value: number, dest: number) => Animated.Node<number>;
    computeParam: (param: string | number) => number;
    render(): JSX.Element;
    static defaultProps: {
        margin: number;
        padding: number;
        data: {
            strokeWidth: string;
            value: number;
            maxValue: number;
            rotation: number;
            negative: boolean;
            colors: string[];
            textDisplay: boolean;
        }[];
        textStyle: {};
        gradientInt: {
            offset: string;
            stopColor: string;
        }[];
        gradientExt: {
            offset: string;
            stopColor: string;
        }[];
        style: {};
    };
}
//# sourceMappingURL=Circles.d.ts.map