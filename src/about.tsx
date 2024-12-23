import { useEffect } from "react";
import img from "./assets/logo.jpg"
import "./98.css";
import "./docs.css";
import "./vs.css";
import { NavLink } from "react-router";

function About() {
  useEffect(() => {
    const handleRowClick = (event: Event) => {
      const highlightedClass = "highlighted";

      const isRow = (element: HTMLElement) => {
        return (
          element.tagName === "TR" && element.parentElement?.tagName === "TBODY"
        );
      };

      const newlySelectedRow = event
        .composedPath()
        .find((el) => el instanceof HTMLElement && isRow(el)) as
        | HTMLElement
        | undefined;

      if (!newlySelectedRow) return;

      const previouslySelectedRow = Array.from(
        newlySelectedRow.parentElement?.children || []
      )
        .filter((el): el is HTMLElement => isRow(el as HTMLElement))
        .find((el) => el.classList.contains(highlightedClass));

      if (previouslySelectedRow) {
        previouslySelectedRow.classList.toggle(highlightedClass);
      }

      newlySelectedRow.classList.toggle(highlightedClass);
    };

    const tables =
      document.querySelectorAll<HTMLTableElement>("table.interactive");
    tables.forEach((table) => {
      table.addEventListener("click", handleRowClick);
    });

    return () => {
      tables.forEach((table) => {
        table.removeEventListener("click", handleRowClick);
      });
    };
  }, []);

  return (
    <div className="bg-[#c0c0c0] h-fit overflow-hidden">
      <aside>
        <ul className="tree-view">
          <li>
            <a href="#intro">Intro</a>
          </li>
          <li>
            <a href="#components">About</a>
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/terms">Terms</NavLink>
              </li>
              <li>
                <NavLink to="/instructions">Instructions</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <main>
        <div className="flex items-center ">
        <h1 className="mr-6">About us</h1>
        <img src={img} alt="logo" className="h-20 w-20"/>
        </div>
        <hr />
        <p>
          A groundbreaking digital advertising platform that reimagines virtual
          real estate. Inspired by the concept of pixel-based advertising, this
          unique 3D sphere offers one million blocks for sale, each representing
          a piece of a vibrant, interactive global canvas.
        </p>

        <h3>What is The Million Dollar Globe?</h3>
        <p>
          The Million Dollar Globe is a virtual 3D sphere divided into one
          million blocks, available for purchase. Buyers can claim their blocks
          to display custom content—logos, images, links, or messages—and become
          part of a dynamic, ever-evolving digital monument visible to the
          world.
        </p>

        <h3>Why Join the Globe?</h3>
        <ul>
          <li>
            <strong>Global Reach:</strong> Showcase your brand or message on a
            platform that’s designed for visibility and creativity.
          </li>
          <li>
            <strong>Immortalize Your Spot:</strong> Each block purchased becomes
            a lasting part of the globe.
          </li>
          <li>
            <strong>Innovative Advertising:</strong> Stand out from the crowd
            with a unique, memorable presence in the digital space.
          </li>
        </ul>

        <h3>Be Part of History</h3>
        <p>
          The Million Dollar Globe is more than just an advertising
          platform—it’s a creative, collaborative project that combines
          innovation, art, and opportunity. Whether you’re a business, artist,
          or individual, this is your chance to claim a piece of virtual
          history.
        </p>

        <p>
          Visit{" "}
          <a href="https://milliondollarglobe.com">milliondollarglobe.com</a> to
          reserve your blocks today and join a community shaping the future of
          digital advertising!
        </p>
      </main>
    </div>
  );
}

export default About;
