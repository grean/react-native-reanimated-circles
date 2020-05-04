import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Defs, Stop, Path, Circle, RadialGradient, Text, TextPath
} from 'react-native-svg';
import Animated, { lessThan, lessOrEq, greaterThan, useCode } from 'react-native-reanimated';
import { TapGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler';
import { ReText, string, interpolateColor } from 'react-native-redash';
import { StopGradient, TextStyle, CircleParams, LegendTextStyle } from './Circles';

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
  // data: CircleParams;
  rotation: number;
  // data:Array<CircleParams>;
  gradientInt: Array<StopGradient>;
  gradientExt: Array<StopGradient>;
  // callback: (values: readonly number[]) => void;
  // callbackInit: (values: readonly number[]) => void;
  legendFontSize: number,
  startOffset: string,
  textAnchor: "end" | "start" | "middle" | undefined,
  legendColor: string,
  displayValue: string,
  legendText: string,
  legendFontWeight: string,
  legendTextRotateZ: number,
  dy: number,
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
  // finalValue: Animated.Value<number>;
  previousAngle: Animated.Value<number>;
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
  // state: Animated.Value<State>;
  largeArcFlag: Animated.Value<number>;
  isNegative: Animated.Value<0 | 1>;
  previousIsNegative: Animated.Value<0 | 1>;
  sweep: string;
  counterclockwise: Animated.Value<0 | 1>;
  init: Animated.Value<0 | 1>;
  rapport: Animated.Value<number>;
  mantisse: Animated.Value<number>;
}

const { multiply, Value, event, block, debug, set, sub, add, atan, divide, cos, sin, cond, concat, eq, tan, round, abs, and, or, onChange, call, neq, floor, ceil } = Animated;

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default class CircularProgress extends React.Component<CircularPogressProps, CircularPogressState> {

  constructor(props: CircularPogressProps) {
    super(props);
    const { canvasSize, strokeWidth, padding, strokeWidthDecoration } = this.props;
    const startAngle = 0;
    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const r = (canvasSize - strokeWidth) / 2 - padding;

    this.state = {
      ...{ cx, cy, r },
      plateRadius: (canvasSize - strokeWidthDecoration) / 2,
      canvasRadius: canvasSize / 2,
      startAngle: new Value(startAngle),
      endAngle: new Value(Math.abs(0)),
      α: new Value(0),
      startX: cx + r * Math.cos(startAngle),
      startY: cy + r * Math.sin(startAngle),
      endX: new Value(0),
      endY: new Value(0),
      x: new Value(0),
      y: new Value(0),
      aroundCount: new Value(0),
      // finalValue: new Value(value),
      previousAngle: new Value(0),
      translateX: new Value(0),
      translateY: new Value(0),
      largeArcFlag: new Value(0),
      sweep: '1',
      isNegative: new Value(0),
      previousIsNegative: new Value(0),
      counterclockwise: new Value(0),
      init: new Value(0),
      // state: new Value(State.UNDETERMINED),
      rapport: new Value(0),
      mantisse: new Value(0),
    }
  }

  render() {
    const { PI } = Math;
    // const { margin } = this.props;
    const { canvasSize, gradientInt, gradientExt, rotation, strokeWidth, negative, colors, maxValue, textStyle, textDisplay, finalValue, legendFontSize, legendColor, startOffset, strokeWidthDecoration, displayValue, legendTextRotateZ, legendText, textAnchor, dy, legendFontWeight } = this.props;

    const { x, y, cx, cy, r, startAngle, endAngle, canvasRadius, translateX, translateY, α, largeArcFlag, endX, endY, aroundCount, previousAngle, plateRadius, sweep, startX, startY, isNegative, previousIsNegative, counterclockwise, init, rapport, mantisse } = this.state;


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

    const fontSizePercent = textStyle.fontSize === undefined ? 0.125 : Number.parseFloat(textStyle.fontSize.replace('%', '')) / 100;
    const fontSize = Math.round(canvasSize * fontSizePercent);
    const textStyleComputed = { ...{ color: 'black', textAlign: 'center' }, ...textStyle, ...{ fontSize } }
    //for Animated.View rotation

    const rotateZ = concat(rotation, 'rad');
    const rotateZText = concat(multiply(rotation, -1), 'rad');

    return (
      <>
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { rotateZ },
          ],
        }}
        >
          <Animated.Code>
            {
              () => block([
                debug('BEGIN ************************************ ', aroundCount),
                debug('finalValue ', finalValue),
                set(isNegative, lessThan(finalValue, 0)),
                debug('isNegative ', isNegative),
                set(rapport, abs(divide(finalValue, maxValue))),
                debug('rapport ', rapport),
                set(aroundCount, cond(greaterThan(rapport, 0), floor(rapport), ceil(rapport))),
                debug('aroundCount ', aroundCount),
                set(mantisse, sub(rapport, aroundCount)),
                debug('mantisse ', mantisse),
                set(endAngle, multiply(2 * PI, mantisse)),
                debug('endAngle1 ', endAngle),
                cond(eq(isNegative, 1), [
                  debug('endAngle2 ', endAngle),
                  set(endAngle, sub(endAngle, -2 * PI)),
                ]),


                set(x, add(cx, multiply(r, cos(endAngle)))),
                set(y, add(cy, multiply(r, sin(endAngle)))),
                debug('x ', x),
                debug('y ', y),
                //translate x and y to polar coordinates
                set(translateX, sub(x, canvasRadius)),
                set(translateY, sub(canvasRadius, y)),
                debug('translateX  ', translateX),
                debug('translateY  ', translateY),

                //complete atan2 function with atan because redash@9.6.0 atan2 function not enough accurate
                set(α, cond(eq(translateX, 0), tan(-1), atan(divide(translateY, translateX)))),
                cond(or(
                  lessThan(translateX, 0),
                  and(
                    eq(translateX, 0),
                    greaterThan(translateY, 0)
                  )), set(α, add(α, PI))),
                //for quandrant 2 and 3 we add PI to get 2PI values (first quadrant is top right)
                //tan function give us an angle of [0, PI];[-PI, 0] so we need to have 2PI radians value representation
                set(α, cond(lessOrEq(α, 0), add(α, 2 * PI), α)),
                debug('α ', α),

                //We need to add -2PI and then invert the sign in order to inverse the rotation
                set(endAngle, multiply(-1, add(α, -2 * PI))),
                //when translateY === 0 then endAngle value is -0 and abs function don´t seems to remove sign.. so in this case we have to remove it by multiply by -1
                cond(and(eq(translateY, 0), greaterThan(translateX, 0)), set(endAngle, multiply(-1, endAngle))),
                debug('endAngle ', endAngle),

                //calculate end arcTo coordinates
                set(endX, add(cx, multiply(r, cos(endAngle)))),
                set(endY, add(cy, multiply(r, sin(endAngle)))),

                cond(eq(isNegative, 1), [
                  //inverse the logic if we are negative
                  set(largeArcFlag, cond(lessOrEq(sub(endAngle, startAngle), PI), 1, 0)),
                ], [
                  set(largeArcFlag, cond(lessOrEq(sub(endAngle, startAngle), PI), 0, 1)),
                ]),
                debug('largeArcFlag ', largeArcFlag),
              ])
            }
          </Animated.Code>
          <AnimatedSvg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
            <Defs>
              {/* <RadialGradient id="radialPlateInt">
              {
                gradientInt.map(({ offset, stopColor, stopOpacity }, i) => <Stop key={i} {...{ offset, stopColor, stopOpacity }} />)
              }
            </RadialGradient> */}
              <RadialGradient id="radialPlateExt">
                {
                  gradientExt.map(({ offset, stopColor, stopOpacity }, i) => <Stop key={i} {...{ offset, stopColor, stopOpacity }} />)
                }
              </RadialGradient>
            </Defs>
            {/* <AnimatedCircle
              {...{ cx, cy, r }}
              fill="url(#radialPlateInt)"
            // fill={plateColor}
            /> */}
            <AnimatedCircle
              {...{ strokeWidth: strokeWidthDecoration, cx, cy, r: plateRadius }}
              stroke="url(#radialPlateExt)"
              // stroke={plateColor}
              fill="none"
            />
            <AnimatedCircle
              {...{ strokeWidth, cx, cy, r }}
              // stroke={`url(#gradient-${aroundCount})`}
              // stroke={'url(#gradient-0)'}
              // stroke="url(#plate)"
              stroke={bgColor}
              fill="none"
            />
            <AnimatedPath
              stroke={fgColor}
              fill="none"
              // d="M 95 0 A 10 10 0 0 1 200 200"
              d={cond(eq(isNegative, 1),
                //inverse the logic if we are negative
                string`M ${endX} ${endY} A ${r} ${r} 0 ${cond(eq(largeArcFlag, 0), '0', '1')} ${sweep} ${startX} ${startY}`,
                string`M ${startX} ${startY} A ${r} ${r} 0 ${cond(eq(largeArcFlag, 0), '0', '1')} ${sweep} ${endX} ${endY}`
              )}
              {...{ strokeWidth }}
            />
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
              // backgroundColor: 'red',
              // borderColor: plateColor,
              // borderWidth: 1,
            }}>
              <ReText
                text={string`${displayValue}`}
                style={textStyleComputed}
              />
            </Animated.View>}
          </AnimatedSvg>
        </Animated.View>
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 0,
          transform: [
            { rotateZ: legendTextRotateZ },
          ],
        }}
        >
          <AnimatedSvg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
            <AnimatedCircle
              id={"pathText"}
              {...{ strokeWidth, cx, cy, r }}
              fill="none"
            />
            <Text {...{ fontSize: legendFontSize, fill: legendColor, textAnchor, dy, fontWeight: legendFontWeight }}>
              <TextPath href="#pathText" {...{ startOffset }}>
                {legendText}
              </TextPath>
            </Text>
          </AnimatedSvg>
        </Animated.View>
      </>
    );
  }
};
