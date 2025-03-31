import React from 'react'; 
import { Card } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 


function ProductCard({ product }) {
  return (
    <Card className="h-100"> 

      
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img
          variant="top"
          src={product.image} 
          alt={product.name} 
          style={{ height: '360px', width: '100%', objectFit: 'fill' }} 
        />
      </Link>

      <Card.Body>
        
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <Card.Title className="text-dark h6">{product.name}</Card.Title> 
        </Link>

        <Card.Text className="text-muted small">{product.condition}</Card.Text> 
        <Card.Text className="fw-bold">${Number(product.price).toFixed(2)}</Card.Text> 

        

        
        <Card.Text className="text-muted small">
          {Number(product.shipping) === 0 ? 'Free shipping' : `$${Number(product.shipping).toFixed(2)} shipping`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard; 
