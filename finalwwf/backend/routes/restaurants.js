const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { getDb } = require('../db')
const { ObjectId } = require('mongodb')

// Get all restaurants
router.get('/all', async (req, res) => {
  try {
    const db = getDb()
    const restaurants = await db.collection('restaurants').find({}).toArray()
    res.json({ ok: true, restaurants })
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    res.status(500).json({ ok: false, error: 'Failed to fetch restaurants' })
  }
})

// Update a restaurant
router.put('/:id', authenticate, async (req, res) => {
  try {
    const db = getDb()
    const { id } = req.params
    const restaurant = req.body
    
    delete restaurant._id // Remove _id if present
    
    const result = await db.collection('restaurants').updateOne(
      { id: parseInt(id) },
      { $set: restaurant }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({ ok: false, error: 'Restaurant not found' })
    }

    res.json({ ok: true, message: 'Restaurant updated successfully' })
  } catch (error) {
    console.error('Error updating restaurant:', error)
    res.status(500).json({ ok: false, error: 'Failed to update restaurant' })
  }
})

// Delete a restaurant
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const db = getDb()
    const { id } = req.params
    
    const result = await db.collection('restaurants').deleteOne({ id: parseInt(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, error: 'Restaurant not found' })
    }

    res.json({ ok: true, message: 'Restaurant deleted successfully' })
  } catch (error) {
    console.error('Error deleting restaurant:', error)
    res.status(500).json({ ok: false, error: 'Failed to delete restaurant' })
  }
})

// Add a new restaurant
router.post('/', authenticate, async (req, res) => {
  try {
    const db = getDb()
    const restaurant = req.body

    // Generate a new unique ID
    const lastRestaurant = await db.collection('restaurants')
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray()
    
    restaurant.id = lastRestaurant.length > 0 ? lastRestaurant[0].id + 1 : 1

    await db.collection('restaurants').insertOne(restaurant)
    res.json({ ok: true, message: 'Restaurant added successfully', restaurant })
  } catch (error) {
    console.error('Error adding restaurant:', error)
    res.status(500).json({ ok: false, error: 'Failed to add restaurant' })
  }
})

module.exports = router