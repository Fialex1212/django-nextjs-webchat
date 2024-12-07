import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <section>
      <div className="container">
        <div>
          <h2>404</h2>
          <h2>Page not found</h2>
        </div>
        <Button>
          <Link className="text-white" href={"/"}>Back to home page</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
