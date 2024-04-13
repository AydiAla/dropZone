import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import "../../css/Registre.css";

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          text: "Vous êtes connecté avec succès!",
          timer: 1000,
          showConfirmButton: false,
        });
        // You can redirect the user to another page after successful login if needed
        // window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 404) {
          // User not found (invalid email)
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Utilisateur non trouvé. Veuillez vérifier votre email.",
          });
        } else if (error.response.status === 401) {
          // Unauthorized access
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Email ou mot de passe incorrect. Veuillez réessayer.",
          });
        } else {
          // Other errors
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          });
        }
      });
  };

  return (
    <div className="wap">
      <div className="wrapper">
        <h1 className="title">Connexion</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email" className="input-box">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: true,
                message: { required: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              style={{
                borderColor: errors.email ? "red" : "",
              }}
            />
            {errors?.email && (
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="password" className="input-box">
            <Form.Label>Mot de passe</Form.Label>
            <FormControl
              type="password"
              placeholder="Mot de passe"
              className="input"
              {...register("password", { required: true })}
              style={{
                borderColor: errors.password ? "red" : "",
              }}
            />
            {errors?.password && (
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            )}
          </Form.Group>

          <Button type="submit" variant="primary" className="btn">
            Connexion
          </Button>
        </Form>

        <div className="register-link">
          Vous n'avez pas de compte ?{" "}
          <Link to="/signup" className="Link">
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
