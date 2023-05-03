import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./Clients.gql";
import { DELETE_CLIENT } from "./Clients.gql.mutation";

const ClientRecord = ({ client: { id, name, email, phone } }) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id },
        update(cache) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(client => client.id !== id)
                }
            })
        }
    });

    return (
        <div className="client-records__tbody-row" key={id}>
            <div className="client-records__tbody-row-td client-records__tbody-row-td--name">
                {name}
            </div>
            <div className="client-records__tbody-row-td client-records__tbody-row-td--email">
                {email}
            </div>
            <div className="client-records__tbody-row-td client-records__tbody-row-td--phone">
                {phone}
            </div>
            <button className="client-records__tbody-row-td client-records__tbody-row-td--action" onClick={deleteClient}>
                Delete
            </button>

        </div>
    )
}

export default ClientRecord;