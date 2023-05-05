import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "./Client.gql.query";

const ClientView = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>something went wrong</div>;

  const {
    client: { name, email, phone },
  } = data;

  return (
    <section>
      <div className="client-info__record">
        <div className="client-info__record--heading">Name</div>
        <div className="client-info__record--value">{name}</div>
      </div>
      <div className="client-info__record">
        <div className="client-info__record--heading">Email</div>
        <div className="client-info__record--value">{email}</div>
      </div>
      <div className="client-info__record">
        <div className="client-info__record--heading">Phone</div>
        <div className="client-info__record--value">{phone}</div>
      </div>
      <div className="client-info__record">
        <button onClick={() => navigate("/clients")}>Back</button>
      </div>
    </section>
  );
};
export default ClientView;
