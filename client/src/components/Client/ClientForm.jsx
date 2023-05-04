import { useForm } from "react-hook-form";
const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clientFormSubmitHandler = async (data) => {
    const { name, email, phone } = data;
    console.log(name, email, phone);
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
