import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Card } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 

function Home() {
  
  const [categories, setCategories] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const response = await fetch('http://localhost:9999/categories'); 
        console.log("Categories response status:", response.status);
        
        if (!response.ok) {
          throw new Error('Network response was not ok'); 
        }
        
        const data = await response.json(); 
        console.log("Categories data:", data);
        setCategories(data); 
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message); 
        setIsLoading(false); 
      }
    };

    fetchCategories(); 
  }, []);

  
  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  
  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <Container>
      
      <div className="bg-light p-5 mb-5 rounded">
        <h1>Welcome to eBay Clone</h1>
        <p className="lead">Find great deals on electronics, fashion, home & garden, and more.</p>
      </div>

      
      <section>
        <h2 className="mb-4">Explore Popular Categories</h2>
        <Row xs={2} md={3} lg={6} className="g-4">
          {categories.map(category => (
            <Col key={category.id}>
              
              <Link to={`/store/${category.id}`} className="text-decoration-none">
                <Card className="h-100 text-center border-0">
                  
                  <div className="rounded-circle mx-auto overflow-hidden" style={{ width: '150px', height: '150px' }}>
                    <Card.Img 
                      variant="top" 
                      src={category.categoryImage} 
                      alt={category.categoryName}
                      className="img-fluid"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  
                  <Card.Body>
                    <Card.Title className="text-dark">{category.categoryName}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Home; 
