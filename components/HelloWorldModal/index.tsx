import React from "react";

import { StyledContent, StyledSection } from "./styles";

const HelloWorldModal: React.FC = () => {
  return (
    <StyledContent>
      <StyledSection>
        <h1>Hello World!</h1>
        <p>
          Welcome to the modal component demonstration. This modal showcases all
          the requested features including scrollable content, background
          dimming, and various ways to close the modal.
        </p>
      </StyledSection>

      <StyledSection>
        <h2>Features Demonstrated</h2>
        <ul>
          <li>✅ Dimming out the background</li>
          <li>✅ Disabling controls in the background</li>
          <li>✅ Self scroll for long content</li>
          <li>✅ Close X button at the top right</li>
          <li>✅ ESC key binding to close</li>
          <li>✅ Click outside of the modal to close</li>
          <li>✅ Generic component that accepts children</li>
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>How to Close This Modal</h2>
        <p>You can close this modal in several ways:</p>
        <ol>
          <li>Click the × button in the top-right corner</li>
          <li>Press the ESC key on your keyboard</li>
          <li>Click anywhere outside the modal content area</li>
        </ol>
      </StyledSection>

      <StyledSection>
        <h2>Scrollable Content</h2>
        <p>
          This modal demonstrates scrollable content. Let's add some Lorem Ipsum
          text to show how the scrolling works when content exceeds the modal
          height.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>
      </StyledSection>

      <StyledSection>
        <h2>Usage Example</h2>
        <pre>
          {`<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Hello World"
>
  <HelloWorldModal />
</Modal>`}
        </pre>
      </StyledSection>
    </StyledContent>
  );
};

export default HelloWorldModal;
