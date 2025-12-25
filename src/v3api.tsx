// Copyright 2023-2025 Aidin Gharibnavaz <https://aidinhut.com>

import { JSX } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import PieChartV4 from './index'

export type Props = {
  /**
   * Diameter of the chart. In otherwords, size of the square that wraps the chart's circle.
   */
  widthAndHeight: number
  /**
   * Chart's data. Should be a list of all positive (or zero) numbers.
   * The sum of the series cannot be zero.
   */
  series: number[]
  /**
   * Color of each slice. The first element is the color of the first slice,
   * the second one is the color of the second slice, and so on.
   * The size of the `sliceColor` array should be equal to the size of the `series` array.
   */
  sliceColor: string[]
  /**
   * Color of the doughnut's hole.
   * Don't provide it or set it to null to make it transparent.
   */
  coverFill?: string | null
  /**
   * Size of the doughnut's hole, in percentage.
   * Should be between zero and one.
   */
  coverRadius?: number
  /**
   * React-native's style object. This will apply to the chart's SVG.
   */
  style?: StyleProp<ViewStyle>
}

const PieChart = ({
  widthAndHeight,
  series,
  sliceColor,
  coverFill = null,
  coverRadius,
  style = {},
}: Props): JSX.Element => {
  // Validating props
  if (sliceColor.length != series.length) {
    throw Error(
      `Invalid "sliceColor": its length should be equal to the length of "series". sliceColor.length=${sliceColor.length} series.length=${series.length}`
    )
  }

  const newApiSeries = series.map((value, i) => ({ value, color: sliceColor[i] }))

  const coverRadiusObject = coverRadius ? { radius: coverRadius } : undefined
  const cover = coverRadiusObject && coverFill ? { ...coverRadiusObject, color: coverFill } : coverRadiusObject

  return <PieChartV4 widthAndHeight={widthAndHeight} series={newApiSeries} cover={cover} style={style} />
}

export default PieChart
