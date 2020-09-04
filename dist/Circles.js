import React from 'react';
import { View, PixelRatio } from 'react-native';
import Animated from 'react-native-reanimated';
const { Clock, timing, startClock, clockRunning, stopClock, Value, block, debug, set, cond, onChange, call, eq, add, sub } = Animated;
import CircularProgress from './CircularProgress';
export default class Circles extends React.Component {
    constructor(props) {
        super(props);
        // setValue = (value: number) => {
        //   this.runTiming(this.state.clock, 0, value);
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
            this.setState({
                canvasSize: this.props.canvasSize ?? PixelRatio.roundToNearestPixel(Math.min(width, height)),
                refreshKey: Math.random(),
            });
        };
        this.runTiming = (clock, value, dest, configParams) => {
            const state = {
                finished: new Value(0),
                position: new Value(0),
                time: new Value(0),
                frameTime: new Value(0),
            };
            const config = {
                duration: configParams.duration,
                toValue: new Value(0),
                easing: configParams.easingFunction(configParams.easing),
            };
            return block([
                cond(clockRunning(clock), [
                    // if the clock is already running we update the toValue, in case a new dest has been passed in
                    set(config.toValue, dest),
                ], [
                    // if the clock isn't running we reset all the animation params and start the clock
                    set(state.finished, 0),
                    set(state.time, 0),
                    set(state.position, value),
                    set(state.frameTime, 0),
                    set(config.toValue, dest),
                    startClock(clock),
                ]),
                // we run the step here that is going to update position
                timing(clock, state, config),
                // if the animation is over we stop the clock
                // cond(state.finished, [
                //   debug('stop clock', stopClock(clock)),
                // ]),
                cond(state.finished, [
                    stopClock(clock)
                ]),
                // we made the block return the updated position
                state.position,
            ]);
        };
        this.computeParam = (param) => {
            const { canvasSize } = this.state;
            return typeof param === 'string' ? Number.parseFloat(param.replace('%', '')) / 100 * (canvasSize ?? 0) : param;
        };
        this.state = {
            cpRef: React.createRef(),
            canvasSize: props.canvasSize,
            refreshKey: Math.random(),
            oldValues: this.props.data.map(d => new Animated.Value(0))
        };
    }
    // centerLegendText = (legendLength: number) => legendLength * (-2 * Math.PI / 3 - 0.02) / 18;
    render() {
        const { margin, data, padding, gradientExt, gradientInt, style, rotation, paddingBetween, legendStyle, strokeWidthDecoration, textStyle, styleMargin, config, yOffset } = this.props;
        const { canvasSize, refreshKey, oldValues } = this.state;
        const marginComputed = this.computeParam(margin);
        const yOffsetComputed = this.computeParam(yOffset);
        const canvasSizeMarged = (canvasSize ?? 0) - marginComputed * 2;
        // const progressData = { ...data, ...{ strokeWidth: strokeWidthComputed } };
        // and use runTiming method defined above to create a node that is going to be mapped
        // to the translateX transform.
        const paddingBetweenComputed = this.computeParam(paddingBetween);
        const strokeWidthDecorationComputed = this.computeParam(strokeWidthDecoration);
        const circles = data.map((circle, i) => {
            const { strokeWidth, value, maxValue, negative, colors, textDisplay, name, displayValue } = circle;
            // const strokeWidthComputed = strokeWidth;
            const strokeWidthComputed = this.computeParam(strokeWidth);
            const paddingComputed = this.computeParam(padding) + i * strokeWidthComputed + ((i + 1) * paddingBetweenComputed) + strokeWidthDecorationComputed;
            const legendfontSizeComputed = this.computeParam(legendStyle.fontSize);
            const finalValue = this.runTiming(new Clock(), oldValues[i], value, config);
            oldValues[i].setValue(value);
            // const legendText = `${name} ${maxValue} ${unit}`;
            // const legendTextRotateZ = this.centerLegendText(legendText.length);
            return <CircularProgress key={i} {...{ canvasSize: canvasSizeMarged, strokeWidth: strokeWidthComputed, rotation, finalValue, maxValue, padding: paddingComputed, negative, colors, gradientInt, gradientExt, textStyle, textDisplay, legendFontSize: legendfontSizeComputed, legendColor: legendStyle.color, startOffset: legendStyle.startOffset, textAnchor: legendStyle.textAnchor, dy: legendStyle.yOffset, strokeWidthDecoration: strokeWidthDecorationComputed, displayValue, legendTextRotateZ: legendStyle.rotate, legendText: name, legendFontWeight: legendStyle.fontWeight, yOffset: yOffsetComputed }}/>;
        });
        return (<View style={[{
                flex: 1,
                alignSelf: 'stretch',
            }, style]}>
        <View onLayout={this.onLayout} style={[{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }, styleMargin]}>
          <View key={refreshKey} style={{
            height: canvasSizeMarged,
            width: canvasSizeMarged,
        }}>
            {circles}
          </View>
        </View>
      </View>);
    }
}
Circles.defaultProps = {
    margin: 0,
    padding: 0,
    data: [{
            strokeWidth: '20%',
            value: 0,
            maxValue: 100,
            rotation: -Math.PI / 2,
            negative: false,
            colors: ['#F0EFF5', '#00b5ad', '#DB2828'],
            textDisplay: true,
        }],
    textStyle: {},
    gradientInt: [{ offset: '50%', stopColor: '#000' }, { offset: '80%', stopColor: '#fff' }],
    gradientExt: [{ offset: '100%', stopColor: '#fff' }, { offset: '90%', stopColor: '#000' }],
    style: {},
    styleMargin: {},
    yOffset: 0,
};
//# sourceMappingURL=Circles.js.map