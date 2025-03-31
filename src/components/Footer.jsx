import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Buy</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  eBay Money Back Guarantee
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Bidding & buying help
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Stores
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Sell</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Start selling
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Learn to sell
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Affiliates
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>About eBay</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Company info
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  News
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Policies
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Help & Contact</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Seller Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary">
                  eBay Site Map
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="text-muted">© 2025 Assignment. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

