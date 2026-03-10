import {
  Box,
  styled,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";
import {
  Instagram,
  Email,
  Send,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";

// ── Banner ───────────────────────────────────────────────
const Banner = styled(Box)`
  width: 100%;
  height: 45vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url(http://mrtaba.ir/image/bg2.jpg) center/cover no-repeat;
    filter: brightness(0.3) saturate(1.2);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(15, 12, 41, 0.4) 0%,
      rgba(15, 12, 41, 0.9) 100%
    );
  }
`;

const BannerContent = styled(Box)`
  position: absolute;
  bottom: 36px;
  left: 48px;
  z-index: 2;
`;

const BannerTitle = styled(Typography)`
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1;

  span {
    background: linear-gradient(135deg, #7c6fff, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const BannerSub = styled(Typography)`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 8px;
  letter-spacing: 1px;
`;

// ── Layout ───────────────────────────────────────────────
const PageWrapper = styled(Box)`
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// ── Left Column ──────────────────────────────────────────
const SectionLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #7c6fff;
  margin-bottom: 12px;
`;

const Divider = styled(Box)`
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, #7c6fff, #a78bfa);
  border-radius: 2px;
  margin-bottom: 20px;
`;

const Heading = styled(Typography)`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  color: #1e2a3a;
  line-height: 1.3;
  margin-bottom: 16px;
`;

const BodyText = styled(Typography)`
  font-size: 15px;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 32px;
`;

const InfoCard = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  background: #fafafa;
  margin-bottom: 12px;
  transition: all 0.25s ease;

  &:hover {
    border-color: #7c6fff;
    background: #f3f0ff;
  }
`;

const InfoIcon = styled(Box)`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c6fff, #a78bfa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;

  svg {
    font-size: 18px;
  }
`;

const InfoLabel = styled(Typography)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 2px;
`;

const InfoValue = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: #1e2a3a;
`;

const SocialRow = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const SocialBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    border-color: #7c6fff;
    background: #f3f0ff;
    color: #7c6fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(124, 111, 255, 0.15);
  }
`;

// ── Right Column — Form ──────────────────────────────────
const FormCard = styled(Box)`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
`;

const FormTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: #1e2a3a;
  margin-bottom: 6px;
`;

const FormSub = styled(Typography)`
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 28px;
`;

const StyledField = styled(TextField)`
  margin-bottom: 16px;

  & .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 14px;
    background: #fafafa;

    &:hover fieldset {
      border-color: #7c6fff;
    }
    &.Mui-focused fieldset {
      border-color: #7c6fff;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #7c6fff;
  }
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: none;
  margin-top: 8px;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #6b5fff, #4a3ffe);
    box-shadow: 0 6px 20px rgba(124, 111, 255, 0.4);
    transform: translateY(-1px);
  }
`;

// ── Component ────────────────────────────────────────────
const Contact = () => {
  return (
    <Box>
      {/* Banner */}
      <Banner>
        <BannerContent>
          <BannerTitle>
            Get in <span>Touch</span>
          </BannerTitle>
          <BannerSub>I'd love to hear from you</BannerSub>
        </BannerContent>
      </Banner>

      <PageWrapper>
        {/* ── Left: Info ── */}
        <Box>
          <SectionLabel>Contact</SectionLabel>
          <Divider />
          <Heading>Let's work together or just say hi 👋</Heading>
          <BodyText>
            Whether you have a project in mind, a question, or just want to
            connect — my inbox is always open.
          </BodyText>

          <InfoCard>
            <InfoIcon>
              <Email />
            </InfoIcon>
            <Box>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>engr.muhammadrizwan06@gmail.com</InfoValue>
            </Box>
          </InfoCard>

          <InfoCard>
            <InfoIcon>
              <LocationOn />
            </InfoIcon>
            <Box>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>Multan, Punjab, Pakistan</InfoValue>
            </Box>
          </InfoCard>

          <InfoCard>
            <InfoIcon>
              <AccessTime />
            </InfoIcon>
            <Box>
              <InfoLabel>Response Time</InfoLabel>
              <InfoValue>Usually within 24 hours</InfoValue>
            </Box>
          </InfoCard>

          <SocialRow>
            <SocialBtn href="mailto:engr.muhammadrizwan@gmail.com">
              <Email /> Email
            </SocialBtn>
          </SocialRow>
        </Box>

        {/* ── Right: Form ── */}
        <FormCard>
          <FormTitle>Send a Message</FormTitle>
          <FormSub>Fill out the form and I'll get back to you shortly.</FormSub>

          <StyledField fullWidth label="Your Name" variant="outlined" />
          <StyledField fullWidth label="Email Address" variant="outlined" />
          <StyledField fullWidth label="Subject" variant="outlined" />
          <StyledField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={5}
          />

          <SubmitBtn variant="contained" endIcon={<Send />}>
            Send Message
          </SubmitBtn>
        </FormCard>
      </PageWrapper>
    </Box>
  );
};

export default Contact;
