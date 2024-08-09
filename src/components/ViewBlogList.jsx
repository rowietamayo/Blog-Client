import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BlogContext from "../context/BlogContext";
import AddBlog from "./AddBlog";
import ViewBlogPost from "./ViewBlogPost";

export default function ViewBlogList() {
  const { blogs } = useContext(BlogContext);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  return blogs.length <= 0 ? (
    <>
      <h2 className="page-title text-center mt-4">Blog Posts</h2>
      <div className="text-center my-3">
        <AddBlog />
      </div>
    </>
  ) : (
    <Container className="container">
      <h2 className="page-title text-center mt-4">Blog Posts</h2>
      <div className="text-center my-3">
        <AddBlog />
      </div>
      <Row className="mt-4">
        {blogs.map((blog) => (
          <Col key={blog._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="card h-100">
              <Card.Body className="cardBody">
                <Card.Title className="custom-card-title text-center">
                  {blog.title}
                </Card.Title>
                <Card.Subtitle className="custom-card-description text-center">
                  {blog.description}
                </Card.Subtitle>
                <Card.Text className="text-center">{blog.author}</Card.Text>
                <hr></hr>
                <Card.Text className="custom-card">{blog.content}</Card.Text>
                <Card.Text className="custom-card text-center">
                  {formatDate(blog.dateCreated)}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <ViewBlogPost blog={blog} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
