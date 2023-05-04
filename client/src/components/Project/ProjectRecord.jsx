import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "./Project.gql.query";
import { DELETE_PROJECT } from "./Project.gql.mutation";

const ProjectRecord = ({ project: { id, name, description } }) => {

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id },
        update(cache, { data: { deleteProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.filter(project => project.id !== id)
                }
            })
        }
    });

    return (
        <div key={id} className="project-record--container">
            <div className="project-record__div--name">
                {name}
            </div>
            <div className="project-record__div--action">
                <button onClick={deleteProject}>
                    Delete
                </button>
            </div>
            <div className="project-record__div--description">
                {description}
            </div>
        </div>
    )
}
export default ProjectRecord;