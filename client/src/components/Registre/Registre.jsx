import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import "./Registre.css";

const Registre = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Inscription réussie",
          text: "Vous êtes inscrit avec succès!",
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Erreur lors de l'inscription",
          text: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          timer: 1000,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="wap">
      <div className="wrapper">
        <h1 className="title">Créer un compte</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="firstName" className="input-box">
            <Form.Label>Nom</Form.Label>
            <FormControl
              type="text"
              placeholder="Nom"
              className="input"
              {...register("firstName", { required: true })}
              style={{
                borderColor: errors.firstName ? "red" : "",
              }}
            />
            {errors?.firstName && (
              <span style={{ color: "red" }}>{errors.firstName?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="lastName" className="input-box">
            <Form.Label>Prénom</Form.Label>
            <FormControl
              type="text"
              placeholder="Prénom"
              className="input"
              {...register("lastName", { required: true })}
              style={{
                borderColor: errors.lastName ? "red" : "",
              }}
            />
            {errors?.lastName && (
              <span style={{ color: "red" }}>{errors.lastName?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="input-box">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="Email"
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

          <Form.Group controlId="confirmPassword" className="input-box">
            <Form.Label>Confirme Mot de passe</Form.Label>
            <FormControl
              type="password"
              placeholder="Confirme Mot de passe"
              className="input"
              {...register("confirmPassword", { required: true })}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="btn">
            S'inscrire
          </Button>
        </Form>

        <div className="register-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="Link">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registre;
