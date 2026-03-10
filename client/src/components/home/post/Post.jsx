import { styled, Box, Typography } from "@mui/material";
import { Person, Category } from "@mui/icons-material";

// ── Card ─────────────────────────────────────────────────
const Card = styled(Box)`
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .read-more {
    gap: 7px;
  }
`;

// ── Image ─────────────────────────────────────────────────
const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;
`;

const Thumbnail = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
`;

const CategoryBadge = styled(Box)`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(124, 111, 255, 0.88);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 4px 10px;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;

  svg {
    font-size: 11px;
  }
`;

// ── Body ──────────────────────────────────────────────────
const Body = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Title = styled(Typography)`
  font-size: 16px;
  font-weight: 800;
  color: #1e2a3a;
  line-height: 1.35;
  letter-spacing: -0.2px;
`;

const Description = styled(Typography)`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.65;
  flex: 1;
`;

// ── Footer ────────────────────────────────────────────────
const Footer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 14px;
  border-top: 1px solid #f9fafb;
  margin-top: auto;
`;

const Author = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;

  svg {
    font-size: 14px;
    color: #7c6fff;
  }
`;

const ReadMore = styled(Box)`
  font-size: 12px;
  font-weight: 700;
  color: #7c6fff;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s ease;
`;

// ── Component ─────────────────────────────────────────────
const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) =>
    str?.length > limit ? str.substring(0, limit) + "..." : str;

  return (
    <Card>
      <ImageWrapper>
        <Thumbnail src={url} alt={post.title} />
        {post.categories && (
          <CategoryBadge>
            <Category /> {post.categories}
          </CategoryBadge>
        )}
      </ImageWrapper>

      <Body>
        <Title>{addEllipsis(post.title, 52)}</Title>
        <Description>{addEllipsis(post.description, 90)}</Description>
      </Body>

      <Footer>
        <Author>
          <Person /> {post.username}
        </Author>
        <ReadMore className="read-more">Read more →</ReadMore>
      </Footer>
    </Card>
  );
};

export default Post;
