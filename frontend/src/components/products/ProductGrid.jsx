import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, onProductSelect }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
}

export default ProductGrid;