import "./98.css";
import "./docs.css";
import "./vs.css";
import { NavLink } from "react-router";

function Instructions() {

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
        <h1>Instructions</h1>
        <hr />
        <p>
          This is a short instruction on how to navigate the site.
        </p>

        <h3>Making a purchase</h3>
        <p className="mb-3">
          To purchase a slot, click purchase and add the details required. 
          The image uploaded will be used as the image for the slot, and the link will be the link the user navigates to when they double click on your slot.
        </p>
        <p className="mb-3">
          You can select the part of the slot you want to purchase by clicking on the canvas provided. automatically you can only select a rectangle or a square so as to avoid issues during image placement.
          The red squares in the map indicate places that have already been purchased and thus cannot be purchased.
          if you are not satisfied with the area you have chosen to purchase and would like to remove some blocks, you can remove the grids by clicking a block on the bottom most or the right most  grid of the selection which will remove that whole line.
          This has been done to preserve the square or triangle shape to avoid issues with image placment.
        </p>

        <p className="mb-3">
          To navigate to the site represented by an image on the sphere, double click on the image.
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

export default Instructions;
