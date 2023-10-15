export const cats = [
  {
    id: 1,
    name: "Luna",
    age: 2,
    gender: "female",
    breed: "parsian",
    price: 3000,
    img: "./images/cat-1.png",
  },
  {
    id: 2,
    name: "Leo",
    age: 3,
    gender: "male",
    breed: "bengal",
    price: 4000,
    img: "./images/cat-2.png",
  },
  {
    id: 3,
    name: "Minima",
    age: 2,
    gender: "male",
    breed: "abyssian",
    price: 5000,
    img: "./images/cat-3.png",
  },
  {
    id: 4,
    name: "Jalan",
    age: 2,
    gender: "male",
    breed: "parsian",
    price: 3000,
    img: "./images/cat-4.png",
  },
  {
    id: 5,
    name: "Cathy",
    age: 3,
    gender: "female",
    breed: "burmese",
    price: 2500,
    img: "./images/cat-5.png",
  },
];

export function getProductData(id) {
  let productData = cats.find((product) => product.id === id);
  // console.log("Product data: ", productData);
  if (productData === undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}
