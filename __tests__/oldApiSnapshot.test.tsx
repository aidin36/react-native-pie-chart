import React from 'react'
import 'react-native'

import { render, screen } from '@testing-library/react-native'

import { it, expect } from '@jest/globals'

import PieChart from '../src/v3api'

it('five slices', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = render(<PieChart widthAndHeight={250} series={series} sliceColor={colors} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('doughnut', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = render(<PieChart widthAndHeight={250} series={series} sliceColor={colors} coverRadius={0.3} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('doughnut with fill', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb', 'black']

  const rendered = render(
    <PieChart widthAndHeight={250} series={series} sliceColor={colors} coverRadius={0.3} coverFill='white' />
  )
  expect(screen.toJSON()).toMatchSnapshot()
})

it('should throws error when length of color and series does not match', () => {
  const series = [100, 200, 50]
  const colors = ['red', '#ff88bb']

  expect(() => render(<PieChart widthAndHeight={250} series={series} sliceColor={colors} />)).toThrow(
    'Invalid "sliceColor": its length should be equal to the length of "series". sliceColor.length=2 series.length=3'
  )
})
