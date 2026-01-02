require('dotenv').config()
const { connect, getDb } = require('./db')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'wwf'

// Restaurant image URLs from Unsplash
const IMAGES = {
  fineDining: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3',
  modernDining: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3',
  traditional: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3',
  curry: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3',
  seafood: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?ixlib=rb-4.0.3',
  southIndian: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3',
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3'
}

async function seed() {
  await connect(MONGODB_URI, MONGODB_DB)
  const db = getDb()

  console.log('Seeding districts...')
  const districts = [
    { name: 'Salem' },
    { name: 'Chennai' },
    { name: 'Coimbatore' },
    { name: 'Madurai' },
    { name: 'Tiruchirappalli' },
    { name: 'T. Nagar' },
    { name: 'Erode' },
    { name: 'Vellore' },
    { name: 'Thanjavur' },
    { name: 'Kanyakumari' },
    { name: 'Nagercoil' },
    { name: 'Thoothukudi' },
    { name: 'Dindigul' },
    { name: 'Karur' },
    { name: 'Virudhunagar' },
    { name: 'Ramanathapuram' },
    { name: 'Sivaganga' },
    { name: 'Krishnagiri' },
    { name: 'Namakkal' },
    { name: 'Perambalur' },
    { name: 'Ariyalur' },
    { name: 'Tiruvannamalai' },
    { name: 'Tiruvallur' },
    { name: 'Cuddalore' },
    { name: 'Pudukkottai' },
    { name: 'Nilgiris' }
  ]

  await db.collection('districts').deleteMany({})
  await db.collection('districts').insertMany(districts)

  console.log('Seeding restaurants...')
  const restaurants = [
    { id: 1, name: 'Salem Spice Lounge', cuisine: 'Indian, South Indian', rating: 4.7, deliveryTime: '20-30 min', distance: '1.2 km', image: IMAGES.traditional, category: 'south-indian', featured: true, featuredCategory: 'ambience', emoji: '🍛', district: 'salem' },
    { id: 2, name: 'The Salem Cafe', cuisine: 'Cafe, Continental', rating: 4.6, deliveryTime: '15-25 min', distance: '0.8 km', image: IMAGES.coffee, category: 'coffee', featured: true, featuredCategory: 'dishes', emoji: '☕', district: 'salem' },
    { id: 3, name: 'Dosa Delight', cuisine: 'South Indian', rating: 4.8, deliveryTime: '10-20 min', distance: '2.0 km', image: IMAGES.southIndian, category: 'south-indian', featured: false, featuredCategory: '', emoji: '🥞', district: 'salem' },
    { id: 4, name: 'Urban Grill', cuisine: 'BBQ, Grill', rating: 4.5, deliveryTime: '30-40 min', distance: '3.5 km', image: IMAGES.modernDining, category: 'grill', featured: true, featuredCategory: 'ambience', emoji: '🍖', district: 'salem' },
    { id: 5, name: 'Spice Mustard', cuisine: 'Indian', rating: 4.4, deliveryTime: '25-35 min', distance: '2.5 km', image: IMAGES.curry, category: 'north-indian', featured: true, featuredCategory: 'dishes', emoji: '🍲', district: 'salem' },
    { id: 6, name: 'Chennai Coastal', cuisine: 'Seafood, South Indian', rating: 4.6, deliveryTime: '30-40 min', distance: '4.0 km', image: IMAGES.seafood, category: 'seafood', featured: true, featuredCategory: 'ambience', emoji: '🦞', district: 'chennai' },
    { id: 7, name: 'Marina Bites', cuisine: 'Street Food', rating: 4.3, deliveryTime: '20-30 min', distance: '1.5 km', image: IMAGES.traditional, category: 'street-food', featured: false, featuredCategory: '', emoji: '🌮', district: 'chennai' },
    { id: 8, name: 'Coimbatore Curry House', cuisine: 'Indian', rating: 4.5, deliveryTime: '25-35 min', distance: '2.2 km', image: IMAGES.curry, category: 'north-indian', featured: true, featuredCategory: 'dishes', emoji: '🍲', district: 'coimbatore' },
    { id: 9, name: 'The Madurai Mess', cuisine: 'South Indian', rating: 4.2, deliveryTime: '15-25 min', distance: '0.9 km', image: IMAGES.southIndian, category: 'south-indian', featured: false, featuredCategory: '', emoji: '🫓', district: 'madurai' },
    { id: 10, name: 'Trichy Tandoor', cuisine: 'North Indian', rating: 4.4, deliveryTime: '30-40 min', distance: '3.0 km', image: IMAGES.fineDining, category: 'tandoor', featured: false, featuredCategory: '', emoji: '🍖', district: 'tiruchirappalli' },
    { id: 11, name: 'Salem Sweets', cuisine: 'Desserts, Sweets', rating: 4.6, deliveryTime: '10-20 min', distance: '0.6 km', image: IMAGES.traditional, category: 'dessert', featured: true, featuredCategory: 'dishes', emoji: '🍰', district: 'salem' },
    { id: 12, name: 'Coimbatore Cafe Corner', cuisine: 'Cafe, Bakery', rating: 4.1, deliveryTime: '15-25 min', distance: '1.3 km', image: IMAGES.coffee, category: 'coffee', featured: false, featuredCategory: '', emoji: '☕', district: 'coimbatore' },
    { id: 13, name: 'T. Nagar Tiffins', cuisine: 'South Indian', rating: 4.7, deliveryTime: '10-20 min', distance: '0.7 km', image: IMAGES.southIndian, category: 'south-indian', featured: false, featuredCategory: '', emoji: '🥞', district: 't. nagar' },
    { id: 14, name: 'T. Nagar Bistro', cuisine: 'Cafe, Continental', rating: 4.8, deliveryTime: '15-25 min', distance: '0.9 km', image: IMAGES.modernDining, category: 'cafe', featured: true, featuredCategory: 'ambience', emoji: '☕', district: 't. nagar' },
    { id: 15, name: 'T. Nagar Must Try', cuisine: 'Indian - Special Dishes', rating: 4.9, deliveryTime: '20-30 min', distance: '1.0 km', image: IMAGES.curry, category: 'specials', featured: true, featuredCategory: 'dishes', emoji: '🍛', district: 't. nagar' },
    
    // Featured Ambience Section
    { id: 16, name: 'Coastal Kitchen', cuisine: 'Seafood', rating: 4.6, deliveryTime: '35-50 min', distance: '3.2 km', image: IMAGES.seafood, category: 'seafood', featured: true, featuredCategory: 'ambience', emoji: '🦞', district: 'adyar', priceRange: '₹₹₹' },
    { id: 17, name: 'Urban Bistro', cuisine: 'Contemporary', rating: 4.6, deliveryTime: '30-45 min', distance: '2.8 km', image: IMAGES.modernDining, category: 'contemporary', featured: true, featuredCategory: 'ambience', emoji: '🍽️', district: 'anna nagar', priceRange: '₹₹₹' },
    { id: 18, name: 'Traditional Café', cuisine: 'South Indian', rating: 4.7, deliveryTime: '15-30 min', distance: '1.5 km', image: IMAGES.traditional, category: 'south-indian', featured: true, featuredCategory: 'ambience', emoji: '☕', district: 'mylapore', priceRange: '₹₹' },

    // Featured Dishes Section
    { id: 19, name: 'Spice Garden', cuisine: 'North Indian', rating: 4.5, deliveryTime: '30-45 min', distance: '2.3 km', image: IMAGES.curry, category: 'north-indian', featured: true, featuredCategory: 'dishes', signatureDish: 'Butter Chicken Special', emoji: '�', district: 't. nagar', priceRange: '₹₹₹' },
    { id: 20, name: 'Marine Delight', cuisine: 'Seafood', rating: 4.5, deliveryTime: '30-45 min', distance: '3.5 km', image: IMAGES.seafood, category: 'seafood', featured: true, featuredCategory: 'dishes', signatureDish: 'Special Fish Curry', emoji: '🐟', district: 'adyar', priceRange: '₹₹' },
    { id: 21, name: 'Heritage Kitchen', cuisine: 'South Indian', rating: 4.5, deliveryTime: '20-35 min', distance: '1.8 km', image: IMAGES.southIndian, category: 'south-indian', featured: true, featuredCategory: 'dishes', signatureDish: 'Special Dosa Platter', emoji: '🥞', district: 'mylapore', priceRange: '₹₹' }
  ]

  await db.collection('restaurants').deleteMany({})
  await db.collection('restaurants').insertMany(restaurants)

  console.log('Seed completed')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed', err)
  process.exit(1)
})
