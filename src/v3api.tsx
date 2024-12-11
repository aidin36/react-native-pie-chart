// Copyright 2023-2025 Aidin Gharibnavaz <https://aidinhut.com>

import { StyleProp, ViewStyle } from 'react-native'

import PieChartV4 from './index'

export type Props = {
  widthAndHeight: number
  series: number[]
  sliceColor: string[]
  coverFill?: string | null
  coverRadius?: number
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

  return (
    <PieChartV4
      widthAndHeight={widthAndHeight}
      series={newApiSeries}
      coverFill={coverFill}
      coverRadius={coverRadius}
      style={style}
    />
  )
}

export default PieChart
