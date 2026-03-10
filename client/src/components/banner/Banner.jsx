import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)`
  width: 100%;
  min-height: 45vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Background image with dark overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
      center/cover no-repeat;
    filter: brightness(0.35) saturate(1.2);
    z-index: 0;
  }

  /* Gradient overlay for depth */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(15, 12, 41, 0.6) 0%,
      rgba(48, 43, 99, 0.5) 50%,
      rgba(15, 12, 41, 0.85) 100%
    );
    z-index: 1;
  }
`;

const Content = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  text-align: center;
`;

const Tag = styled(Typography)`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #7c6fff;
  background: rgba(124, 111, 255, 0.12);
  border: 1px solid rgba(124, 111, 255, 0.35);
  padding: 6px 18px;
  border-radius: 20px;
`;

const Heading = styled(Typography)`
  font-size: clamp(48px, 8vw, 88px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -2px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);

  span {
    background: linear-gradient(135deg, #7c6fff, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SubHeading = styled(Typography)`
  font-size: clamp(14px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  font-weight: 400;
  max-width: 480px;
`;

const Divider = styled(Box)`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #7c6fff, #a78bfa);
  border-radius: 2px;
`;

const Banner = () => {
  return (
    <Image>
      <Content>
        <Tag>Welcome</Tag>
        <Heading variant="h1">
          ENG<span>BLOG</span>
        </Heading>
        <Divider />
        <SubHeading>Thoughts, tutorials & insights for engineers</SubHeading>
      </Content>
    </Image>
  );
};

export default Banner;
