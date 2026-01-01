import { useModal } from "contexts/modal";
import { useEffect, useState } from "react";

import Manual from "components/pages/Manual";
import {
  StyledUserManualCover,
  StyledUserManualCoverSubTitle,
  StyledUserManualCoverTitle,
} from "components/pages/Manual/StyledUserManualCover";

export const UserManualCover: React.FC = () => {
  const { actions: modalActions } = useModal();
  const [rotation, setRotation] = useState<number>(0);

  const handleNotebookClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    event.preventDefault();
    modalActions.openModal({
      id: "user-manual",
      title: "User Manual",
      component: <Manual />,
    });
  };

  const handleStopHover = (): void => {
    setRotation(Math.floor(Math.random() * 31) - 15);
  };

  useEffect(() => {
    handleStopHover();
  }, []);

  return (
    <StyledUserManualCover
      onClick={handleNotebookClick}
      onMouseLeave={handleStopHover}
      $rotation={rotation}
    >
      <StyledUserManualCoverTitle>STEF.FM</StyledUserManualCoverTitle>
      <hr />
      <StyledUserManualCoverSubTitle>User Manual</StyledUserManualCoverSubTitle>
      <hr />
      <p>
        <a href="mailto:webmaster@stef.fm">webmaster@stef.fm</a>
        <br />
        Copyright © 2021 - {new Date().getFullYear()}
        <br />
        Some rights reserved
      </p>
    </StyledUserManualCover>
  );
};

export default UserManualCover;
