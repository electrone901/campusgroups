import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  TextField,
  MenuItem,
} from '@material-ui/core'
import './CreateItem.css'

import Rectangle from '../../images/Rectangle 77.png'

import axios from 'axios'

function CreateItem({
  image1,
  image2,
  title,
  description,
  category,
  setImage1,
  setImage2,
  setTitle,
  setDescription,
  setCategory,
  walletAddress,
}) {
  const listTypeRef = React.createRef()
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  useEffect(() => {
    if (!walletAddress) {
      alert('Please login!')
    }
  }, [walletAddress])

  const handleImage = async (event) => {
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    const updataData = new FormData()
    updataData.append('file', event.target.files[0])
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      updataData,
      {
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '309d3c624b4ce20cea2b',
          pinata_secret_api_key:
            'a743aec5905097d38724b5daab66f9c206b0b3ef2d01ecccbe79cd2f0e15d026',
        },
      },
    )
    setImage1('https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
  }

  const handleCoverPhoto = async (event) => {
    const updataData = new FormData()
    updataData.append('file', event.target.files[0])
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      updataData,
      {
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '309d3c624b4ce20cea2b',
          pinata_secret_api_key:
            'a743aec5905097d38724b5daab66f9c206b0b3ef2d01ecccbe79cd2f0e15d026',
        },
      },
    )
    setImage2('https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
  }

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
              <Button className="whiteLink" component={Link} to="/sell-item">
                Appearance
              </Button>

              <Button
                className="whiteLink-no-active"
                component={Link}
                to="/create-location"
              >
                Details
              </Button>
            </div>

            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            <img
              style={{
                width: '150px',
                top: '0',
                left: '0',
              }}
              src={image1 ? image1 : Rectangle}
              alt="userBGimage"
            />

            <label htmlFor="formFileImage5">+ Upload</label>
            <input
              type="file"
              id="formFileImage5"
              onChange={handleImage}
              defaultValue={image1}
              style={{ display: 'none' }}
              required
            />

            <br />
            <br />
            <p>
              <label htmlFor="fname">Title</label>
            </p>
            <input
              type="text"
              id="fname"
              name="Username"
              placeholder="Moving Sale.."
              className="create-profile-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>

            <p>
              <label htmlFor="w3review">Description</label>
            </p>
            <textarea
              className="create-profile-input"
              type="text"
              id="bio"
              name="bio"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">0/120</label>
            </p>

            <br />

            <TextField
              fullWidth
              name="petType"
              select
              label="Choose one option"
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue=""
              ref={listTypeRef}
            >
              <MenuItem value="Appliances">Appliances</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Home Goods">Home Goods</MenuItem>
              <MenuItem value="Arts & Crafts">Arts & Crafts</MenuItem>
              <MenuItem value="Auto Parts & Accessories">
                Auto Parts & Accessories
              </MenuItem>
              <MenuItem value="Books, Movies & Music">
                Books, Movies & Music
              </MenuItem>
              <MenuItem value="Cell Phones & Accessories">
                Cell Phones & Accessories
              </MenuItem>
              <MenuItem value="Clothing, Shoes & Accessories">
                Clothing, Shoes & Accessories
              </MenuItem>
              <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
              <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
              <MenuItem value="Office Supplies">Office Supplies</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <br />
            <br />
            <p style={{ textAlign: 'left', paddingBottom: '11px' }}>
              <label htmlFor="w3review">Add another image</label>
            </p>
            <input
              type="file"
              id="formFile"
              // onChange={handleCoverPhoto}
              defaultValue=""
              required
            />
            <br />

            <br />
            <br />
            <p
              style={{
                textAlign: 'left',
                paddingBottom: '11px',
                fontSize: '11px',
              }}
            >
              <label htmlFor="w3review">
                Upload a cover photo. Max size 20MB.
              </label>
            </p>

            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <center>
              <Button
                className="whiteLink"
                component={Link}
                to="/create-location"
              >
                Nevermind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                component={Link}
                // onClick={test}
                to="/create-location"
              >
                Next
              </Button>
            </center>
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default CreateItem
