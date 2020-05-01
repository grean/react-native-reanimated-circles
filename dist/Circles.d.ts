import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import CircularProgress from './CircularProgress';
export interface CirclesProps {
    margin: number | string;
    padding: number | string;
    data: CircleParams;
    rotation: number;
    strokeWidthDecoration: number;
    gradientInt: Array<StopGradient>;
    gradientExt: Array<StopGradient>;
    style: object;
    callback: (values: readonly number[]) => void;
    callbackInit: (values: readonly number[]) => void;
    canvasSize: number | undefined;
}
export interface CircleParams {
    strokeWidth: number;
    value: number;
    maxValue: number;
    negative: boolean;
    colors: Array<string>;
    textStyle: TextStyle;
    textDisplay: boolean;
}
export interface StopGradient {
    offset: string;
    stopColor: string;
}
export interface TextStyle {
    color: string;
    textAlign: "auto" | "center" | "left" | "right" | "justify" | undefined;
    fontSize: string;
}
export interface CirclesState {
    cpRef: React.RefObject<CircularProgress>;
    canvasSize: number | undefined;
    refreshKey: number;
}
export default class Circles extends React.Component<CirclesProps, CirclesState> {
    constructor(props: CirclesProps);
    onLayout: (event: LayoutChangeEvent) => void;
    render(): JSX.Element;
    static defaultProps: {
        margin: number;
        padding: number;
        data: {
            strokeWidth: number;
            value: number;
            maxValue: number;
            rotation: number;
            negative: boolean;
            colors: string[];
            textStyle: {};
            textDisplay: boolean;
        }[];
        gradientInt: {
            offset: string;
            stopColor: string;
        }[];
        gradientExt: {
            offset: string;
            stopColor: string;
        }[];
        style: {};
        callback: () => void;
        calbackInit: () => void;
    };
}
//# sourceMappingURL=Circles.d.ts.map