import React from 'react'
import Tile from './Tile'
import TileMap from './TileMap'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tiles = new Map()

  tiles.set(
    1,
    <Tile src={'https://via.placeholder.com/256'} colIndex={1} rowIndex={1} />
  )
  tiles.set(
    2,
    <Tile src={'https://via.placeholder.com/256'} colIndex={1} rowIndex={1} />
  )

  const tree = renderer
    .create(<TileMap zoom={1} zoomLevel={1} tiles={tiles} isLoading={false} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
