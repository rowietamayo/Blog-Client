import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Row>
      <Col xs={7} className="mx-auto my-4 text-center">
        <h1>Welcome to Blogger</h1>
        <p>
          Hello, fellow wordsmiths and <strong>creative souls!</strong>{" "}
          We&apos;re thrilled to have you here at <strong>Scribbles</strong>—the
          place where your thoughts, ideas, and dreams can run wild! Whether
          you&apos;re a seasoned writer, an aspiring artist, or just someone
          looking for a space to share their musings, this is your canvas.
          Scribbles is all about self-expression, inspiration, and the beautiful
          messiness of creativity. In this vibrant community, you can post
          anything that sparks your imagination! From heartfelt poetry and short
          stories to personal reflections, art, photography, or even random
          thoughts that pop into your mind—everything is welcome here. This is
          your chance to explore different styles, experiment with ideas, and
          connect with like-minded individuals who share your passion. So, grab
          a cup of coffee, let your imagination take flight, and start
          scribbling! We can&apos;t wait to see what you bring to the table.
          Remember, there are no rules here—just pure creativity. Dive in,
          express yourself, and enjoy the journey!{" "}
          <strong>Happy Scribbling!</strong> ✍️💫
        </p>
        {isLoggedIn ? (
          <Link className="btn btn-primary" to={"/posts"}>
            Let's Go!
          </Link>
        ) : (
          <Link className="btn btn-primary" to={"/login"}>
            Login to start
          </Link>
        )}
      </Col>
    </Row>
  );
}
