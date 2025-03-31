import { Card } from "react-bootstrap" 
import { Link } from "react-router-dom" 


function CategoryCard({ category }) {
  return (
    
    <Link to={`/store/${category.id}`} className="text-decoration-none">
      <Card className="h-100 text-center border-0">
        
        <div className="rounded-circle mx-auto overflow-hidden" style={{ width: "150px", height: "150px" }}>
          <Card.Img
            variant="top"
            src={category.categoryImage} 
            alt={category.categoryName} 
            className="img-fluid"
            style={{ objectFit: "cover", width: "100%", height: "100%" }} 
          />
        </div>
        
        <Card.Body>
          <Card.Title className="text-dark">{category.categoryName}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default CategoryCard 
