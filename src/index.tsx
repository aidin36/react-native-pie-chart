// Copyright 2023-2025 Aidin Gharibnavaz <https://aidinhut.com>

import { StyleProp, ViewStyle } from 'react-native'
import { Svg, G, Path } from 'react-native-svg'
import * as d3 from 'd3-shape'

export type Slice = {
  value: number
  color: string
}

export type Cover = {
  radius: number
  color?: string
}

export type Props = {
  widthAndHeight: number
  series: Slice[]
  cover?: number | Cover
  style?: StyleProp<ViewStyle>
  padAngle?: number
}

const PieChart = ({ widthAndHeight, series, cover, style = {}, padAngle }: Props): JSX.Element => {
  // Validating props
  series.forEach((s) => {
    if (s.value < 0) {
      throw Error(`Invalid series: all numbers should be positive. Found ${s}`)
    }
    if (!s.color) {
      throw Error(`'color' is mandatory in the series. The invalid slice: ${JSON.stringify(s)}`)
    }
  })

  const sum = series.reduce((acc, current) => acc + current.value, 0)
  if (sum <= 0) {
    throw Error('Invalid series: sum of series is zero')
  }

  const coverRadius: number | undefined = typeof cover === 'object' ? cover.radius : cover
  const coverColor: string | undefined = typeof cover === 'object' ? cover.color : undefined

  if (coverRadius && (coverRadius < 0 || coverRadius > 1)) {
    throw Error(`Invalid "coverRadius": It should be between zero and one. But it's ${coverRadius}`)
  }

  const radius = widthAndHeight / 2

  const pieGenerator = d3.pie().sort(null)

  const arcs = pieGenerator(series.map((s) => s.value))

  return (
    <Svg style={style} width={widthAndHeight} height={widthAndHeight}>
      <G transform={`translate(${widthAndHeight / 2}, ${widthAndHeight / 2})`}>
        {arcs.map((arc, i) => {
          let arcGenerator = d3.arc().outerRadius(radius).startAngle(arc.startAngle).endAngle(arc.endAngle)

          if (padAngle) {
            arcGenerator = arcGenerator.padAngle(padAngle)
          }

          // When 'coverColor' is also provided, instead of setting the
          // 'innerRadius', we draw a circle in the middle. See the 'Path'
          // after the 'map'.
          if (!coverRadius) {
            arcGenerator = arcGenerator.innerRadius(0)
          } else {
            arcGenerator = arcGenerator.innerRadius(coverRadius * radius)
          }

          const sliceColor = series[i].color
          return <Path key={arc.index} fill={sliceColor} d={arcGenerator()} />
        })}

        {coverRadius && coverRadius > 0 && coverColor && (
          <Path
            key='cover'
            fill={coverColor}
            d={d3
              .arc()
              .outerRadius(coverRadius * radius)
              .innerRadius(0)
              .startAngle(0)
              .endAngle(360)()}
          />
        )}
      </G>
    </Svg>
  )
}

export default PieChart
