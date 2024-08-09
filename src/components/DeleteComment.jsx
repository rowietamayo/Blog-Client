import PropTypes from "prop-types";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import BlogContext from "../context/BlogContext";

export default function DeleteComment({ blogId, commentId }) {
  const { fetchBlogs } = useContext(BlogContext);

  const removeToggle = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "sweet-confirm",
        cancelButton: "sweet-cancel",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/blogs/deleteBlogComment/${blogId}/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

        if (data.message === "Comment deleted successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Comment deleted successfully",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to remove comment. Please try again later.",
          customClass: {
            confirmButton: "sweet-warning",
          },
        });
      }
    } else if (result.isDismissed) {
      Swal.fire({
        title: "Cancelled",
        text: "Comment deletion cancelled.",
        icon: "info",
        customClass: {
          confirmButton: "sweet-warning",
        },
      });
    }
    fetchBlogs();
  };

  return (
    <Button
      className="btnRemove me-2"
      variant="danger"
      size="sm"
      onClick={removeToggle}
    >
      Remove
    </Button>
  );
}

DeleteComment.propTypes = {
  blogId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};
