import { gql } from "@apollo/client";

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
          deleteClient(id: $id) {
            name
            email
            phone
        }
    }
`;

export { DELETE_CLIENT };