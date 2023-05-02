# react-native-pie-chart

[![npm version](https://img.shields.io/npm/v/react-native-pie-chart)](https://www.npmjs.com/package/react-native-pie-chart)
[![npm downloads](https://img.shields.io/npm/dt/react-native-pie-chart?logo=npm)](https://www.npmjs.com/package/react-native-pie-chart)
[![license](https://img.shields.io/npm/l/react-native-pie-chart)](https://github.com/aidin36/react-native-pie-chart/blob/master/LICENSE)

Simple pie chart module for your React Native app, for both iOS and Android.

<img src="https://raw.githubusercontent.com/aidin36/react-native-pie-chart/main/preview.png" width="400" />

## Installation

You need to have `react`, `react-native` and `react-native-svg` as your app's dependencies.

`react-native-svg` can be installed both in `expo` and in an ejected app. If you had trouble installing `react-native-svg`, refer to the project's documentation: https://www.npmjs.com/package/react-native-svg

Then install this package with:

`~$ npm install react-native-pie-chart --save`

If you're upgradeing from an old version, see the upgrade guide below.

## Usage

Here's a quick start code. Refer to the `example` directory for a fully working app.

```javascript
import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default class TestChart extends Component {
  render() {
    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Basic</Text>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
})
```

## Example App

Have a look at the app in the `example` directory for how to write a simple app that shows two charts.
To setup and run the example app follow these instructions:

```bash
# Clone package
~$ git clone https://github.com/genexu/react-native-pie-chart.git

# Install dependencies
~$ cd react-native-pie-chart/example
~$ npm install

# Run simulator
# Notice: please make sure your simulator state is normal
~$ npm run start

# Then like usual, press 'a' for Android, 'i' for iOS, etc.
```

## TypeScript

The npm package includes TypeScript types.

## Upgrade guide

### Upgrade version 2.x.x to 3.x.x

The package migrated from deprecated `@react-native-community/art` to `react-native-svg`. You need to install `react-native-svg` as per installation guide above. You can now remove `@react-native-community/art` if you didn't use it in your own code.

`doughnut` property is removed. If you set the `coverFill` prop, the chart will become a doughnut.

### Upgrade version 1.x.x to 2.x.x

The only breaking change between version one and two is `chart_wh` prop. It is renamed to `widthAndHeight`. Beside that, there shouldn't be any issue upgrading.

## Props

| Property       | Type     | Required | Default   |
| -------------- | -------- | -------- | --------- |
| widthAndHeight | Number   | **Yes**  |           |
| series         | number[] | **Yes**  |           |
| sliceColor     | string[] | **Yes**  |           |
| coverRadius    | Number   | No       | undefined |
| coverFill      | string   | No       | undefined |
| style          | Object   | No       | {}        |

**widthAndHeight**: Width and height of the chart. In otherwords, size of the square that wraps the chart's circuit.

**series**: Chart's data. Should be a list of all positive (or zero) numbers. The sum of the series cannot be zero.

**SliceColor**: Color of each slice. The first element is the color of the first slice, the second one is the color of the second slice, and so on. The size of the `sliceColor` array should be equal to the size of the `series` array.

**coverRadius**: Size of the doughnut's hole, in percentage. Should be between zero and one.

**CoverFill**: Color of the doughnut's hole. Set it to null to make it transparent.

**style**: React-native's style object. This will apply to the chart's SVG.
