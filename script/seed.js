"use strict";

const { Sequelize } = require("sequelize");
const { randUserName } = require("@ngneat/falso");

const {
  db,
  models: { User, Product, Cart, Cart_Products },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Chamomile",
      price: 3.5,
      category: "seeds",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/55674e06e4b0830d6f6d4322/1434731100813-B54G5WATAWUENQNZ87W9/german+chamomile.jpg",
      description:
        "Commonly used to make herbal infusions.  Can be used in teas, sooth stiff muscles and helps in treating skin irritations",
    }),

    Product.create({
      name: "Elderberry",
      price: 3.0,
      category: "seeds",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Sambucus-berries.jpg",
      description:
        "Packed with antioxidants and vitamins.  Can be used to create medicine to help treat headaches or cooked to make juice, jams, and chutneys",
    }),

    Product.create({
      name: "Skullcap",
      price: 3.0,
      category: "seeds",
      imageUrl:
        "https://strictlymedicinalseeds.com/wp-content/uploads/Scutellaria_barbata_flowers.jpg",
      description:
        "A plant in the mint family. Can be used to help protect skin and can also brighten skin (see our books collection for further information!)",
    }),

    Product.create({
      name: "Chamomile/Calendula",
      price: 6.0,
      category: "kits",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0311/9919/9367/articles/A565853E-5108-4BC0-9ED7-A34585E51CF4-86D3EE2D-4ABA-44E8-BFCB-9E94A765067B_1100x.JPG",
      description:
        "Have double the flowers with this seed set of 2 powerhouses in teas!",
    }),

    Product.create({
      name: "Elderberry/Mortar & Pestle",
      price: 40.0,
      category: "kits",
      imageUrl:
        "https://drlynnlafferty.com/wp-content/uploads/2020/05/Elderberry-Mortar-and-Pestle-scaled-1.jpeg",
      description:
        "Complete your at home station with this mortar and pestle kit that comes with elderberry seeds!",
    }),

    Product.create({
      name: "Travel Apothecary Jars: 3 Piece Kit",
      price: 200.0,
      category: "kits",
      imageUrl:
        "https://secure.img1-fg.wfcdn.com/im/23918799/compr-r85/1333/133353450/2-liter-3-piece-apothecary-jar-set.jpg",
      description: "Store your own remedies and take them on the go",
    }),

    Product.create({
      name: "Modern Herbalism",
      price: 15.0,
      category: "books",
      imageUrl:
        "https://i.pinimg.com/736x/80/8a/f1/808af17026c6f59d20a6876768fc2ecb.jpg",
      description: "For all of your herbalist needs!",
    }),

    Product.create({
      name: "DIY Apothecary Recipes",
      price: 15.0,
      category: "books",
      imageUrl:
        "https://media.istockphoto.com/photos/brown-leather-cover-picture-id463241697?k=20&m=463241697&s=612x612&w=0&h=Ha2Zv7YGbyBtXDUO2ODOahk1j2DaSQpaTf-28_g4wyc=",
      description:
        "A book containing all-time popular recipes for at home remedies, teas, and so on or to even write your own!",
    }),

    Product.create({
      name: "The Apothecary Secret",
      price: 15.0,
      category: "books",
      imageUrl:
        "https://spongekids.com/wp-content/uploads/2014/09/diy-book-cover-ideas/4-old-books-make-great-journals.jpg",
      description:
        "Become your own at home apothecary by learning the secrets of old apothecaries tools",
    }),
  ]);

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: true }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const carts = await Promise.all([
    Cart.create({ isComplete: false, userId: 1 }),
    Cart.create({ isComplete: false, userId: 2 }),
    Cart.create({ isComplete: false }),
    Cart.create({ isComplete: false }),
  ]);

  const cartProducts = await Promise.all([
    Cart_Products.create({ quantity: 5, cartId: 1, productId: 3 }),
    Cart_Products.create({ quantity: 7, cartId: 2, productId: 7 }),
    Cart_Products.create({ quantity: 3, cartId: 4, productId: 2 }),
  ]);

  for (let i = 0; i < 20; i++) {
    await User.create({ username: randUserName(), password: "123" });
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded ${cartProducts.length} cart products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
