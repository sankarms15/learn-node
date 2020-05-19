const MIN = 1;
const MAX = 5;

const products = [
  {
    id: 123,
    manufacturer: 'Apple',
    model: 'iPhone XS',
    price: 1799,
    description: 'Latest and most power iPhone with 5.8inch screen'
  },
  {
    id: 124,
    manufacturer: 'Samsung',
    model: 'Note 9',
    price: 1499,
    description: 'Latest Note 9 with yellow stylus and 6.4inch screen'
  },
  {
    id: 125,
    manufacturer: 'Google',
    model: 'Pixel 3',
    price: 1399,
    description: 'Latest Pixel with the best camera in a smartphone'
  },
  {
    id: 126,
    manufacturer: 'OnePlus',
    model: '6T',
    price: 899,
    description: 'Latest OnePlus with a built-in fingerprint reader'
  }
];

const randomNumber = (min = 200, max = 2000) => Math.floor(Math.random()*(max - min) + min);

const shouldThrowError = () => (randomNumber(MAX, MIN) === 3) ? true: false;

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.list = async function () {
  if (shouldThrowError()) {
    throw(new Error('An unknown error occurred'));
  }

  await sleep(
    randomNumber()
  );
  return products;
};