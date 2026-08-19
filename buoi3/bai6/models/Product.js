let products = [
  { id: 1, name: "Bàn phím cơ", price: 1200000, quantity: 10 },
  { id: 2, name: "Chuột không dây", price: 650000, quantity: 25 },
  { id: 3, name: "Tai nghe Gaming", price: 890000, quantity: 15 },
];

let nextId = 4;

export const getAll = () => {
  return products;
};

export const findById = (id) => {
  return products.find((product) => product.id === Number(id));
};

export const create = (data) => {
  const newProduct = {
    id: nextId++,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  };
  products.push(newProduct);
  return newProduct;
};
