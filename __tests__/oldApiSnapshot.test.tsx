import React from 'react'
import 'react-native'

import renderer from 'react-test-renderer'

import { it, expect } from '@jest/globals'

import PieChart from '../src/v3api'

it('five slices', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = renderer.create(<PieChart widthAndHeight={250} series={series} sliceColor={colors} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('doughnut', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = renderer
    .create(<PieChart widthAndHeight={250} series={series} sliceColor={colors} colorRadius={0.3} />)
    .toJSON()
  expect(rendered).toMatchSnapshot()
})

it('doughnut with fill', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = renderer
    .create(<PieChart widthAndHeight={250} series={series} sliceColor={colors} colorRadius={0.3} colorFill='white' />)
    .toJSON()
  expect(rendered).toMatchSnapshot()
})

it('should throws error when length of color and series does not match', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb']

  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} sliceColor={colors} />)).toThrow(
    'Invalid "sliceColor": its length should be equal to the length of "series". sliceColor.length=2 series.length=3'
  )
})
