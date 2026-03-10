import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Badge,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

// ── Page Wrapper ─────────────────────────────────────────
const PageWrapper = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 24px;
`;

// ── Card ─────────────────────────────────────────────────
const Card = styled(Box)`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
`;

// ── Card Top Banner ──────────────────────────────────────
const CardTop = styled(Box)`
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  padding: 36px 36px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.07);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const LogoCircle = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 28px;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled(Typography)`
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  position: relative;
  z-index: 1;
`;

const CardSubtitle = styled(Typography)`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 4px;
  position: relative;
  z-index: 1;
`;

// ── Tab Toggle ───────────────────────────────────────────
const TabRow = styled(Box)`
  display: flex;
  background: #f3f4f6;
  margin: 24px 28px 0;
  border-radius: 12px;
  padding: 4px;
`;

const Tab = styled(Button)`
  flex: 1;
  padding: 10px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  text-transform: none;
  transition: all 0.2s ease;
  color: ${({ active }) => (active === "true" ? "#fff" : "#9ca3af")};
  background: ${({ active }) =>
    active === "true"
      ? "linear-gradient(135deg, #7c6fff, #5b4fff)"
      : "transparent"};
  box-shadow: ${({ active }) =>
    active === "true" ? "0 4px 12px rgba(124,111,255,0.35)" : "none"};

  &:hover {
    background: ${({ active }) =>
      active === "true"
        ? "linear-gradient(135deg, #7c6fff, #5b4fff)"
        : "#e5e7eb"};
    color: ${({ active }) => (active === "true" ? "#fff" : "#374151")};
  }
`;

// ── Form Body ────────────────────────────────────────────
const FormBody = styled(Box)`
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// ── Custom Input ─────────────────────────────────────────
const InputWrapper = styled(Box)`
  position: relative;
`;

const InputLabel = styled(Typography)`
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const StyledInput = styled("input")`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  color: #1e2a3a;
  background: #fafafa;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    border-color: #7c6fff;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(124, 111, 255, 0.12);
  }

  &::placeholder {
    color: #d1d5db;
  }
`;

const InputIcon = styled(Box)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  align-items: center;

  svg {
    font-size: 18px;
  }
`;

const EyeBtn = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px;
  color: #9ca3af;

  svg {
    font-size: 18px;
  }
`;

// ── Error ────────────────────────────────────────────────
const ErrorBox = styled(Box)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 14px;
  border-radius: 10px;
`;

// ── Submit Button ────────────────────────────────────────
const SubmitBtn = styled(Button)`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-transform: none;
  transition: all 0.25s ease;
  margin-top: 4px;

  &:hover {
    background: linear-gradient(135deg, #6b5fff, #4a3ffe);
    box-shadow: 0 8px 24px rgba(124, 111, 255, 0.45);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    transform: none;
    box-shadow: none;
  }
`;

const Divider = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d1d5db;
  font-size: 12px;
  font-weight: 600;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #f3f4f6;
  }
`;

const SwitchBtn = styled(Button)`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: #7c6fff;
    background: #f3f0ff;
    color: #7c6fff;
  }
`;

// ── Field Component ──────────────────────────────────────
const Field = ({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  showToggle,
}) => {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? "text" : "password") : type;

  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        <InputIcon>{icon}</InputIcon>
        <StyledInput
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {showToggle && (
          <EyeBtn onClick={() => setShow((s) => !s)}>
            {show ? <VisibilityOff /> : <Visibility />}
          </EyeBtn>
        )}
      </InputWrapper>
    </Box>
  );
};

// ── Initial Values ───────────────────────────────────────
const loginInitialValues = { username: "", password: "" };
const signupInitialValues = { name: "", username: "", password: "" };

// ── Component ────────────────────────────────────────────
const Login = () => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setAccount, setIsAuthenticated } = useContext(DataContext);

  const isLogin = account === "login";

  useEffect(() => {
    showError("");
  }, [login, account]);

  const onValueChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const onInputChange = (e) =>
    setSignup({ ...signup, [e.target.name]: e.target.value });

  const loginUser = async () => {
    if (loading) return;
    setLoading(true);
    showError("");
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`,
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`,
        );
        setAccount({
          name: response.data.name,
          username: response.data.username,
        });
        sessionStorage.setItem('account', JSON.stringify({
          name: response.data.name,
          username: response.data.username,
        }));
        setIsAuthenticated(true);
        setLogin(loginInitialValues);
        navigate("/");
      } else {
        showError(response.msg || "Invalid credentials. Please try again.");
      }
    } catch {
      showError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async () => {
    if (loading) return;
    setLoading(true);
    showError("");
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setSignup(signupInitialValues);
        toggleAccount("login");
      } else {
        showError(response.msg || "Signup failed. Please try again.");
      }
    } catch {
      showError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card>
        {/* ── Top Banner ── */}
        <CardTop>
          <LogoCircle>✍️</LogoCircle>
          <CardTitle>Engineers Blog</CardTitle>
          <CardSubtitle>
            {isLogin
              ? "Welcome back! Sign in to continue."
              : "Join the community today."}
          </CardSubtitle>
        </CardTop>

        {/* ── Tab Toggle ── */}
        <TabRow>
          <Tab
            active={isLogin.toString()}
            onClick={() => toggleAccount("login")}
          >
            Sign In
          </Tab>
          <Tab
            active={(!isLogin).toString()}
            onClick={() => toggleAccount("signup")}
          >
            Sign Up
          </Tab>
        </TabRow>

        {/* ── Form ── */}
        <FormBody>
          {error && <ErrorBox>{error}</ErrorBox>}

          {isLogin ? (
            <>
              <Field
                label="Username"
                icon={<Person />}
                name="username"
                value={login.username}
                onChange={onValueChange}
              />
              <Field
                label="Password"
                icon={<Lock />}
                name="password"
                value={login.password}
                onChange={onValueChange}
                showToggle
              />
              <SubmitBtn
                onClick={loginUser}
                disabled={loading}
                endIcon={<ArrowForward />}
              >
                {loading ? "Signing in..." : "Sign In"}
              </SubmitBtn>
              <Divider>or</Divider>
              <SwitchBtn onClick={() => toggleAccount("signup")}>
                Don't have an account? Sign Up
              </SwitchBtn>
            </>
          ) : (
            <>
              <Field
                label="Full Name"
                icon={<Badge />}
                name="name"
                value={signup.name}
                onChange={onInputChange}
              />
              <Field
                label="Username"
                icon={<Person />}
                name="username"
                value={signup.username}
                onChange={onInputChange}
              />
              <Field
                label="Password"
                icon={<Lock />}
                name="password"
                value={signup.password}
                onChange={onInputChange}
                showToggle
              />
              <SubmitBtn
                onClick={signupUser}
                disabled={loading}
                endIcon={<ArrowForward />}
              >
                {loading ? "Creating account..." : "Create Account"}
              </SubmitBtn>
              <Divider>or</Divider>
              <SwitchBtn onClick={() => toggleAccount("login")}>
                Already have an account? Sign In
              </SwitchBtn>
            </>
          )}
        </FormBody>
      </Card>
    </PageWrapper>
  );
};

export default Login;
