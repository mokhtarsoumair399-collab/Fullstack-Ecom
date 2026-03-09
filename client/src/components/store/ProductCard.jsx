import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../../utils/routeHelpers';

const ProductCard = ({ product }) => (
  <article className="card product-card">
    <img src={resolveImageUrl(product.imageUrl)} alt={product.name} />
    <div className="card-content">
      <p className="product-category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <Link className="btn" to={`/product/${product._id}`}>View Details</Link>
    </div>
  </article>
);

export default ProductCard;
