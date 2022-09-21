'use strict'

const {db, models: {User, Product} } = require('../server/db');


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Chamomile',
      price: 3.00,
      category: 'seeds',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/55674e06e4b0830d6f6d4322/1434731100813-B54G5WATAWUENQNZ87W9/german+chamomile.jpg',
      description: 'Commonly used to make herbal infusions.  Can be used in teas, sooth stiff muscles and helps in treating skin irritations',
    }),

    Product.create({
      name: 'Elderberry',
      price: 3.00,
      category: 'seeds',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Sambucus-berries.jpg',
      description: 'Packed with antioxidants and vitamins.  Can be used to create medicine to help treat headaches or cooked to make juice, jams, and chutneys',
    }),

    Product.create({
      name: 'Skullcap',
      price: 3.00,
      category: 'seeds',
      imageUrl: 'https://strictlymedicinalseeds.com/wp-content/uploads/Scutellaria_barbata_flowers.jpg',
      description: 'A plant in the mint family. Can be used to help protect skin and can also brighten skin (see our books collection for further information!)',
    }),

    Product.create({
      name: 'Chamomile/Calendula',
      price: 6.00,
      category: 'kits',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0311/9919/9367/articles/A565853E-5108-4BC0-9ED7-A34585E51CF4-86D3EE2D-4ABA-44E8-BFCB-9E94A765067B_1100x.JPG',
      description: 'Have double the flowers with this seed set of 2 powerhouses in teas!',
    }),

    Product.create({
      name: 'Elderberry/Mortar & Pestle',
      price: 40.00,
      category: 'kits',
      imageUrl: 'https://drlynnlafferty.com/wp-content/uploads/2020/05/Elderberry-Mortar-and-Pestle-scaled-1.jpeg',
      description: 'Complete your at home station with this mortar and pestle kit that comes with elderberry seeds!',
    }),

    Product.create({
      name: 'Travel Apothecary Jars: 3 Piece Kit',
      price: 200.00,
      category: 'kits',
      imageUrl: 'https://secure.img1-fg.wfcdn.com/im/23918799/compr-r85/1333/133353450/2-liter-3-piece-apothecary-jar-set.jpg',
      description: 'Store your own remedies and take them on the go',
    }),

    Product.create({
      name: 'Modern Herbalism',
      price: 15.00,
      category: 'books',
      imageUrl: '',
      description: 'A fantastic book that describes verious herbs and the many purposes of the herbs',
    }),

    Product.create({
      name: 'DIY Apothecary Recipes',
      price: 15.00,
      category: 'books',
      imageUrl: '',
      description: 'A book containing all-time popular recipes for at home remedies, teas, and so on',
    }),

    Product.create({
      name: 'Be Your Own Apothecary!',
      price: 15.00,
      category: 'books',
      imageUrl: '',
      description: 'Become your own at home apothecary with the necessary tools already in your home or specialty tools',
    }),

  ])

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
