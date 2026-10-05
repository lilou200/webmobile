
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../API/authentification/auth";
import logo from "../assets/images/logo.jpeg";
import { useAuth } from "../context/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (values) => {
    setError("");
    setLoading(true);

    try {
      const response = await apiLogin(values);
      if (response.status === "admin") {
        login(response.token, response.exp);
        message.success("Vous êtes connecté en tant qu'administrateur !");
        navigate("/");
      } else {
        setError(
          "Vous devez être administrateur pour accéder à cette application."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      handleRetry("Impossible de vous connecter. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (messageText) => {
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);
    if (newRetryCount >= MAX_RETRIES) {
      setError("Trop de tentatives échouées. Veuillez réessayer plus tard.");
    } else {
      setError(
        `${messageText} (Tentative ${newRetryCount} sur ${MAX_RETRIES})`
      );
    }
  };
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="VetProximité Logo" className="logo" />
      </div>
      <Form
        name="login-form"
        layout="vertical"
        onFinish={handleLogin}
        className="login-form"
      >
        <h2>Bienvenue sur notre application VetProximité</h2>
        {error && (
          <div
            style={{ color: "red", marginBottom: "15px", textAlign: "center" }}
          >
            {error}
          </div>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Veuillez entrer un email valide !",
            },
          ]}
        >
          <Input placeholder="Email" disabled={retryCount >= MAX_RETRIES} />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            {
              required: true,
              min: 6,
              message: "Le mot de passe doit comporter au moins 6 caractères !",
            },
          ]}
        >
          <Input.Password
            placeholder="Mot de passe"
            disabled={retryCount >= MAX_RETRIES}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={retryCount >= MAX_RETRIES}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
