import React from 'react';
import { View, LayoutChangeEvent, PixelRatio } from 'react-native';

import CircularProgress from './CircularProgress';

export interface CirclesProps {
  margin: number | string;
  padding: number | string;
  data: CircleParams;
  // data: Array<CircleParams>;
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
  canvasSize: number | undefined,
  refreshKey: number,
}

export default class Circles extends React.Component<CirclesProps, CirclesState> {
  constructor(props: CirclesProps) {
    super(props);
    this.state = {
      cpRef: React.createRef<CircularProgress>(),
      canvasSize: props.canvasSize,
      refreshKey: Math.random(),
    }
  }

  // setValue = (val: number) => {
  //   if (this.state.cpRef.current !== null) {
  //     this.state.cpRef.current.setValue(val)
  //   };
  // }

  // initKnob = () => {
  //   if (this.state.cpRef.current !== null) {
  //     this.state.cpRef.current.initKnob();
  //   };
  // };

  // resetInit = () => {
  //   if (this.state.cpRef.current !== null) {
  //     this.state.cpRef.current.resetInit();
  //   }
  // }

  onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    // this.setState({
    //   canvasSize: this.props.canvasSize ?? PixelRatio.roundToNearestPixel(Math.min(width, height)),
    //   refreshKey: Math.random(),
    // });
  }

  render() {
    const { margin, data, padding, gradientExt, gradientInt, callback, style, callbackInit, rotation } = this.props;
    // const { margin, strokeWidth, rotation, value, maxValue, padding, strokeWidthDecoration, negative, colors, gradientExt, gradientInt, textStyle, textDisplay, callback, style, callbackInit } = this.props;
    const { cpRef, canvasSize, refreshKey } = this.state;
    const { strokeWidth } = data;


    const marginComputed = typeof margin === 'string' ? Number.parseFloat(margin.replace('%', '')) / 100 * (canvasSize ?? 0) : margin
    const paddingComputed = typeof padding === 'string' ? Number.parseFloat(padding.replace('%', '')) / 100 * (canvasSize ?? 0) : padding
    // const strokeWidthComputed = typeof strokeWidth === 'string' ? Number.parseFloat(strokeWidth.replace('%', '')) / 100 * (canvasSize ?? 0) : strokeWidth

    const canvasSizeMarged = (canvasSize ?? 0) - marginComputed * 2;
    // const progressData = { ...data, ...{ strokeWidth: strokeWidthComputed } };

    return (
      <View style={[{
        flex: 1,
        alignSelf: 'stretch',
      }, style]}>
        <View onLayout={this.onLayout} style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            height: canvasSizeMarged,
            width: canvasSizeMarged,
          }}>
            <CircularProgress
              key={refreshKey.toString()}
              ref={cpRef}
              {...{ canvasSize: canvasSizeMarged, data, rotation, padding: paddingComputed, gradientInt, gradientExt, callback, callbackInit }}
            // {...{ canvasSize: canvasSizeMarged, strokeWidth: strokeWidthComputed, rotation, value, maxValue, padding: paddingComputed, strokeWidthDecoration, negative, colors, gradientInt, gradientExt, textStyle, textDisplay, callback, callbackInit }}
            />
          </View>
        </View>
      </View >
    );
  }
  static defaultProps = {
    margin: 0,
    padding: 0,
    data: [{
      strokeWidth: 20,
      // strokeWidth: '20%',
      value: 0,
      maxValue: 100,
      rotation: -Math.PI / 2,
      negative: false,
      colors: ['#F0EFF5', '#00b5ad', '#DB2828'],
      textStyle: {},
      textDisplay: true,
    }],
    // strokeWidthDecoration: 30,
    gradientInt: [{ offset: '50%', stopColor: '#000' }, { offset: '80%', stopColor: '#fff' }],
    gradientExt: [{ offset: '100%', stopColor: '#fff' }, { offset: '90%', stopColor: '#000' }],
    style: {},
    callback: () => { },
    calbackInit: () => { },
  };
}
