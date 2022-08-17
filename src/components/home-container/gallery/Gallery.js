import React, { useEffect, useState } from 'react'
import ItemList from './item-list/ItemList'

// import banner from '../../../images/undraw_Add_to_cart_re_wrdo.png'
// import banner from '../../../images/camp.png'
import banner from '../../../images/eee.jpg'

import { Grid, Container, Card } from '@material-ui/core'
import './Gallery.css'

function Gallery({ setSelectedItem }) {
  return (
    <div
      style={{
        minHeight: '70vh',
        paddingBottom: '3rem',
        paddingTop: '3rem',
      }}
    >
      <Container>
        {/* Home Header */}
        <Container>
          <div className="root">
            <Grid
              container
              spacing={3}
              style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              <Grid item xs={7} className="outer">
                <img src={banner} className="logo-hero" alt="logo-hero" />
              </Grid>
              <Grid item xs={5}>
                <p className="home-text-intro">
                  <strong>Campusgroups</strong> gives students the ability to
                  buy, rent, sell and request items they need with other
                  students, all in one click with CampusGroups marketplace. Try{' '}
                  <strong>Now!</strong>
                </p>
              </Grid>
            </Grid>
          </div>
        </Container>

        {/* search */}
        <form className="search-form">
          <div className="pseudo-search">
            <input
              type="text"
              placeholder="Search for people, etc"
              autofocus
              required
            />
            <span className="search-clear">Clear</span>
            <span className="search-icon">🔍</span>
          </div>
        </form>

        <br />
        {/* Profiles */}
        <Card
          style={{
            borderRadius: '24px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: '#fff9f7',
            width: '100%',
          }}
        >
          <ItemList setSelectedProfile={setSelectedItem} />
        </Card>
      </Container>
    </div>
  )
}

export default Gallery
