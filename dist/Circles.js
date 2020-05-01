import React from 'react';
import { View } from 'react-native';
import CircularProgress from './CircularProgress';
export default class Circles extends React.Component {
    constructor(props) {
        super(props);
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
        this.onLayout = (event) => {
            const { width, height } = event.nativeEvent.layout;
            // this.setState({
            //   canvasSize: this.props.canvasSize ?? PixelRatio.roundToNearestPixel(Math.min(width, height)),
            //   refreshKey: Math.random(),
            // });
        };
        this.state = {
            cpRef: React.createRef(),
            canvasSize: props.canvasSize,
            refreshKey: Math.random(),
        };
    }
    render() {
        const { margin, data, padding, gradientExt, gradientInt, callback, style, callbackInit, rotation } = this.props;
        // const { margin, strokeWidth, rotation, value, maxValue, padding, strokeWidthDecoration, negative, colors, gradientExt, gradientInt, textStyle, textDisplay, callback, style, callbackInit } = this.props;
        const { cpRef, canvasSize, refreshKey } = this.state;
        const { strokeWidth } = data;
        const marginComputed = typeof margin === 'string' ? Number.parseFloat(margin.replace('%', '')) / 100 * (canvasSize ?? 0) : margin;
        const paddingComputed = typeof padding === 'string' ? Number.parseFloat(padding.replace('%', '')) / 100 * (canvasSize ?? 0) : padding;
        // const strokeWidthComputed = typeof strokeWidth === 'string' ? Number.parseFloat(strokeWidth.replace('%', '')) / 100 * (canvasSize ?? 0) : strokeWidth
        const canvasSizeMarged = (canvasSize ?? 0) - marginComputed * 2;
        // const progressData = { ...data, ...{ strokeWidth: strokeWidthComputed } };
        return (<View style={[{
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
            <CircularProgress key={refreshKey.toString()} ref={cpRef} {...{ canvasSize: canvasSizeMarged, data, rotation, padding: paddingComputed, gradientInt, gradientExt, callback, callbackInit }}/>
          </View>
        </View>
      </View>);
    }
}
Circles.defaultProps = {
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
//# sourceMappingURL=Circles.js.map