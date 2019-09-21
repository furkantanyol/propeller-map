import React from 'react'
import Tile from './Tile'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Tile src={'https://via.placeholder.com/256'} colIndex={1} rowIndex={1} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
