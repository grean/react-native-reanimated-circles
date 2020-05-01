import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, Stop, Path, Circle, RadialGradient } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { ReText, string, interpolateColor } from 'react-native-redash';
const { multiply, Value, event, block, debug, set, sub, add, atan, divide, cos, sin, cond, concat, eq, tan, round, abs, and, or, onChange, call, neq } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
// const AnimatedText = Animated.createAnimatedComponent(Text);
// Animated.addWhitelistedNativeProps({ stroke: true });
// const AnimatedStop = Animated.createAnimatedComponent(Stop);
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
// const AnimatedStop = Animated.createAnimatedComponent(Stop);
// const AnimatedText = Animated.createAnimatedComponent(Text);
export default class CircularProgress extends React.Component {
    constructor(props) {
        super(props);
        this.setValue = (value) => {
            const { data } = this.props;
            const { maxValue } = data;
            const { endAngle, aroundCount, isNegative } = this.state;
            const { PI } = Math;
            const isNegativeValue = value < 0 ? 1 : 0;
            let rapport = Math.abs(value / maxValue);
            let aroundCountValue = Math.trunc(rapport);
            let mantisse = rapport - aroundCountValue;
            let endAngleValue = 2 * PI * mantisse;
            if (isNegativeValue) {
                endAngleValue -= 2 * PI;
            }
            aroundCount.setValue(aroundCountValue);
            isNegative.setValue(isNegativeValue);
            endAngle.setValue(Math.abs(endAngleValue));
        };
        this.initKnob = () => {
            this.state.init.setValue(1);
        };
        this.resetInit = () => {
            this.state.init.setValue(0);
        };
        const { PI } = Math;
        const { canvasSize, data, padding } = this.props;
        const { strokeWidth, value, maxValue } = data;
        const startAngle = 0;
        const cx = canvasSize / 2;
        const cy = canvasSize / 2;
        const r = (canvasSize - strokeWidth) / 2 - padding;
        const isNegativeValue = value < 0 ? 1 : 0;
        let rapport = Math.abs(value / maxValue);
        let aroundCountValue = Math.trunc(rapport);
        let mantisse = rapport - aroundCountValue;
        let endAngleValue = 2 * PI * mantisse;
        if (isNegativeValue) {
            endAngleValue -= 2 * PI;
        }
        this.state = {
            ...{ cx, cy, r },
            plateRadius: canvasSize / 2,
            canvasRadius: canvasSize / 2,
            startAngle: new Value(startAngle),
            endAngle: new Value(Math.abs(endAngleValue)),
            α: new Value(0),
            startX: cx + r * Math.cos(startAngle),
            startY: cy + r * Math.sin(startAngle),
            endX: new Value(0),
            endY: new Value(0),
            x: new Value(0),
            y: new Value(0),
            aroundCount: new Value(aroundCountValue),
            finalValue: new Value(0),
            previousAngle: new Value(0),
            deltaSign: new Value(0),
            translateX: new Value(0),
            translateY: new Value(0),
            largeArcFlag: new Value(0),
            sweep: '1',
            isNegative: new Value(isNegativeValue),
            isNegativeChanged: new Value(0),
            previousIsNegative: new Value(isNegativeValue),
            counterclockwise: new Value(0),
            init: new Value(0),
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    // const [gradientIndex, setGradientIndex] = useState(0);
    render() {
        const { PI } = Math;
        // const { margin } = this.props;
        const { canvasSize, data, gradientInt, gradientExt, callback, callbackInit, rotation } = this.props;
        const { strokeWidth, negative, colors, maxValue, textStyle, textDisplay } = data;
        const { x, y, cx, cy, r, startAngle, endAngle, canvasRadius, translateX, translateY, α, largeArcFlag, endX, endY, deltaSign, aroundCount, previousAngle, finalValue, plateRadius, sweep, startX, startY, isNegative, isNegativeChanged, previousIsNegative, counterclockwise, init } = this.state;
        const fontSizePercent = textStyle.fontSize === undefined ? 0.125 : Number.parseFloat(textStyle.fontSize.replace('%', '')) / 100;
        const fontSize = Math.round(canvasSize * fontSizePercent);
        const textStyleComputed = { ...{ color: 'white', textAlign: 'center' }, ...textStyle, ...{ fontSize } };
        // isLandscape, 
        const bgColor = interpolateColor(aroundCount, {
            inputRange: colors.map((v, i) => i),
            outputRange: colors,
        });
        let fgColorsTmp = [...colors];
        fgColorsTmp.shift();
        const fgColor = interpolateColor(aroundCount, {
            inputRange: fgColorsTmp.map((v, i) => i),
            outputRange: fgColorsTmp,
        });
        //for Animated.View rotation
        const rotateZ = concat(rotation, 'rad');
        const rotateZText = concat(multiply(rotation, -1), 'rad');
        // const grads = gradients.map((color, key) => {
        //   return (
        //     <LinearGradient id={`gradient-${key}`} {...{ key }}>
        //       <Stop
        //         stopColor={color}
        //         offset={0}
        //       />
        //       <Stop
        //         stopColor={gradients2[key + 1]}
        //         offset={1}
        //       />
        //     </LinearGradient>
        //   );
        // });
        return (<>
        
        <Animated.View style={{
            ...StyleSheet.absoluteFillObject,
            transform: [
                { rotateZ },
            ],
        }}>
          <AnimatedSvg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
            <Defs>
              
              
              
              
              <RadialGradient id="radialPlateInt">
                {gradientInt.map(({ offset, stopColor }, i) => <Stop key={i} {...{ offset, stopColor }}/>)}
              </RadialGradient>
              <RadialGradient id="radialPlateExt">
                {gradientExt.map(({ offset, stopColor }, i) => <Stop key={i} {...{ offset, stopColor }}/>)}
              </RadialGradient>
            </Defs>

            
            <AnimatedCircle {...{ strokeWidth, cx, cy, r: plateRadius }} stroke="url(#radialPlateExt)" 
        // stroke={plateColor}
        fill="none"/>
            
            <AnimatedCircle {...{ cx, cy, r }} fill="url(#radialPlateInt)"/>
            <AnimatedCircle {...{ strokeWidth, cx, cy, r }} 
        // stroke={`url(#gradient-${aroundCount})`}
        // stroke={'url(#gradient-0)'}
        // stroke="url(#plate)"
        stroke={bgColor} fill="none"/>
            <AnimatedPath 
        // stroke={concat("url(#gradient-", aroundCount, ")")}
        // stroke={'url(#gradient-1)'}
        // stroke="url(#grad)"
        stroke={fgColor} fill="none" 
        // d="M 95 0 A 10 10 0 0 1 200 200"
        d={cond(eq(isNegative, 1), 
        //inverse the logic if we are negative
        string `M ${endX} ${endY} A ${r} ${r} 0 ${cond(eq(largeArcFlag, 0), '0', '1')} ${sweep} ${startX} ${startY}`, string `M ${startX} ${startY} A ${r} ${r} 0 ${cond(eq(largeArcFlag, 0), '0', '1')} ${sweep} ${endX} ${endY}`)} {...{ strokeWidth }}/>
            {textDisplay && <Animated.View style={{
            transform: [
                { rotateZ: rotateZText },
            ],
            position: 'absolute',
            zIndex: 1000,
            height: canvasSize * fontSizePercent * 2,
            width: canvasSize * fontSizePercent * 4,
            top: canvasSize / 2 - canvasSize * fontSizePercent,
            left: canvasSize / 2 - canvasSize * fontSizePercent * 2,
            justifyContent: 'space-evenly',
        }}>
              <ReText text={concat(finalValue)} style={textStyleComputed}/>
            </Animated.View>}
          </AnimatedSvg>
        </Animated.View>
        

        
        

      </>);
    }
}
;
//# sourceMappingURL=CircularProgress.js.map