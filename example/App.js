import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Dimensions } from 'react-native';

import { Circles } from 'react-native-reanimated-circles';

console.disableYellowBox = true;

export default App = () => {
  const { PI } = Math;
  const profilKcal = 200;
  const profilProt = 40;
  const profilLip = 80;
  const profilGlu = 60;
  const initData = [{
    name: `Objectif ${profilKcal} Kcal - Régime Dietethic`,
    strokeWidth: '8%',
    valueOld: 0,
    value: 150,
    maxValue: profilKcal,
    negative: false,
    colors: ['#CCC', '#00e5d9', '#E62929'],
    textDisplay: true,
    displayValue: profilKcal,
    unit: 'Kcal',
  }, {
    name: `Protides ${profilProt} g`,
    strokeWidth: '8%',
    valueOld: 0,
    value: 30,
    maxValue: profilProt,
    negative: false,
    colors: ['#D9D7D7', '#e66700', '#E62929'],
    textDisplay: false,
    unit: 'g',
  }, {
    name: `Lipides ${profilLip} g`,
    strokeWidth: '8%',
    valueOld: 0,
    value: 40,
    maxValue: profilLip,
    negative: false,
    colors: ['#E6E6E6', '#e6da00', '#E62929'],
    textDisplay: false,
    unit: 'g',
  }, {
    name: `Glucides ${profilGlu} g`,
    strokeWidth: '8%',
    valueOld: 0,
    value: 50,
    maxValue: profilGlu,
    negative: false,
    colors: ['#F2F2F2', '#0be600', '#E62929'],
    textDisplay: false,
    unit: 'g',
  }];
  const [data, setData] = useState(initData);

  const { width, height } = Dimensions.get("window");
  const [isLandscape, setIsLandscape] = useState(height < width);
  let buttons = [-100, -33, -25, 0, 25, 33, 100];

  updateKnobValue = (value) => {
    let newData = [];
    for (let index = 0; index < data.length; index++) {
      let circle = { ...data[index] };
      circle.valueOld = circle.value
      circle.value = value === 0 ? value : circle.value + value;
      if (circle.textDisplay) {
        const diff = circle.maxValue - circle.value
        circle.displayValue = (diff < 0 ? `+${Math.abs(diff)}` : diff.toString());
      }
      newData.push(circle);
    }
    setData(newData);
  }

  // onLayout = () => {
  //   console.log("layautChangeApp");
  //   const { width, height } = Dimensions.get("window");
  //   setIsLandscape(height < width);
  // }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    labels: {
      flex: 1,
      flexDirection: isLandscape ? 'column' : 'row',
      justifyContent: 'center',
    },
    label: {
      flex: 1,
      textAlign: 'center',
    },
    buttons: {
      flex: 1,
      flexDirection: isLandscape ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      marginHorizontal: 50,
      backgroundColor: '#E03997',
      color: 'white',
    },
    knob: {
      flex: isLandscape ? 2 : 1,
      // backgroundColor: 'blue',
    },
  });



  return (
    <View style={styles.container}>
      {/* <View style={styles.labels}>
        <TextInput
          value={knobValue.toString()}
          style={styles.label}
          ref={component => _textInput1 = component}
        />
        <TextInput
          style={styles.label}
          ref={component => _textInput2 = component}
        />
        <TextInput
          value={val1.toString()}
          style={styles.label}
        />
        <TextInput
          value={init.toString()}
          style={styles.label}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          title="Change State"
          onPress={() => setVal1(val1 + 1)}
        />
        <Button
          style={styles.button}
          title="init"
          onPress={() => {
            _knobRef.setValue(init)
            _knobRef.initKnob();
          }}
        />
      </View>
      */}
      <View style={styles.buttons}>
        {buttons.map((val, i) => <Button
          key={i}
          style={styles.button}
          title={val.toString()}
          onPress={() => updateKnobValue(val)}
        />)}
      </View>
      <Circles
        margin={'0%'}
        padding={'0%'}
        paddingBetween={'1%'}
        strokeWidthDecoration={'0%'}
        rotation={-PI / 2}
        gradientExt={[{ offset: '100%', stopColor: '#000', stopOpacity: '1' }]}
        style={styles.knob}
        {...{ data }}
        legendStyle={{ color: 'black', fontSize: '5%', yOffset: '2%', startOffset: '50%', textAnchor: 'middle', rotate: PI / 2, fontWeight: 'bold' }}
        textStyle={{
          color: data[0].value > data[0].maxValue ? '#E62929' : '#00e5d9',
          fontSize: '10%',
          fontWeight: 'bold',
          textShadowColor: 'rgba(0,0,0,0.5)',
          textShadowOffset: { width: 0, height: 3 },
          textShadowRadius: 3,
        }}
      />
      {/* gradientExt={[{ offset: '50%', stopColor: '#00b5ad', stopOpacity: '1' }, { offset: '70%', stopColor: '#fff', stopOpacity: '1' }]} */}
      {/* textStyle={{ color: 'black', textAlign: 'center', fontSize: '10%' }} */}
    </View>
  );
};


