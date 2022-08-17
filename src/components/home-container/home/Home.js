import React from 'react'
import { StylesProvider, Chip, Container } from '@material-ui/core'
import './Home.css'
import PetGallery from '../gallery/Gallery'

function Home({ setSelectedItem }) {
  return (
    <StylesProvider injectFirst>
      <Container>
        <PetGallery setSelectedItem={setSelectedItem} />
        {/* <div className="label-btns">
          <Chip size="medium" label="Today NFTS" color="primary" clickable />

          <Chip size="medium" label="Last Week" clickable />
        </div> */}
      </Container>
    </StylesProvider>
  )
}

export default Home
