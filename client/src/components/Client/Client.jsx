import { useQuery } from "@apollo/client";
import ClientRecord from "./ClientRecord";
import { GET_CLIENTS } from "./Client.gql.query";
import "./Client.scss"

const Client = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error...</p>

    const { clients: clientRecords } = data;

    const renderClientHeader = () => {

        return (
            <div className="client-record__thead-row">
                <div className="client-record__thead-row-th client-record__thead-row-th--name">
                    Name
                </div>
                <div className="client-record__thead-row-th client-record__thead-row-th--email">
                    Email
                </div>
                <div className="client-record__thead-row-th client-record__thead-row-th--phone">
                    Phone
                </div>
                <div className="client-record__thead-row-th client-record__thead-row-th--action">
                    Action
                </div>
            </div>
        )
    }

    return (
        <section className="client--container">
            <section className="client-record--container">
                {
                    renderClientHeader()
                }
                {
                    clientRecords.map((client) => <ClientRecord key={client.id} client={client} />)
                }
            </section>
        </section>
    )
}

export default Client;