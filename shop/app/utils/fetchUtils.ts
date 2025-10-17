export default async function fetchProducts() {
  // const res = await fetch("http://localhost:8000/products.json");
  // .then((res) => res.json())
  // .then(data => {
  //   products = data;
  // })

  try {
    const response = await fetch("http://localhost:8000/products.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // const result = await response.json();
    // return result;

    return await response.json();
  } catch (error) {
    //console.error(error.message);
    return null;
  }
}
