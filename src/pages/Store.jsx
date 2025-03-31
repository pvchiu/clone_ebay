import { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Button, Breadcrumb, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Search } from "react-bootstrap-icons";

function Store() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortOption, setSortOption] = useState("best-match");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setIsLoading(true);
        
        const categoryResponse = await fetch(`http://localhost:9999/categories/${categoryId}`);
        if (!categoryResponse.ok) {
          throw new Error(`Failed to fetch category: ${categoryResponse.status}`);
        }
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        const productsResponse = await fetch(`http://localhost:9999/products?categoryId=${categoryId}`);
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);
        
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = conditionFilter === "all" || product.condition === conditionFilter;
    return matchesSearch && matchesCondition;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="text-center py-5 text-danger">
          <h3>Error Loading Category</h3>
          <p>{error}</p>
          <Button as={Link} to="/" variant="primary">
            Return to Home
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          eBay
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{category?.categoryName}</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="mb-4">{category?.categoryName}</h1>

      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              placeholder="Search in this name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <Search />
            </Button>
          </InputGroup>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <span className="me-2">Sort by:</span>
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="w-auto">
            <option value="best-match">Best Match</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Header>Filter by Condition</Card.Header>
            <Card.Body>
              <Form>
                <Form.Check type="radio" id="condition-all" name="condition" label="All Conditions" checked={conditionFilter === "all"} onChange={() => setConditionFilter("all")} className="mb-2" />
                <Form.Check type="radio" id="condition-new" name="condition" label="New" checked={conditionFilter === "New"} onChange={() => setConditionFilter("New")} className="mb-2" />
                <Form.Check type="radio" id="condition-used" name="condition" label="Used" checked={conditionFilter === "Used - Like New"} onChange={() => setConditionFilter("Used - Like New")} className="mb-2" />
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <p className="mb-4">{sortedProducts.length} Results</p>

          <Row xs={1} md={2} lg={3} className="g-4">
            {sortedProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {sortedProducts.length === 0 && (
            <div className="text-center py-5">
              <p>No products found. Try a different search term or filter.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Store;
