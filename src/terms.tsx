import "./98.css";
import "./docs.css";
import "./vs.css";
import { NavLink } from "react-router";

function Terms() {
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
        <h1>Terms of Service</h1>
        <p>
          <strong>Last Updated:</strong> 01/12/2024
        </p>

        <p>
          By using{" "}
          <a href="https://milliondollarglobe.com" target="_blank">
            milliondollarglobe.com
          </a>{" "}
          you agree to the following terms:
        </p>
        <ul>
          <li>
            <strong>Nature of Purchase:</strong> Purchasing a block grants you
            the right to display content on a designated area of our virtual
            sphere. This is a license, not ownership, and only on the area
            chosen at purchase. The image cannot be changed post-upload unless
            in exceptional circumstances such as the site no longer exists or a
            full rebrand. The site and globe aim to stay indefinitely, but it
            will be online for at least 5 years as the goal is to create
            internet history.
          </li>
          <li>
            <strong>Content Rules:</strong> You are responsible for the content
            displayed. Inappropriate, illegal, or copyrighted material may be
            removed without refund.
          </li>
          <li>
            <strong>Refund Policy:</strong> All purchases are final and
            non-refundable. If you request to remove your site and link, it is
            possible; however, no refund is provided, and the plots will be
            available for sale. If an image or link is removed, you can request
            to change it to a more acceptable one.
          </li>
          <li>
            <strong>Liability:</strong> We are not liable for technical issues,
            downtime, or losses related to your use of the Website.
          </li>
          <li>
            <strong>Dispute Resolution:</strong> Disputes will be resolved under
            the laws of [Jurisdiction/City].
          </li>
        </ul>

        <h2>Privacy Policy</h2>
        <p>
          We collect limited personal data (e.g., name, email, payment info) to
          process transactions and improve our services. Data may be shared with
          third-party providers like payment processors. For questions or data
          requests, contact us at{" "}
          <a href="mailto:milliondollarglobeinfo@gmail.com">
            milliondollarglobeinfo@gmail.com
          </a>
          .
        </p>

        <h2>Copyright</h2>
        <p>
          Users retain rights to their uploaded content but grant us the right
          to display it. The Website design and concept remain our property.
        </p>

        <h2>Payment Terms</h2>
        <p>
          Payments are processed in USD. Taxes, if applicable, are your
          responsibility.
        </p>

        <h2>Contact</h2>
        <p>
          Email:{" "}
          <a href="mailto:milliondollarglobeinfo@gmail.com">
            milliondollarglobeinfo@gmail.com
          </a>
        </p>
      </main>
    </div>
  );
}

export default Terms;
