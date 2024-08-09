import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import BlogContext from "../context/BlogContext";

export default function UpdatePost({ blog }) {
  const { fetchBlogs } = useContext(BlogContext);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [description, setDescription] = useState(blog.description);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const updateBlog = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/blogs/updateBlog/${blog._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Blog post updated successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Blog post successfully updated",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
          console.log(data.error);
        }
        setTitle("");
        setContent("");
        setDescription();
        fetchBlogs();
        closeEdit();
      });
  };

  useEffect(() => {
    if (showEdit && blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setDescription(blog.description);
    }
  }, [showEdit]);

  return (
    <>
      <Button
        className="btnUpdate me-2"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Update
      </Button>

      <Modal id="create-modal" show={showEdit} onHide={closeEdit} size="lg">
        <Form onSubmit={updateBlog}>
          <Modal.Header closeButton>
            <Modal.Title>Update Blog Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blogContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blogDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

UpdatePost.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
