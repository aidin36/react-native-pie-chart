import React from 'react'
import 'react-native'

import { render, screen } from '@testing-library/react-native'

import { it, expect } from '@jest/globals'

import PieChart from '../src'

it('five slices', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = render(<PieChart widthAndHeight={250} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('zero in the series', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 0, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 0, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = render(<PieChart widthAndHeight={250} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('small numbers', () => {
  const series = [
    { value: 1, color: '#fbd203' },
    { value: 0.5, color: '#ffb300' },
    { value: 0.5, color: '#ff9100' },
  ]

  const rendered = render(<PieChart widthAndHeight={250} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('big numbers', () => {
  const series = [
    { value: 999000, color: 'red' },
    { value: 100000, color: 'blue' },
    { value: 53000, color: '#000011' },
  ]

  const rendered = render(<PieChart widthAndHeight={250} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('small series', () => {
  const series = [{ value: 1, color: 'black' }]

  const rendered = render(<PieChart widthAndHeight={320} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('large series', () => {
  const series = [
    { value: 1, color: 'black' },
    { value: 2, color: 'red' },
    { value: 3, color: 'blue' },
    { value: 4, color: 'pink' },
    { value: 200, color: '#000000' },
    { value: 300, color: '#001100' },
    { value: 400, color: '#99ff00' },
    { value: 100, color: '#ffaabb' },
    { value: 1, color: 'white' },
    { value: 1, color: '#ffaabb' },
    { value: 1, color: '#987654' },
    { value: 1, color: 'black' },
    { value: 1, color: 'pink' },
  ]

  const rendered = render(<PieChart widthAndHeight={400} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('labels', () => {
  const series = [
    { value: 10, color: '#ff00bb', label: { text: '10%', fill: 'red' } },
    { value: 5, color: '#00ffbb', label: { text: '10%', fontSize: 12 } },
    { value: 3.5, color: '#ffffbb', label: { text: '10%', fontWeight: 'bold', offsetX: 10, offsetY: -5 } },
  ]

  const rendered = render(<PieChart widthAndHeight={200} series={series} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('doughnut chart', () => {
  const series = [
    { value: 200, color: '#fbd203' },
    { value: 250, color: '#ffaabb' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = render(<PieChart widthAndHeight={400} series={series} cover={0.3} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('doughnut with cover chart', () => {
  const series = [
    { value: 200, color: '#fbd203' },
    { value: 250, color: '#ffaabb' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = render(<PieChart widthAndHeight={400} series={series} cover={{ radius: 0.3, color: '#3c3c3c' }} />)

  expect(screen.toJSON()).toMatchSnapshot()
})

it('pad angle', () => {
  const series = [
    { value: 50, color: '#fbd203' },
    { value: 10, color: '#ffaabb' },
    { value: 20, color: '#ff6c00' },
    { value: 30, color: '#ff3c00' },
  ]

  const rendered = render(<PieChart widthAndHeight={400} series={series} padAngle={0.1} />)
  expect(screen.toJSON()).toMatchSnapshot()
})

it('check for negative in series', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: -120, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
  ]

  expect(() => render(<PieChart widthAndHeight={250} series={series} />)).toThrow(
    `Invalid series: all numbers should be positive. The invalid slice: {"value":-120,"color":"#ffb300"}`
  )
})

it('check for all zeros series', () => {
  const series = [
    { value: 0, color: '#fbd203' },
    { value: 0, color: '#ffb300' },
    { value: 0, color: '#ff9100' },
  ]

  expect(() => render(<PieChart widthAndHeight={250} series={series} />)).toThrow(
    'Invalid series: sum of series is zero'
  )
})

it('check for bad cover radius', () => {
  const series = [
    { value: 100, color: '#fbd203' },
    { value: 200, color: '#ffb300' },
    { value: 50, color: '#ff9100' },
  ]

  const expectedError = (val: string) => `Invalid "coverRadius": It should be between zero and one. But it's ${val}`
  expect(() => render(<PieChart widthAndHeight={250} series={series} cover={1.1} />)).toThrow(expectedError('1.1'))
  expect(() => render(<PieChart widthAndHeight={250} series={series} cover={-1} />)).toThrow(expectedError('-1'))
  expect(() => render(<PieChart widthAndHeight={250} series={series} cover={{ radius: 0 }} />)).toThrow(
    expectedError('0')
  )
})

it('color is mandatory', () => {
  const series = [{ value: 430, color: '#fbd203' }, { value: 123 }, { value: 80, color: '#ff3c00' }]

  expect(() => render(<PieChart widthAndHeight={250} series={series} />)).toThrow(
    `'color' is mandatory in the series. The invalid slice: {"value":123}`
  )
})
