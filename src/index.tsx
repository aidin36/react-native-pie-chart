// Copyright 2023-2025 Aidin Gharibnavaz <https://aidinhut.com>

import { Fragment } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Svg, G, Path, Text, FontWeight, NumberProp, FontStyle } from 'react-native-svg'
import * as d3 from 'd3-shape'

export type SliceLabel = {
  text: string
  // Color to fill the font with
  fill?: string
  // Color of the font's outline
  stroke?: string
  // string or number
  fontSize?: NumberProp
  // Can be:
  // 'normal', 'bold', 'bolder', 'lighter', '100', '200',... until '900'
  fontWeight?: FontWeight
  fontFamily?: string
  // Can be:
  // 'normal', 'italic', 'oblique'
  fontStyle?: FontStyle
  // By default, the label will be placed at the center of the slice.
  // You can change it by setting these offsets. These are offset from
  // the center. These can be negative.
  offsetX?: number
  offsetY?: number
}

export type Slice = {
  value: number
  color: string
  label?: SliceLabel
}

export type Cover = {
  radius: number
  color?: string
}

export type Props = {
  // Radius of the chart. In otherwords, size of the square that wraps the chart's circle.
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

  const arcs = d3
    .pie()
    .sort(null)
    // Using selector allows us to have the original data object in the 'arc.data'.
    .value((d) => d.value)(series)

  return (
    <Svg style={style} width={widthAndHeight} height={widthAndHeight}>
      <G transform={`translate(${widthAndHeight / 2}, ${widthAndHeight / 2})`}>
        {arcs.map((arc) => {
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

          const [sliceCenterX, sliceCenterY] = arcGenerator.centroid(arc)
          const sliceColor = arc.data.color
          const sliceLabel = arc.data.label

          return (
            <Fragment key={`f-${arc.index}`}>
              <Path key={`p-${arc.index}`} fill={sliceColor} d={arcGenerator()} />
              {sliceLabel && (
                <Text
                  key={`t-${arc.index}`}
                  x={sliceCenterX + (sliceLabel.offsetX ?? 0)}
                  y={sliceCenterY + (sliceLabel.offsetY ?? 0)}
                  textAnchor='middle'
                  fill={sliceLabel.fill}
                  stroke={sliceLabel.stroke}
                  fontSize={sliceLabel.fontSize}
                  fontWeight={sliceLabel.fontWeight}
                  fontFamily={sliceLabel.fontFamily}
                  fontStyle={sliceLabel.fontStyle}
                >
                  {sliceLabel.text}
                </Text>
              )}
            </Fragment>
          )
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
