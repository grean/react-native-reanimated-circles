import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Picker from '@grean/react-native-carousel-picker';

import ViewPager from '../src/index';
// import { NavigationType } from '../src/types';


export default function App() {

  const currentItemIndex = 1
  const [itemIndex, setItemIndex] = useState(currentItemIndex)
  const currentPageIndex = 1
  const [pageIndex, setPageIndex] = useState(currentPageIndex)
  const display = "TOP_BOTTOM"
  const spaceBetween = 1 / 3
  const opacityRangeOut = [0, 0.6, 1, 0.6, 0]
  const scaleRangeOut = [0, 0.6, 1, 0.6, 0]
  const profils = [
    {
      "title": "Retraité sportif sportif",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
    },
    {
      "title": "Adolescent",
      "desc": "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor."
    },
    {
      "title": "Salarié debout",
      "desc": "Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
    },
    {
      "title": "Retraité sportif2",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
    },
    {
      "title": "Adolescent2",
      "desc": "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor."
    },
    {
      "title": "Salarié debout2",
      "desc": "Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
    }
  ]
  const items = profils.map(item => item.title)
  const marginVerticalPercentage = 0
  const marginHorizontalPercentage = 0
  // const marginHorizontalPercentage = 0.05

  const onChanged = (itemIndex: number) => {
    setItemIndex(itemIndex)
    console.log(`PICKER onChanged itemIndex ${itemIndex}`)
  }

  const onPageChanged = (itemIndex: number) => {
    setPageIndex(itemIndex)
    console.log(`VIEWPAGER onChanged itemIndex ${itemIndex}`)
  }

  let [fontsLoaded] = useFonts({
    // 'dancingVar': require('./fonts/DancingScript-VariableFont_wght.ttf'),
    'cookie': require('./fonts/Cookie-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Button color={pageIndex === 0 ? 'black' : 'white'} title="0" onPress={() => setPageIndex(0)} />
      <Button color={pageIndex === 1 ? 'black' : 'white'} title="1" onPress={() => setPageIndex(1)} />
      <Button color={pageIndex === 2 ? 'black' : 'white'} title="2" onPress={() => setPageIndex(2)} />
      <View style={styles.background}>
        <ViewPager
          {...{
            style: {
              flex: 1,
              // flex: 0.765,
              // backgroundColor: '#fff',
              // overflow: 'hidden',
              // alignItems: 'center',
              // backgroundColor: 'pink',
              // backgroundColor: 'transparent',
            },
            // childStyle: {
            //   flex: 1,
            //   // marginVertical,
            //   // paddingTop: itemHeight,
            //   backgroundColor: "green",
            //   flexDirection: 'row',
            //   // justifyContent: 'flex-end',
            // },
            index: pageIndex,
            // navigation: false,
            navigationHeight: 0.08,
            navigationPadding: 0.05,
            // navigationHeight: 0.075,
            // navigationType: NavigationType.ABSOLUTE,
            navigationType: NavigationType.FLEX,
            onChanged: onPageChanged,
            pointColor: [255, 0, 255],
            pointRadius: 8,
            tickRadius: 4,
          }}
        >
          <View style={styles.page}>
            <Text style={styles.text}>Screen 1</Text>
          </View>
          <View style={styles.page}>
            {/* <Text>lol</Text> */}
            <View style={styles.header}>
            </View>
            <View style={styles.picker}>
              <Picker
                {...{
                  items,
                  index: itemIndex,
                  onChanged,
                  marginVerticalPercentage,
                  marginHorizontalPercentage,
                  display,
                  opacityRangeOut,
                  scaleRangeOut,
                  spaceBetween,
                  textStyle: {
                    fontFamily: 'cookie',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 3, height: 3 },
                    textShadowRadius: 10,
                    paddingVertical: 5,
                  },
                  containerStyle: {
                    backgroundColor: 'green',
                    // ...carouPicker,
                    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    // textShadowOffset: { width: 3, height: 3 },
                    // textShadowRadius: 10,
                  },
                  fontSize: 200,
                }}
              />
            </View>
            <View style={styles.bottom}></View>
          </View>
          <View style={styles.page}>
            <Text style={styles.text}>Screen 3</Text>
          </View>
        </ViewPager>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'flex-end',
  },
  background: {
    height: '70%',
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  header: {
    flex: 0.75,
    backgroundColor: 'purple',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  bottom: {
    flex: 1.5,
    backgroundColor: 'purple',
  },
  page: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  // footer: {
  // flex: 0.5,
  // backgroundColor: 'orange',
  // },
});
