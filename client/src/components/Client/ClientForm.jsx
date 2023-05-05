import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./Client.gql.query";
import { ADD_CLIENT } from "./Client.gql.mutation";
const ClientForm = () => {

  // useParams();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { ...formFields },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  console.log(useForm());

  const clientFormSubmitHandler = async (data) => {
    console.log(data);
    setFormFields({ name: data.name, email: data.email, phone: data.phone });
    const { name, email, phone } = data;
    console.log(name, email, phone);
    addClient(name, email, phone);
  };

  return (
    <section>
      <form
        className="client-form--container"
        onSubmit={handleSubmit(clientFormSubmitHandler)}
      >
        <div className="client-form__field--container">
          <label className="client-form__input-name--label">Name:</label>
          <input
            className="client-form__input-name--field"
            type="text"
            {...register("name", {
              validate: {
                shouldNotEmpty: (value) => {
                  const emptyCheck =
                    typeof value !== "undefined" &&
                    value !== null &&
                    value !== "";

                  return emptyCheck || "Name number is required";
                },
              },
            })}
          />
          {errors?.name && (
            <p className="client-form__input-name--error">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div className="client-form__field--container">
          <label className="client-form__input-email--label">Email:</label>
          <input
            className="client-form__input-email--field"
            type="text"
            {...register("email", {
              validate: {
                shouldNotEmpty: (value) => {
                  const emptyCheck =
                    typeof value !== "undefined" &&
                    value !== null &&
                    value !== "";

                  return emptyCheck || "Email number is required";
                },
                shouldEmail: (value) => {
                  const emailCheck =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
                      value
                    );
                  return emailCheck || "Invalid email address";
                },
              },
            })}
          />
          {errors?.email && (
            <p className="client-form__input-name--error">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="client-form__field--container">
          <label className="client-form__input-phone--label">Phone:</label>
          <input
            className="client-form__input-phone--field"
            type="text"
            {...register("phone", {
              validate: {
                shouldNotEmpty: (value) => {
                  const emptyCheck =
                    typeof value !== "undefined" &&
                    value !== null &&
                    value !== "";

                  return emptyCheck || "Phone number is required";
                },
              },
            })}
          />
          {errors?.phone && (
            <p className="client-form__input-name--error">
              {errors?.phone?.message}
            </p>
          )}
        </div>
        <div className="client-form__field--container">
          <button className="client-form__submit">Add</button>
        </div>
      </form>
    </section>
  );
};

export default ClientForm;
