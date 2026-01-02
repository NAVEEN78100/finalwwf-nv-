const express = require('express')
const router = express.Router()
const { getDb } = require('../db')

// GET /api/explore/districts
router.get('/districts', async (req, res) => {
  try {
    const db = getDb()
    const districts = await db.collection('districts').find({}).toArray()
    res.json({ ok: true, districts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load districts' })
  }
})

// GET /api/explore/:district
router.get('/:district', async (req, res) => {
  try {
    const { district } = req.params
    const db = getDb()

    // case-insensitive match for district field (escape regex special chars so dots/spaces match literally)
    const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const escaped = escapeForRegex(district)
    const restaurants = await db
      .collection('restaurants')
      .find({ district: { $regex: `^${escaped}$`, $options: 'i' } })
      .toArray()

    // format a display name (capitalize words and preserve dots like 'T. Nagar')
    function formatDistrictName(d) {
      if (!d) return d
      return d
        .split(/\s+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    }

    // Featured sections
    const featuredAmbience = restaurants.filter((r) => r.featured && r.featuredCategory === 'ambience')
    const featuredDishes = restaurants.filter((r) => r.featured && r.featuredCategory === 'dishes')

    res.json({ ok: true, district: formatDistrictName(district), restaurants, featuredAmbience, featuredDishes })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Failed to load district data' })
  }
})

module.exports = router
