import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'
import { Link } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from '@material-ui/core'
// import DirectionImg from '../../../src/components/images/directions.png'
import './ItemDetails.css'
import detailsImg from '../../../images/details.png'
import { CircularStatic } from '../../commons/CircularProgressWithLabel'
// import SeeMoreWork from '../unlock-work/UnlockWork'

function ItemDetails({ account, contractData, selectedItem }) {
  console.log('my selectedItem', selectedItem)
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState('')
  const [image, setImage] = useState([])
  const [petName, setPetName] = useState([])
  const [petOwner, setOwnerName] = useState([])
  const [petCategory, setPetCategory] = useState([])
  const [petTransactions, setpetTransactions] = useState([])
  const [comment, setComment] = useState('')
  const [codeHash, setCodeHash] = useState('')

  const [loading, setLoading] = useState(false)
  const [unlock, setUnlock] = useState(false)

  useEffect(() => {
    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${recipeId}/metadata.json`)
      data = await data.json()
      const dataArray = data.description.split(',')
      data.creator = dataArray[0]
      data.type = dataArray[1]
      data.intro = dataArray[2]
      data.image = getImage(data.image)
      data.ingredients = [
        '10 large shrimp, heads off and unpeeled',
        '1 tablespoon olive oil',
        '3 cloves garlic, minced',
        '4 tablespoons butter',
        '½ teaspoon dried oregano',
        'Add salt to taste',
      ]
      data.Prep = '15 mins'
      data.Cook = '10 mins'
      data.Total = '25 mins'
      data.Servings = '4 servings'
      data.Directions = [
        'With a sharp knife, cut shrimp in half so that the meat is exposed in the shell.',
        ' In a small saucepan, heat olive oil and lightly fry the garlic until just softened. Add butter and Oregano. Heat until butter has melted.',
        'Preheat an outdoor grill for medium heat and lightly oil grate.',
        'Lay shrimp out on a tray and brush generously with the butter mixture. Grill shrimp until lightly golden.',
      ]
      setRecipe(data)
    }
    if (recipeId) {
      getMetadata()
      getImage()
    }
  }, [recipeId, contractData])

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = { author: 'Guest', content: comment }
    const commentArr = [...pet.comments, newObj]
    pet.comments = [...pet.comments, newObj]
    setComment('')
  }

  let pet = {}
  if (!recipeId) {
    pet = {
      name: 'Oliver',
      img: 'https://siasky.net/OADaRfw_nMqqXCz5NXXLq5xN6R3nScEKbzsRdqdEQrLL5A',
      type: 'Cat',
      Owner: 'Luis C',
      likes: 20,
      comments: [
        { author: 'Albert', content: 'This is awesome' },
        { author: 'Angie', content: 'So Cute~' },
      ],
    }
  }

  const mintNFT = async () => {
    console.log('recipe.image', recipe.image)
    try {
      const data = await contractData.methods
        .mintNFT(recipe.image)
        .send({ from: account })
      console.log('data', data)
      setCodeHash(data)
    } catch (err) {
      console.error(err)
    }
  }

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
    window.addEventListener('unlockProtocol.status', function (event) {
      if (event.detail.state === 'unlocked') {
        alert('Worked!')
        setUnlock(true)
      }
    })
  }

  const [checked, setChecked] = React.useState(true)

  const handleCheckBox = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <StylesProvider injectFirst>
      <Container className="root-pet-details">
        <div className="">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} className="grid-container">
              <Button
                variant="contained"
                className="wallet-btn"
                color="primary"
                // onClick={mintNFT}
              >
                Buy now
              </Button>
              <br />
              <div style={{ textAling: 'center' }}></div>

              <center>
                <img className="img" src={selectedItem.image1} alt="pet" />
                <div className="flex-container">
                  <div>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </div>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </div>
              </center>

              <div className="specifications">
                <h2 style={{ margin: '3px' }}>Description</h2>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  color="textPrimary"
                >
                  {selectedItem.description}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card className="code-hash">
                <Typography
                  gutterBottom
                  variant="h5"
                  className="ingredients-title "
                >
                  {selectedItem.name}
                </Typography>

                <p className="price">
                  ${selectedItem.price ? selectedItem.price : 0}
                </p>
                <p className="retailPrice price">
                  Retail Price: ${selectedItem.retailPrice}
                </p>
                <p className="category price">
                  {' '}
                  Category: {selectedItem.category}
                </p>
                <p className="condition price">
                  Condition: {selectedItem.condition}
                </p>

                <p className="location price">
                  Location: {selectedItem.location}
                </p>
                <img
                  src={detailsImg}
                  alt="detailsImg"
                  className="direction-img"
                />
                <br />
                <div className="chef-profile">
                  <Link>
                    <Typography>
                      Listed by <strong>{selectedItem.walletAddress}</strong>
                    </Typography>
                  </Link>
                </div>
              </Card>

              <div className="code-hash">
                <Typography
                  gutterBottom
                  variant="h5"
                  className="ingredients-title"
                >
                  <p className="created ">Created: {selectedItem.created}</p>
                  Directions
                </Typography>
                There are no directions for this item.it is recommendable to
                meet in a public place.
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default ItemDetails
