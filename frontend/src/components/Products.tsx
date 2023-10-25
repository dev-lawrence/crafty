import data from '../../data/data'; // Importing product data from a data file
import Card from './Card';

const Products = () => {
  return (
    <section className="products">
      <div className="container">
        <div className="product">
          {/* Mapping through the product data and displaying individual product cards */}
          {data.products.map((product) => (
            <div key={product.id}>
              {/* Displaying individual product card */}
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
