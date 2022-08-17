import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './ItemList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import imageHolder from '../../../../images/imageHolder.jpg'

import { apiKey } from '../../../APIKEYS'
import CircularStatic from '../../../commons/CircularProgressWithLabel'

function ItemList({ account, contractData, setSelectedProfile }) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [profiles, setProfiles] = useState([])
  const [data, setData] = useState([])
  console.log('🚀 ~ file: ItemList.js ~ line 22 ~ ItemList ~ data', data)

  useEffect(() => {
    const loadsData = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let descriptionArr = data.description.split(',$,')

            // ${description},$,${category},$,${price},$,${condition},$,${retailPrice},$,${location},$,${image1},$,${image2},$,${walletAddress}
            //  0: "des"
            // 1: "Home Goods "
            // 2: "10"
            // 3: "New"
            // 4: "97"
            // 5: "New York"
            // 6: "https://gateway.pinata.cloud/ipfs/QmVgWUJnJYvUofb64vML7JCStKpH8JPGuB2MGyNRLP5f4T"
            // 7: ""
            // 8: ""
            // 9: "null"
            data.description = descriptionArr[0]
            data.category = descriptionArr[1]
            data.price = descriptionArr[2]
            data.condition = descriptionArr[3]
            data.retailPrice = descriptionArr[4]
            data.location = descriptionArr[5]
            data.image1 = descriptionArr[6]
            data.walletAddress = descriptionArr[7]

            console.log('+++++ descriptionArr', descriptionArr)

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.myImage = await getImage(data.image)
            data.cid = cid.cid
            data.created = cid.created
            console.log('COMPLETED DATA data', data)
            temp.push(data)
          }
        }
        setData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadsData()
  }, [])

  const details = (profile) => {
    console.log('here profile', profile.cid)
    localStorage.removeItem('selectedItem')
    localStorage.setItem('selectedItem', profile)
    setSelectedProfile(profile)
    history.push(`/details/${profile.cid}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          <Grid container spacing={40}>
            {data.length ? (
              data.map((profile, index) => (
                <Grid item md={3} spacing={1} className="swap-card">
                  <Card sx={{ maxWidth: 300 }} onClick={() => details(profile)}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={profile.image1 || imageHolder}
                      alt="Profile"
                    />
                    <CardContent>
                      <Typography className="card-price">
                        ${profile.price ? profile.price : 'FREE'}
                      </Typography>
                      <Typography color="#1C1A19" className="card-header-swap">
                        {profile.name || profile.username}
                      </Typography>
                      <Typography className="card-location">
                        {profile.location ? profile.location : 'New York City'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Items Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ItemList
