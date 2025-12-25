// Copyright 2023-2026 Aidin Gharibnavaz <https://aidinhut.com>

import { Fragment, JSX } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Svg, G, Path, Text, FontWeight, NumberProp, FontStyle } from 'react-native-svg'
import * as d3 from 'd3-shape'

export type SliceLabel = {
  /**
   * Text of the label
   */
  text: string
  /**
   * Color to fill the font with
   */
  fill?: string
  /**
   * Color of the font's outline
   */
  stroke?: string
  /**
   * string or number
   */
  fontSize?: NumberProp
  /**
   * Can be:
   *'normal', 'bold', 'bolder', 'lighter', '100', '200',... until '900'
   */
  fontWeight?: FontWeight
  /**
   * Name of the font
   */
  fontFamily?: string
  /**
   * Can be:
   * 'normal', 'italic', 'oblique'
   */
  fontStyle?: FontStyle
  /**
   * By default, the label will be placed at the center of the slice.
   * You can change it by setting these offsets. These are offset from
   * the center. These can be negative.
   */
  offsetX?: number
  offsetY?: number
}

/**
 * Represents one slice of the pie
 */
export type Slice = {
  /**
   * Value the slice represents.
   * Should be a positive number.
   */
  value: number
  /**
   * Color of the slice. Can be any string that HTML & CSS accepts.
   */
  color: string
  /**
   * Optional label that appears on top of the slice.
   */
  label?: SliceLabel
}

/**
 * Represents the hole inside the doughnut chart
 */
export type Cover = {
  /**
   * Radius of the doughnut hole, in precentage.
   * For example 0.3 to cover 30% of the center of the chart.
   */
  radius: number
  /**
   * Optional. Color of the doughnut hole.
   * If you want the hole to be transparent, don't provide this
   * field.
   */
  color?: string
}

export type Props = {
  /**
   * Diameter of the chart. In otherwords, size of the square that wraps the chart's circle.
   */
  widthAndHeight: number
  /**
   * Chart's data.
   * The sum of the series values cannot be zero.
   */
  series: Slice[]
  /**
   * Optional.
   * If a `number`, it's the radius of the doughnut's hole, in percentage.
   * (The hole will be transparent).
   * Should be between zero and one.
   * It can be an object that also defined the color of the hole.
   */
  cover?: number | Cover
  /**
   * Optional.
   * React-native's style object. This will apply to the chart's SVG.
   */
  style?: StyleProp<ViewStyle>
  /**
   * If provided, it creates a gap between the slices. Use very small numbers, like `0.01`.
   */
  padAngle?: number
}

const PieChart = ({ widthAndHeight, series, cover, style = {}, padAngle }: Props): JSX.Element => {
  // Validating props
  series.forEach((s) => {
    if (s.value < 0) {
      throw Error(`Invalid series: all numbers should be positive. The invalid slice: ${JSON.stringify(s)}`)
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

  if (coverRadius != null && (coverRadius <= 0 || coverRadius >= 1)) {
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
