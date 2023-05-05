import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./Client.gql.query";
import { DELETE_CLIENT } from "./Client.gql.mutation";

const ClientRecord = ({ client: { id, name, email, phone } }) => {
  const navigate = useNavigate();
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== id),
        },
      });
    },
  });

  return (
    <div className="client-record__tbody-row" key={id}>
      <div className="client-record__tbody-row-td client-record__tbody-row-td--name">
        {name}
      </div>
      <div className="client-record__tbody-row-td client-record__tbody-row-td--email">
        {email}
      </div>
      <div className="client-record__tbody-row-td client-record__tbody-row-td--phone">
        {phone}
      </div>
      <div className="client-record__tbody-row-td client-record__tbody-row-td--action">
        <button
          className="action__view"
          onClick={() => {
            navigate(`/clients/${id}`);
          }}
        >
          View
        </button>
        <button
          className="action__edit"
          onClick={() => {
            navigate(`/clients/${id}/edit`);
          }}
        >
          Edit
        </button>
        <button className="action__delete" onClick={deleteClient}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ClientRecord;
