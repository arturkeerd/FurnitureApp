export const products = [
  {
    id: 1,
    title: "Bar Chair",
    image: require('@/assets/images/barchair.png'),
    category: 1,
    price: "$ 120.00",
  },
  {
    id: 2,
    title: "Modern Mini Table",
    image: require('@/assets/images/table1.png'),
    category: 2,
    price: "$ 90.00",
  },
  {
    id: 3,
    title: "Modern Armchair",
    image: require('@/assets/images/armchair1.png'),
    category: 3,
    price: "$ 130.00",
  },
  {
    id: 4,
    title: "Velvet Armchair",
    image: require('@/assets/images/armchair2.png'),
    category: 3,
    price: "$ 145.00",
  },
  {
    id: 5,
    title: "Cotton King Bed",
    image: require('@/assets/images/bed1.png'),
    images: [
      require('@/assets/images/bed2.png'),
      require('@/assets/images/bed3.png'),
    ],
    category: 4,
    price: "$ 410.00",
  },
];