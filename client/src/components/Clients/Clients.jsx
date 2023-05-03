import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "./Clients.gql";
import "./Clients.scss"

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error...</p>

    const { clients: clientsRecords } = data;

    console.log(clientsRecords);

    const renderClientsHeader = () => {

        return (
            <div className="client-records__thead-row">
                <div className="client-records__thead-row-th client-records__thead-row-th--name">
                    Name
                </div>
                <div className="client-records__thead-row-th client-records__thead-row-th--email">
                    Email
                </div>
                <div className="client-records__thead-row-th client-records__thead-row-th--phone">
                    Phone
                </div>
            </div>
        )
    }

    const renderClientRecord = ({ id, name, email, phone }) => {

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
            </div>
        )
    }


    return (
        <section className="client--container">
            <section className="client-records--container">
                {
                    renderClientsHeader()
                }
                {
                    clientsRecords.map((client) => renderClientRecord(client))
                }
            </section>
        </section>
    )
}

export default Clients;