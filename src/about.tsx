import { useEffect } from "react";
import "./98.css";
import "./docs.css";
import "./vs.css";

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
            <a href="#components">Components</a>
            <ul>
              <li>
                <a href="#button">Button</a>
              </li>
              <li>
                <a href="#checkbox">Checkbox</a>
              </li>
              <li>
                <a href="#option-button">OptionButton</a>
              </li>
              <li>
                <a href="#group-box">GroupBox</a>
              </li>
              <li>
                <a href="#text-box">TextBox</a>
              </li>
              <li>
                <a href="#slider">Slider</a>
              </li>
              <li>
                <a href="#dropdown">Dropdown</a>
              </li>
              <li>
                <a href="#window">Window</a>
                <ul>
                  <li>
                    <a href="#title-bar">Title Bar</a>
                  </li>
                  <li>
                    <a href="#window-contents">Window contents</a>
                  </li>
                  <li>
                    <a href="#status-bar">Status Bar</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#tree-view">TreeView</a>
              </li>
              <li>
                <a href="#tabs">Tabs</a>
              </li>
              <li>
                <a href="#table-view">TableView</a>
              </li>
              <li>
                <a href="#progress-indicator">Progress Indicator</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#issues-contributing-etc">Issues, Contributing, etc.</a>
          </li>
        </ul>
      </aside>
      <main>
        <h1>About us</h1>
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

        <h3 id="intro">Intro</h3>
        <p>
          98.css is a CSS library for building interfaces that look like Windows
          98. See more <a href="https://github.com/jdan/98.css">on GitHub</a>.
        </p>

        <div className="window margin: 32px; width: 250px">
          <div className="title-bar">
            <div className="title-bar-text">My First VB4 Program</div>

            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <p>Hello, world!</p>
            <section className="field-row justify-end">
              <button>OK</button>
              <button>Cancel</button>
            </section>
          </div>
        </div>

        <p>
          This library relies on the usage of <strong>semantic HTML</strong>. To
          make a button, you'll need to use a <code>&lt;button&gt;</code>. Input
          elements require labels. Icon buttons rely on
          <code>aria-label</code>. This page will guide you through that
          process, but accessibility is a primary goal of this project.
        </p>

        <p>
          You can override many of the styles of your elements while maintaining
          the appearance provided by this library. Need more padding on your
          buttons? Go for it. Need to add some color to your input labels? Be
          our guest.
        </p>

        <p>
          <strong>This library does not contain any JavaScript</strong>, it
          merely styles your HTML with some CSS. This means 98.css is compatible
          with your frontend framework of choice.
        </p>

        <p>
          Here is an example of{" "}
          <a href="https://codesandbox.io/s/objective-chandrasekhar-t5t6h?file=/src/index.js">
            98.css used with React
          </a>
          , and
          <a href="https://codesandbox.io/s/late-sound-miqho?file=/index.html">
            an example with vanilla JavaScript
          </a>
          . The fastest way to use 98.css is to import it from unpkg.
        </p>

        <pre className="max-w-[375px]">
          <code>
            &lt;link rel="stylesheet" href="https://unpkg.com/98.css" &gt;
          </code>
        </pre>

        <p>
          You can install 98.css from the{" "}
          <a href="https://github.com/jdan/98.css/releases">
            GitHub releases page
          </a>
          , or <a href="https://www.npmjs.com/package/98.css">from npm</a>.
        </p>
        <pre className="max-w-[375px]">
          <code>npm install 98.css</code>
        </pre>

        <h2 id="components">Components</h2>

        <section className="component">
          <h3 id="button">Button</h3>
          <div>
            <blockquote>
              A <em>command button</em>, also referred to as a push button, is a
              control that causes the application to perform some action when
              the user clicks it.
              <footer>&mdash; Microsoft Windows User Experience p. 160</footer>
            </blockquote>

            <p>
              A standard button measures 75px wide and 23px tall, with a raised
              outer and inner border. They are given 12px of horizontal padding
              by default.
            </p>

            <div className="example">
              <button>Click me</button>
              <input type="submit" />
              <input type="reset" />
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>&gt;
                    </span>
                    Click me
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;submit&quot;</span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;reset&quot;</span>{" "}
                      /&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              You can add the className <code>default</code> to any button to
              apply additional styling, useful when communicating to the user
              what default action would happen in the active window if the{" "}
              <kbd>Enter</kbd> key was pressed on Windows 98.
            </p>

            <div className="example">
              <button className="default">OK</button>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;default&quot;</span>
                      &gt;
                    </span>
                    OK
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              When buttons are clicked, the raised borders become sunken. The
              following button is simulated to be in the pressed (active) state.
            </p>

            <div className="example">
              <button className="active">I am being pressed</button>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>&gt;
                    </span>
                    I am being pressed
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Disabled buttons maintain the same raised border, but have a
              "washed out" appearance in their label.
            </p>

            <div className="example">
              <button disabled>I cannot be clicked</button>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">disabled</span>&gt;
                    </span>
                    I cannot be clicked
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Button focus is communicated with a dotted border, set 4px within
              the contents of the button. The following example is simulated to
              be focused.
            </p>

            <div className="example">
              <button className="focused">I am focused</button>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>&gt;
                    </span>
                    I am focused
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="checkbox">Checkbox</h3>
          <div>
            <blockquote>
              A <em>check box</em> represents an independent or non-exclusive
              choice.
              <footer>&mdash; Microsoft Windows User Experience p. 167</footer>
            </blockquote>

            <p>
              Checkboxes are represented with a sunken panel, populated with a
              "check" icon when selected, next to a label indicating the choice.
            </p>

            <p>
              Note: You <strong>must</strong> include a corresponding label{" "}
              <strong>after</strong> your checkbox, using the{" "}
              <code>&lt;label&gt;</code> element with a <code>for</code>{" "}
              attribute pointed at the <code>id</code> of your input. This
              ensures the checkbox is easy to use with assistive technologies,
              on top of ensuring a good user experience for all (navigating with
              the tab key, being able to click the entire label to select the
              box).
            </p>

            <div className="example">
              <input type="checkbox" id="example1" />
              <label htmlFor="example1">This is a checkbox</label>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;checkbox&quot;</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;example1&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;example1&quot;</span>
                      &gt;
                    </span>
                    This is a checkbox
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Checkboxes can be selected and disabled with the standard{" "}
              <code>checked</code> and <code>disabled</code> attributes.
            </p>

            <p>
              When grouping inputs, wrap each input in a container with the{" "}
              <code>field-row</code> className. This ensures a consistent
              spacing between inputs.
            </p>

            <div className="example">
              <div className="field-row">
                <input checked type="checkbox" id="example2" />
                <label htmlFor="example2">I am checked</label>
              </div>
              <div className="field-row">
                <input disabled type="checkbox" id="example3" />
                <label htmlFor="example3">I am inactive</label>
              </div>
              <div className="field-row">
                <input checked disabled type="checkbox" id="example4" />
                <label htmlFor="example4">
                  I am inactive but still checked
                </label>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">checked</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;checkbox&quot;</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;example2&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;example2&quot;</span>
                      &gt;
                    </span>
                    I am checked
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">disabled</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;checkbox&quot;</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;example3&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;example3&quot;</span>
                      &gt;
                    </span>
                    I am inactive
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">checked</span>{" "}
                      <span className="hljs-attr">disabled</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;checkbox&quot;</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;example4&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;example4&quot;</span>
                      &gt;
                    </span>
                    I am inactive but still checked
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="option-button">OptionButton</h3>
          <div>
            <blockquote>
              An <em>option button</em>, also referred to as a radio button,
              represents a single choice within a limited set of mutually
              exclusive choices. That is, the user can choose only one set of
              options.
              <footer>&mdash; Microsoft Windows User Experience p. 164</footer>
            </blockquote>

            <p>
              Option buttons can be used via the <code>radio</code> type on an
              input element.
            </p>

            <p>
              Option buttons can be grouped by specifying a shared{" "}
              <code>name</code> attribute on each input. Just as before: when
              grouping inputs, wrap each input in a container with the
              <code>field-row</code> className to ensure a consistent spacing
              between inputs.
            </p>

            <div className="example">
              <div className="field-row">
                <input id="radio5" type="radio" name="first-example" />
                <label htmlFor="radio5">Yes</label>
              </div>
              <div className="field-row">
                <input id="radio6" type="radio" name="first-example" />
                <label htmlFor="radio6">No</label>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio5&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;first-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio5&quot;</span>
                      &gt;
                    </span>
                    Yes
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio6&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;first-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio6&quot;</span>
                      &gt;
                    </span>
                    No
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Option buttons can also be <code>checked</code> and{" "}
              <code>disabled</code> with their corresponding HTML attributes.
            </p>

            <div className="example">
              <div className="field-row">
                <input id="radio7" type="radio" name="second-example" />
                <label htmlFor="radio7">Peanut butter should be smooth</label>
              </div>
              <div className="field-row">
                <input
                  checked
                  disabled
                  id="radio8"
                  type="radio"
                  name="second-example"
                />
                <label htmlFor="radio8">
                  I understand why people like crunchy peanut butter
                </label>
              </div>
              <div className="field-row">
                <input
                  disabled
                  id="radio9"
                  type="radio"
                  name="second-example"
                />
                <label htmlFor="radio9">Crunchy peanut butter is good</label>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio7&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;second-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio7&quot;</span>
                      &gt;
                    </span>
                    Peanut butter should be smooth
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">checked</span>{" "}
                      <span className="hljs-attr">disabled</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio8&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;second-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio8&quot;</span>
                      &gt;
                    </span>
                    I understand why people like crunchy peanut butter
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">disabled</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio9&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;second-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio9&quot;</span>
                      &gt;
                    </span>
                    Crunchy peanut butter is good
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="group-box">GroupBox</h3>
          <div>
            <blockquote>
              A <em>group box</em> is a special control you can use to organize
              a set of controls. A group box is a rectangular frame with an
              optional label that surrounds a set of controls.
              <footer>&mdash; Microsoft Windows User Experience p. 189</footer>
            </blockquote>

            <p>
              A group box can be used by wrapping your elements with the{" "}
              <code>fieldset</code> tag. It contains a sunken outer border and a
              raised inner border, resembling an engraved box around your
              controls.
            </p>

            <div className="example">
              <fieldset>
                <div className="field-row">Select one:</div>
                <div className="field-row">
                  <input id="radio10" type="radio" name="fieldset-example" />
                  <label htmlFor="radio10">Diners</label>
                </div>
                <div className="field-row">
                  <input id="radio11" type="radio" name="fieldset-example" />
                  <label htmlFor="radio11">Drive-Ins</label>
                </div>
                <div className="field-row">
                  <input id="radio12" type="radio" name="fieldset-example" />
                  <label htmlFor="radio12">Dives</label>
                </div>
              </fieldset>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">fieldset</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    Select one:
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio10&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio10&quot;</span>
                      &gt;
                    </span>
                    Diners
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio11&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio11&quot;</span>
                      &gt;
                    </span>
                    Drive-Ins
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio12&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio12&quot;</span>
                      &gt;
                    </span>
                    Dives
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">fieldset</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              You can provide your group with a label by placing a{" "}
              <code>legend</code> element within the <code>fieldset</code>.
            </p>

            <div className="example">
              <fieldset>
                <legend>Today's mood</legend>
                <div className="field-row">
                  <input id="radio13" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio13">Claire Saffitz</label>
                </div>
                <div className="field-row">
                  <input id="radio14" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio14">Brad Leone</label>
                </div>
                <div className="field-row">
                  <input id="radio15" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio15">Chris Morocco</label>
                </div>
                <div className="field-row">
                  <input id="radio16" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio16">Carla Lalli Music</label>
                </div>
              </fieldset>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">fieldset</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">legend</span>&gt;
                    </span>
                    Today&#x27;s mood
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">legend</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio13&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example2&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio13&quot;</span>
                      &gt;
                    </span>
                    Claire Saffitz
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio14&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example2&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio14&quot;</span>
                      &gt;
                    </span>
                    Brad Leone
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio15&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example2&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio15&quot;</span>
                      &gt;
                    </span>
                    Chris Morocco
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;radio16&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;radio&quot;</span>{" "}
                      <span className="hljs-attr">name</span>=
                      <span className="hljs-string">
                        &quot;fieldset-example2&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;radio16&quot;</span>
                      &gt;
                    </span>
                    Carla Lalli Music
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">fieldset</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="text-box">TextBox</h3>
          <div>
            <blockquote>
              A <em>text box</em> (also referred to as an edit control) is a
              rectangular control where the user enters or edits text. It can be
              defined to support a single line or multiple lines of text.
              <footer>&mdash; Microsoft Windows User Experience p. 181</footer>
            </blockquote>

            <p>
              Text boxes can rendered by specifying a <code>text</code> type on
              an
              <code>input</code> element. As with checkboxes and radio buttons,
              you should provide a corresponding label with a properly set{" "}
              <code>for</code> attribute, and wrap both in a container with the{" "}
              <code>field-row</code> className.
            </p>

            <div className="example">
              <div className="field-row">
                <label htmlFor="text17">Occupation</label>
                <input id="text17" type="text" />
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;text17&quot;</span>
                      &gt;
                    </span>
                    Occupation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;text17&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;text&quot;</span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Additionally, you can make use of the{" "}
              <code>field-row-stacked</code> className to position your label
              above the input instead of beside it.
            </p>

            <div className="example">
              <div className="field-row-stacked width: 200px">
                <label htmlFor="text18">Address (Line 1)</label>
                <input id="text18" type="text" />
              </div>
              <div className="field-row-stacked width: 200px">
                <label htmlFor="text19">Address (Line 2)</label>
                <input id="text19" type="text" />
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">
                        &quot;field-row-stacked&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 200px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;text18&quot;</span>
                      &gt;
                    </span>
                    Address (Line 1)
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;text18&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;text&quot;</span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">
                        &quot;field-row-stacked&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 200px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;text19&quot;</span>
                      &gt;
                    </span>
                    Address (Line 2)
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;text19&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;text&quot;</span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              To support multiple lines in the user's input, use the{" "}
              <code>textarea</code> element instead.
            </p>

            <div className="example">
              <div className="field-row-stacked width: 200px">
                <label htmlFor="text20">Additional notes</label>
                <textarea id="text20" rows={8}></textarea>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">
                        &quot;field-row-stacked&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 200px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;text20&quot;</span>
                      &gt;
                    </span>
                    Additional notes
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">textarea</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;text20&quot;</span>{" "}
                      <span className="hljs-attr">rows</span>=
                      <span className="hljs-string">&quot;8&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">textarea</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Text boxes can also be disabled and have value with their
              corresponding HTML attributes.
            </p>

            <div className="example">
              <div className="field-row">
                <label htmlFor="text21">Favorite color</label>
                <input id="text21" disabled type="text" value="Windows Green" />
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr">className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;text21&quot;</span>
                      &gt;
                    </span>
                    Favorite color
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;text21&quot;</span>{" "}
                      <span className="hljs-attr">disabled</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;text&quot;</span>{" "}
                      <span className="hljs-attr">value</span>=
                      <span className="hljs-string">
                        &quot;Windows Green&quot;
                      </span>
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="slider">Slider</h3>
          <div>
            <blockquote>
              A <em>slider</em>, sometimes called a trackbar control, consists
              of a bar that defines the extent or range of the adjustment and an
              indicator that shows the current value for the control...
              <footer>&mdash; Microsoft Windows User Experience p. 146</footer>
            </blockquote>

            <p>
              Sliders can rendered by specifying a <code>range</code> type on an
              <code>input</code> element.
            </p>

            <div className="example">
              <div className="field-row w-[300px]">
                <label htmlFor="range22">Volume:</label>
                <label htmlFor="range23">Low</label>
                <input id="range23" type="range" min="1" max="11" value="5" />
                <label htmlFor="range24">High</label>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 300px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;range22&quot;</span>
                      &gt;
                    </span>
                    Volume:
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;range23&quot;</span>
                      &gt;
                    </span>
                    Low
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;range23&quot;</span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;range&quot;</span>{" "}
                      <span className="hljs-attr">min</span>=
                      <span className="hljs-string">&quot;1&quot;</span>{" "}
                      <span className="hljs-attr">max</span>=
                      <span className="hljs-string">&quot;11&quot;</span>{" "}
                      <span className="hljs-attr">value</span>=
                      <span className="hljs-string">&quot;5&quot;</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;range24&quot;</span>
                      &gt;
                    </span>
                    High
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              You can make use of the <code>has-box-indicator</code> className
              replace the default indicator with a box indicator, furthermore
              the slider can be wrapped with a <code>div</code> using{" "}
              <code>is-vertical</code> to display the input vertically.
            </p>

            <p>
              Note: To change the length of a vertical slider, the{" "}
              <code>input</code> width and <code>div</code> height.
            </p>

            <div className="example">
              <div className="field-row">
                <label htmlFor="range25">Cowbell</label>
                <div className="is-vertical">
                  <input
                    id="range25"
                    className="has-box-indicator"
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value="2"
                  />
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;field-row&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">label</span>{" "}
                      <span className="hljs-attr">for</span>=
                      <span className="hljs-string">&quot;range25&quot;</span>
                      &gt;
                    </span>
                    Cowbell
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">label</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;is-vertical&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">input</span>{" "}
                      <span className="hljs-attr">id</span>=
                      <span className="hljs-string">&quot;range25&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;has-box-indicator&quot;
                      </span>{" "}
                      <span className="hljs-attr">type</span>=
                      <span className="hljs-string">&quot;range&quot;</span>{" "}
                      <span className="hljs-attr">min</span>=
                      <span className="hljs-string">&quot;1&quot;</span>{" "}
                      <span className="hljs-attr">max</span>=
                      <span className="hljs-string">&quot;3&quot;</span>{" "}
                      <span className="hljs-attr">step</span>=
                      <span className="hljs-string">&quot;1&quot;</span>{" "}
                      <span className="hljs-attr">value</span>=
                      <span className="hljs-string">&quot;2&quot;</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="dropdown">Dropdown</h3>
          <div>
            <blockquote>
              A <em>drop-down list box</em> allows the selection of only a
              single item from a list. In its closed state, the control displays
              the current value for the control. The user opens the list to
              change the value.
              <footer>&mdash; Microsoft Windows User Experience p. 175</footer>
            </blockquote>

            <p>
              Dropdowns can be rendered by using the <code>select</code> and{" "}
              <code>option</code> elements.
            </p>

            <div className="example">
              <select>
                <option>5 - Incredible!</option>
                <option>4 - Great!</option>
                <option>3 - Pretty good</option>
                <option>2 - Not so great</option>
                <option>1 - Unfortunate</option>
              </select>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">select</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    5 - Incredible!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    4 - Great!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    3 - Pretty good
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    2 - Not so great
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    1 - Unfortunate
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">select</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              By default, the first option will be selected. You can change this
              by giving one of your <code>option</code> elements the{" "}
              <code>selected</code> attribute.
            </p>

            <div className="example">
              <select>
                <option>5 - Incredible!</option>
                <option>4 - Great!</option>
                <option selected>3 - Pretty good</option>
                <option>2 - Not so great</option>
                <option>1 - Unfortunate</option>
              </select>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">select</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    5 - Incredible!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    4 - Great!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>{" "}
                      <span className="hljs-attr">selected</span>&gt;
                    </span>
                    3 - Pretty good
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    2 - Not so great
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">option</span>&gt;
                    </span>
                    1 - Unfortunate
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">option</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">select</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <h3 id="window">Window</h3>
        <p>
          The following components illustrate how to build complete windows
          using 98.css.
        </p>

        <section className="component">
          <h4 id="title-bar">Title Bar</h4>
          <div>
            <blockquote>
              At the top edge of the window, inside its border, is the title bar
              (also reffered to as the caption or caption bar), which extends
              across the width of the window. The title bar identifies the
              contents of the window.
              <footer>&mdash; Microsoft Windows User Experience p. 118</footer>
            </blockquote>

            <blockquote>
              Include command buttons associated with the common commands of the
              primary window in the title bar. These buttons act as shortcuts to
              specific window commands.
              <footer>&mdash; Microsoft Windows User Experience p. 122</footer>
            </blockquote>

            <p>
              You can build a complete title bar by making use of three classes,
              <code>title-bar</code>, <code>title-bar-text</code>, and{" "}
              <code>title-bar-controls</code>.
            </p>

            <div className="example">
              <div className="title-bar">
                <div className="title-bar-text">A Title Bar</div>
                <div className="title-bar-controls">
                  <button aria-label="Close"></button>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Title Bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              We make use of <code>aria-label</code> to render the Close button,
              to let assistive technologies know the intent of this button. You
              may also use "Minimize", "Maximize", "Restore" and "Help" like so:
            </p>

            <div className="example">
              <div className="title-bar">
                <div className="title-bar-text">A Title Bar</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>

              <br />

              <div className="title-bar">
                <div className="title-bar-text">A Maximized Title Bar</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Restore"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>

              <br />

              <div className="title-bar">
                <div className="title-bar-text">A Helpful Bar</div>
                <div className="title-bar-controls">
                  <button aria-label="Help"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Title Bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Maximize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">br</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Maximized Title Bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Restore&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">br</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Helpful Bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Help&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Each <code>aria-label</code> also has a corresponding styling
              className to render the title bar buttons, to let the{" "}
              <code>aria-label</code> text be in other languages without causing
              rendering, accessibility, or localization issues.
            </p>

            <div className="example">
              <div className="title-bar">
                <div className="title-bar-text">
                  A Title Bar using Button Styling Classes
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Any Text" className="minimize"></button>
                  <button aria-label="Any Text" className="maximize"></button>
                  <button aria-label="Any Text" className="close"></button>
                </div>
              </div>

              <br />

              <div className="title-bar">
                <div className="title-bar-text">
                  A Maximized Title Bar using Button Styling Classes
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Any Text" className="minimize"></button>
                  <button aria-label="Any Text" className="restore"></button>
                  <button aria-label="Any Text" className="close"></button>
                </div>
              </div>

              <br />

              <div className="title-bar">
                <div className="title-bar-text">
                  A Helpful Bar using Button Styling Classes
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Any Text" className="help"></button>
                  <button aria-label="Any Text" className="close"></button>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Title Bar using Button Styling Classes
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;maximize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">br</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Maximized Title Bar using Button Styling Classes
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;restore&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">br</span> /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Helpful Bar using Button Styling Classes
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;help&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Any Text&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              Maximize buttons can be disabled, useful when making a window
              appear as if it cannot be maximized.
            </p>

            <div className="example">
              <div className="title-bar">
                <div className="title-bar-text">
                  A Title Bar with Maximize disabled
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize" disabled></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Title Bar with Maximize disabled
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Maximize&quot;</span>{" "}
                      <span className="hljs-attr">disabled</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              You can make a title bar "inactive" by adding{" "}
              <code>inactive</code> className, useful when making more than one
              window.
            </p>
            <div className="example">
              <div className="title-bar inactive">
                <div className="title-bar-text">An inactive title bar</div>
                <div className="title-bar-controls">
                  <button aria-label="Close"></button>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar inactive&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    An inactive title bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h4 id="window-contents">Window contents</h4>
          <div>
            <blockquote>
              Every window has a boundary that defines its shape.
              <footer>&mdash; Microsoft Windows User Experience p. 118</footer>
            </blockquote>

            <p>
              To give our title bar a home, we make use of the{" "}
              <code>window</code> className. This provides a raised outer and
              inner border, as well as some padding. We can freely resize the
              window by specifying a width in the container style.
            </p>

            <div className="example">
              <div className="window w-[300px]">
                <div className="title-bar">
                  <div className="title-bar-text">A Complete Window</div>
                  <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                  </div>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;window&quot;</span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 300px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Complete Window
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Maximize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              To draw the contents of the window, we use the{" "}
              <code>window-body</code> className under the title bar.
            </p>

            <div className="example">
              <div className="window w-[300px]">
                <div className="title-bar">
                  <div className="title-bar-text">
                    A Window With Stuff In It
                  </div>
                  <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                  </div>
                </div>
                <div className="window-body">
                  <p>There's so much room for activities!</p>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;window&quot;</span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 300px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Window With Stuff In It
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-controls&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Minimize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Maximize&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">button</span>{" "}
                      <span className="hljs-attr">aria-label</span>=
                      <span className="hljs-string">&quot;Close&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">button</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>
                    There&#x27;s so much room for activities!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h4 id="status-bar">Status Bar</h4>
          <div>
            <blockquote>
              A status bar is a special area within a window, typically the
              bottom, that displays information about the current state of what
              is being viewed in the window or any other contextual information,
              such as keyboard state.
              <footer>&mdash; Microsoft Windows User Experience p. 146</footer>
            </blockquote>

            <p>
              You can render a status bar with the <code>status-bar</code>{" "}
              className, and <code>status-bar-field</code> for every child text
              element.
            </p>

            <div className="example">
              <div className="window  w-[320px]">
                <div className="title-bar">
                  <div className="title-bar-text">
                    A Window With A Status Bar
                  </div>
                </div>
                <div className="window-body">
                  <p> There are just so many possibilities:</p>
                  <ul>
                    <li>A Task Manager</li>
                    <li>A Notepad</li>
                    <li>Or even a File Explorer!</li>
                  </ul>
                </div>
                <div className="status-bar">
                  <p className="status-bar-field">Press F1 for help</p>
                  <p className="status-bar-field">Slide 1</p>
                  <p className="status-bar-field">CPU Usage: 14%</p>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;window&quot;</span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 320px&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;title-bar&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;title-bar-text&quot;
                      </span>
                      &gt;
                    </span>
                    A Window With A Status Bar
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>{" "}
                    There are just so many possibilities:
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    A Task Manager
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    A Notepad
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Or even a File Explorer!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;status-bar&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;status-bar-field&quot;
                      </span>
                      &gt;
                    </span>
                    Press F1 for help
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;status-bar-field&quot;
                      </span>
                      &gt;
                    </span>
                    Slide 1
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;status-bar-field&quot;
                      </span>
                      &gt;
                    </span>
                    CPU Usage: 14%
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="tree-view">TreeView</h3>
          <div>
            <blockquote>
              A <em>tree view control</em> is a special list box control that
              displays a set of objects as an indented outline based on their
              logical hierarchical relationship.
              <footer>&mdash; Microsoft Windows User Experience p. 178</footer>
            </blockquote>

            <p>
              To render a tree view, use an <code>ul</code> element with the
              <code>tree-view</code> className. The children of this list (
              <code>li</code> elements), can contain whatever you'd like.
            </p>

            <div className="example">
              <ul className="tree-view">
                <li>We can put</li>
                <li>
                  <strong className="text-purple-500">✨ Whatever ✨</strong>
                </li>
                <li>We want in here</li>
              </ul>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;tree-view&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    We can put
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">strong</span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;color: purple&quot;
                      </span>
                      &gt;
                    </span>
                    ✨ Whatever ✨
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">strong</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    We want in here
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              To make this a tree, we can nest further <code>ul</code> elements
              (no className needed on these). This will provide them with a nice
              dotted border and indentation to illustrate the structure of the
              tree.
            </p>
            <p>
              To create expandable sections, wrap child lists inside of
              <code>details</code> elements.
            </p>

            <div className="example">
              <ul className="tree-view">
                <li>Table of Contents</li>
                <li>What is web development?</li>
                <li>
                  CSS
                  <ul>
                    <li>Selectors</li>
                    <li>Specificity</li>
                    <li>Properties</li>
                  </ul>
                </li>
                <li>
                  <details open>
                    <summary>JavaScript</summary>
                    <ul>
                      <li>Avoid at all costs</li>
                      <li>
                        <details>
                          <summary>Unless</summary>
                          <ul>
                            <li>Avoid</li>
                            <li>
                              <details>
                                <summary>At</summary>
                                <ul>
                                  <li>Avoid</li>
                                  <li>At</li>
                                  <li>All</li>
                                  <li>Cost</li>
                                </ul>
                              </details>
                            </li>
                            <li>All</li>
                            <li>Cost</li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>HTML</li>
                <li>Special Thanks</li>
              </ul>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;tree-view&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Table of Contents
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    What is web development?
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    CSS
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Selectors
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Specificity
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Properties
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">details</span>{" "}
                      <span className="hljs-attr">open</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">summary</span>&gt;
                    </span>
                    JavaScript
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">summary</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Avoid at all costs
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">details</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">summary</span>&gt;
                    </span>
                    Unless
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">summary</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Avoid
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">details</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">summary</span>&gt;
                    </span>
                    At
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">summary</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Avoid
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    At
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    All
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Cost
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">details</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    All
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Cost
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">details</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">details</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    HTML
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>&gt;
                    </span>
                    Special Thanks
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">ul</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="tabs">Tabs</h3>
          <div>
            <blockquote>
              A <em>tab control</em> is analogous to a divider in a file cabinet
              or notebook. You can use this control to define multiple logical
              pages or sections of information within the same window.
              <footer>&mdash; Microsoft Windows User Experience p. 193</footer>
            </blockquote>

            <p>
              To render a tab list, use a <code>menu</code> element with the
              <code>[role=tablist]</code> attribute. The children of this menu (
              <code>li</code> elements), should get a <code>[role=tab]</code>{" "}
              attribute.
            </p>

            <p>
              Tabs should be managed by adding custom javascript code. All you
              need is to add the <code>[aria-selected=true]</code> attribute to
              the active tab.
            </p>

            <div className="example">
              <div className="window-body">
                <p>Hello, world!</p>

                <menu role="tablist">
                  <li role="tab" aria-selected="true">
                    <a href="#tabs">Desktop</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">My computer</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Control panel</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Devices manager</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Hardware profiles</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Performance</a>
                  </li>
                </menu>
                <div className="window" role="tabpanel">
                  <div className="window-body">
                    <p>the tab content</p>
                  </div>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>
                    Hello, world!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">menu</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tablist&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>{" "}
                      <span className="hljs-attr">aria-selected</span>=
                      <span className="hljs-string">&quot;true&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Desktop
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    My computer
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Control panel
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Devices manager
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Hardware profiles
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Performance
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">menu</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;window&quot;</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tabpanel&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>
                    the tab content
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <p>
              To create multirows tabs, add a <code>multirows</code> className
              to the <code>menu</code> tag.
            </p>

            <div className="example">
              <div className="window-body">
                <p>Hello, world!</p>

                <menu role="tablist" className="multirows">
                  <li role="tab">
                    <a href="#tabs">Desktop</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">My computer</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Control panel</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Devices manager</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Hardware profiles</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Performance</a>
                  </li>
                </menu>
                <menu role="tablist" className="multirows">
                  <li role="tab">
                    <a href="#tabs">Users</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Network</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Programs</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Services</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Resources</a>
                  </li>
                  <li role="tab">
                    <a href="#tabs">Advanced</a>
                  </li>
                </menu>
                <div className="window" role="tabpanel">
                  <div className="window-body">
                    <p>the tab content</p>
                  </div>
                </div>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>
                    Hello, world!
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">menu</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tablist&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;multirows&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Desktop
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    My computer
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Control panel
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Devices manager
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Hardware profiles
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Performance
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">menu</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">menu</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tablist&quot;</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;multirows&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Users
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Network
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Programs
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Services
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Resources
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">li</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tab&quot;</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">a</span>{" "}
                      <span className="hljs-attr">href</span>=
                      <span className="hljs-string">&quot;#tabs&quot;</span>&gt;
                    </span>
                    Advanced
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">a</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">li</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">menu</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">&quot;window&quot;</span>{" "}
                      <span className="hljs-attr">role</span>=
                      <span className="hljs-string">&quot;tabpanel&quot;</span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;window-body&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">p</span>&gt;
                    </span>
                    the tab content
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">p</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>
        <section className="component">
          <h3 id="table-view">TableView</h3>
          <div>
            <p>
              To render a table view, use a table element. Wrap it with a div
              element with <code>sunken-panel</code> className to provide proper
              border and overflow container.
            </p>
            <p>
              With a bit of extra scripting you can make table view interactive.
              Give <code>interactive</code> className to table element to show
              pointer cursor when hovering over body rows. Table rows can be
              given
              <code>highlighted</code> className to appear selected.
            </p>

            <div className="example">
              <div className="sunken-panel h-[120px] w-[240px]">
                <table className="interactive">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Version</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MySQL ODBC 3.51 Driver</td>
                      <td>3.51.11.00</td>
                      <td>MySQL AB</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td>SQL Server</td>
                      <td>3.70.06.23</td>
                      <td>Microsoft Corporation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;sunken-panel&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;height: 120px; width: 240px;&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">table</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;interactive&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">thead</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">th</span>&gt;
                    </span>
                    Name
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">th</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">th</span>&gt;
                    </span>
                    Version
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">th</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">th</span>&gt;
                    </span>
                    Company
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">th</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">thead</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tbody</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    MySQL ODBC 3.51 Driver
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.51.11.00
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    MySQL AB
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    SQL Server
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    3.70.06.23
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">td</span>&gt;
                    </span>
                    Microsoft Corporation
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">td</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tr</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">tbody</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">table</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">script</span>&gt;
                    </span>
                    <table className="interactive">
                      <thead>
                        <tr>
                          <th>Column 1</th>
                          <th>Column 2</th>
                          <th>Column 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Row 1, Col 1</td>
                          <td>Row 1, Col 2</td>
                          <td>Row 1, Col 3</td>
                        </tr>
                        <tr>
                          <td>Row 2, Col 1</td>
                          <td>Row 2, Col 2</td>
                          <td>Row 2, Col 3</td>
                        </tr>
                        <tr>
                          <td>Row 3, Col 1</td>
                          <td>Row 3, Col 2</td>
                          <td>Row 3, Col 3</td>
                        </tr>
                      </tbody>
                    </table>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">script</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <section className="component">
          <h3 id="progress-indicator">Progress Indicator</h3>
          <div>
            <blockquote>
              You can use a <em>progress indicator</em>, also known as a{" "}
              <em>progress bar control</em>, to show the percentage of
              completion of a lengthy operation.
              <footer>&mdash; Microsoft Windows User Experience p. 189</footer>
            </blockquote>

            <p>
              There are two types of progress bars: solid and segmented. The
              solid version is the default. To declare a segmented bar, you
              should use the <code>segmented</code> className.
            </p>

            <div className="example">
              <div className="progress-indicator">
                <span className="progress-indicator-bar  w-40%;" />
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;progress-indicator&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">span</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;progress-indicator-bar&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 40%;&quot;
                      </span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>

            <div className="example">
              <div className="progress-indicator segmented">
                <span className="progress-indicator-bar  w-40%;" />
              </div>
              <details>
                <summary>Show code</summary>
                <pre>
                  <code>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">div</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;progress-indicator segmented&quot;
                      </span>
                      &gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;<span className="hljs-name">span</span>{" "}
                      <span className="hljs-attr"> className</span>=
                      <span className="hljs-string">
                        &quot;progress-indicator-bar&quot;
                      </span>{" "}
                      <span className="hljs-attr">style</span>=
                      <span className="hljs-string">
                        &quot;width: 40%;&quot;
                      </span>{" "}
                      /&gt;
                    </span>
                    <span className="hljs-tag">
                      &lt;/<span className="hljs-name">div</span>&gt;
                    </span>
                  </code>
                </pre>
              </details>
            </div>
          </div>
        </section>

        <h2 id="issues-contributing-etc">Issues, Contributing, etc.</h2>

        <p>
          98.css is{" "}
          <a href="https://github.com/jdan/98.css/blob/main/LICENSE">
            MIT licensed
          </a>
          .
        </p>

        <p>
          Refer to{" "}
          <a href="https://github.com/jdan/98.css/issues">
            the GitHub issues page
          </a>{" "}
          to see bugs in my CSS or report new ones. I'd really like to see your
          pull requests (especially those new to open-source!) and will happily
          provide code review. 98.css is a fun, silly project and I'd like to
          make it a fun place to build your open-source muscle.
        </p>

        <p>
          Thank you for checking my little project out, I hope it brought you
          some joy today. Consider
          <a href="https://github.com/jdan/98.css/stargazers">
            starring/following along on GitHub
          </a>{" "}
          and maybe subscribing to more fun things on{" "}
          <a href="https://twitter.com/jdan">my twitter</a>. 👋
        </p>
      </main>
    </div>
  );
}

export default About;
