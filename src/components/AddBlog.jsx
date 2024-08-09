import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import BlogContext from "../context/BlogContext";

export default function AddBlog() {
  const { fetchBlogs } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const addBlog = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/blogs/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        content,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error !== "Error adding Blog") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Blog Successfully Posted",
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

  return (
    <>
      <Button
        className="btnUpdate"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Add Blog Post
      </Button>

      <Modal id="create-modal" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={addBlog}>
          <Modal.Header closeButton>
            <Modal.Title>Add Blog Post</Modal.Title>
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
