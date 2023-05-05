import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS, GET_CLIENT, ADD_CLIENT, UPDATE_CLIENT } from "./index";

const ClientForm = ({ isEdit = false }) => {
  let skipOnMount = useRef(true);

  const { clientId } = useParams();

  const isEditAction = isEdit && clientId !== undefined ? true : false;

  const [errorFlag, setErrorFlag] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  useQuery(GET_CLIENT, {
    variables: { id: clientId },
    skip: !isEditAction,
    onCompleted: (data) => {
      console.log("completed : ", data);
      const {
        client: { name, email, phone },
      } = data;
      setValue("name", name);
      setValue("email", email);
      setValue("phone", phone);
    },
    onError: (error) => {
      setErrorFlag(true);
    },
  });

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

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: clientId, ...formFields },
    update(cache, { data: { updateClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.map((client) => {
            if (clientId === client.id) {
              return updateClient;
            } else {
              return client;
            }
          }),
        },
      });
    },
  });
  const clientFormSubmitHandler = async (data) => {
    const { name, email, phone } = data;

    if (isEditAction) {
      setFormFields({ id: clientId, name, email, phone });
    } else {
      setFormFields({ name, email, phone });
      console.log("ADD: ", name, email, phone);
    }
  };

  useEffect(() => {
    if (!skipOnMount.current) {
      const { name, email, phone } = formFields;

      if (isEditAction) {
        updateClient(clientId, name, email, phone);
      } else {
        addClient(name, email, phone);
      }
    } else {
      skipOnMount.current = false;
    }
  }, [formFields]);

  if (errorFlag) return <div>Something went wrong...</div>;

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
