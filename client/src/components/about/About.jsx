import { Box, styled, Typography, Link, Chip } from "@mui/material";
import {
  GitHub,
  Instagram,
  Email,
  LocationOn,
  Work,
} from "@mui/icons-material";

// ── Banner ──────────────────────────────────────────────
const Banner = styled(Box)`
  width: 100%;
  height: 45vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg)
      center/cover no-repeat;
    filter: brightness(0.35) saturate(1.2);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(15, 12, 41, 0.4) 0%,
      rgba(15, 12, 41, 0.85) 100%
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

// ── Page Layout ─────────────────────────────────────────
const PageWrapper = styled(Box)`
  max-width: 860px;
  margin: 0 auto;
  padding: 56px 24px 80px;
`;

const Section = styled(Box)`
  margin-bottom: 48px;
`;

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

const BodyText = styled(Typography)`
  font-size: 17px;
  line-height: 1.85;
  color: #4b5563;
`;

// ── Meta chips ──────────────────────────────────────────
const MetaRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 32px 0;
`;

const MetaChip = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f0ff;
  color: #5b4fff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(124, 111, 255, 0.2);

  svg {
    font-size: 16px;
  }
`;

// ── Social Links ────────────────────────────────────────
const SocialRow = styled(Box)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const SocialCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fafafa;
  color: #1e2a3a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;

  svg {
    font-size: 20px;
  }

  &:hover {
    border-color: #7c6fff;
    background: #f3f0ff;
    color: #7c6fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(124, 111, 255, 0.15);
  }
`;

// ── Skills ──────────────────────────────────────────────
const SkillsRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const SkillChip = styled(Box)`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f0ff;
    border-color: #7c6fff;
    color: #7c6fff;
  }
`;

const About = () => {
  return (
    <Box>
      {/* ── Banner ── */}
      <Banner>
        <BannerContent>
          <BannerTitle>
            About <span>Me</span>
          </BannerTitle>
          <BannerSub>Engineer · Builder · Writer</BannerSub>
        </BannerContent>
      </Banner>

      <PageWrapper>
        {/* ── Meta ── */}
        <MetaRow>
          <MetaChip>
            <LocationOn /> Multan, Pakistan
          </MetaChip>
          <MetaChip>
            <Work /> Full Stack Developer
          </MetaChip>
        </MetaRow>

        {/* ── Bio ── */}
        <Section>
          <SectionLabel>Who I am</SectionLabel>
          <Divider />
          <BodyText>
            I'm a Full Stack Developer with hands-on experience building
            real-world applications using the MERN stack and Django. I care
            deeply about writing clean, maintainable code and creating
            interfaces people actually enjoy using.
          </BodyText>
        </Section>

        {/* ── Skills ── */}
        <Section>
          <SectionLabel>What I work with</SectionLabel>
          <Divider />
          <SkillsRow>
            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "Django",
              "JavaScript",
              "TypeScript",
              "MySQL",
              "PHP",
              "Git",
            ].map((skill) => (
              <SkillChip key={skill}>{skill}</SkillChip>
            ))}
          </SkillsRow>
        </Section>

        {/* ── Contact ── */}
        <Section>
          <SectionLabel>Get in touch</SectionLabel>
          <Divider />
          <BodyText style={{ marginBottom: 24 }}>
            Have a project in mind or just want to chat? Feel free to reach out
            — I'm always open to interesting conversations and opportunities.
          </BodyText>
          <SocialRow>
            <SocialCard href="https://github.com/Muhammad-Rizwan-06" target="_blank">
              <GitHub /> GitHub
            </SocialCard>
            <SocialCard
              href="mailto:engr.muhammadrizwan06@gmail.com"
              target="_blank"
            >
              <Email /> Email Me
            </SocialCard>
          </SocialRow>
        </Section>
      </PageWrapper>
    </Box>
  );
};

export default About;
