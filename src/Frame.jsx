import styled from "styled-components";

const FrameContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url("../assets/img/frame/test_frame.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Frame = ({ image }) => {
  return (
    <FrameContainer>
      <UserImage src={image} alt="User" />
    </FrameContainer>
  );
};

export default Frame;
