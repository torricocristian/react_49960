
import '../assets/styles/product.scss';
import {Link} from 'react-router-dom';
import placeholder from '../assets/images/placeholder.jpg';

export const Product = (props) => {
    const{title, image, price, category, slug} = props.product;

    return (

        <Link to={'/productos/' + slug} className="product">
            
            <figure>
                {
                    image ? <img src={image} alt={title} /> : <img src={placeholder} alt={title} />
                }
            </figure>
            <div className="data">
                <span className="category">{category}</span>
                <h3>{title}</h3>
                <span className="price">${price}</span>
            </div>
        </Link>
    )
}
