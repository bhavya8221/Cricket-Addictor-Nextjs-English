import { useState } from "react";

function ProductsPage({ products }) {

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: { products: "hello" } };
}

export default ProductsPage;
