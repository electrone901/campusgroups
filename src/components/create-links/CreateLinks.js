import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  TextField,
  MenuItem,
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import './CreateLinks.css'
import { apiKey } from '../APIKEYS'
import { NFTStorage, File } from 'nft.storage'

function CreateLinks({
  image1,
  image2,
  title,
  description,
  category,
  price,
  condition,
  retailPrice,
  location,
  setPrice,
  setCondition,
  setRetailPrice,
  setLocation,
  walletAddress,
  contract,
}) {
  const history = useHistory()
  const [cdn, setCdn] = useState('')
  const coditionTypeRef = React.createRef()
  const [loading, setLoading] = useState(false)

  // console.log('MY  linkArray')
  // const [description, setDescription] = useState('')
  // const [url, setUrl] = useState('')

  const saveToNFTStorage = async () => {
    console.log('?? imgToSave', image1)
    try {
      setLoading(true)
      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: title,
        description: `${description},$,${category},$,${price},$,${condition},$,${retailPrice},$,${location},$,${image1},$,${walletAddress}`,
        image: new File([image1], 'imageName', { type: 'image/*' }),
      })
      if (metadata) {
        console.log('MYmetadata', metadata.data)
        let urlPartStorage = metadata.data.image.pathname
        urlPartStorage = urlPartStorage.substring(2)
        const imgUrl = `https://cloudflare-ipfs.com/ipfs/${urlPartStorage}`
        console.log('Result imgUrl', imgUrl)
        setLoading(false)
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const save = async (linksArray) => {
  //   let user_name = username ? username : 'electrone'
  //   let avatar = image ? image : 'https://i.imgur.com/62G0yQ0.jpeg'
  //   let banner = coverPhoto ? coverPhoto : 'https://i.imgur.com/62G0yQ0.jpeg'

  //   let bio_ = bio
  //     ? bio
  //     : 'I am a software developer who enjoys web and mobile development through universal components. By day I love to code and drinking tea. At night I sleep.'
  //   let links = linksArray
  //     ? linksArray
  //     : [
  //         [
  //           'Website',
  //           'https://transak.gitbook.io/transak-docs/quick-guides/setting-up-a-quick-demo-integration',
  //         ],
  //       ]
  //   let address = currentAccount
  //     ? currentAccount
  //     : '0x891352608735f630AF999ba572fd57511137e758'

  //   console.warn(address, user_name, avatar, banner, bio_, links)

  //   // await res.wait()
  //   // console.log(res)
  //   // setLoading(false)
  //   // history.push('/')
  // }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-pet-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <center>
          <Card
            style={{
              maxWidth: '500px',
              padding: '2rem',
              paddingBottom: '3rem',
              borderRadius: '13px',
              textAlign: 'start',
            }}
          >
            <div className="">
              <Button
                className="whiteLink-no-active"
                component={Link}
                to="/sell-item"
              >
                Appearance
              </Button>

              <Button
                className="whiteLink"
                component={Link}
                to="/create-location"
              >
                Details
              </Button>
            </div>
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            <p>
              <label htmlFor="fname">Price</label>
            </p>
            <input
              type="number"
              id="fname"
              name="price"
              placeholder={price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="create-profile-input"
              required
            ></input>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">Only numbers</label>
            </p>

            <br />
            <p>
              <label htmlFor="fname">Retail Price</label>
            </p>
            <input
              type="number"
              id="retailPrice"
              name="$"
              className="create-profile-input"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
            ></input>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">Only numbers</label>
            </p>

            <br />

            <TextField
              fullWidth
              name="condition"
              select
              label="Choose  the condition"
              variant="outlined"
              onChange={(e) => setCondition(e.target.value)}
              defaultValue=""
              ref={coditionTypeRef}
              required
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used - Like New">Used - Like New</MenuItem>
              <MenuItem value="Used - Good">Used - Good</MenuItem>
              <MenuItem value="Used - Fair">Used - Fair</MenuItem>
            </TextField>

            <br />
            <br />

            <p>
              <label htmlFor="fname">Location</label>
            </p>
            <input
              type="text"
              id="location"
              name="City College"
              className="create-profile-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>

            <br />
            <br />

            <br />
            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <br />
            {loading ? (
              <div className="">
                <LinearProgress />
              </div>
            ) : (
              ''
            )}

            <br />
            <center>
              <Button className="whiteLink" component={Link} to="/">
                Nevermind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                onClick={saveToNFTStorage}
              >
                Save
              </Button>
            </center>
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default CreateLinks
