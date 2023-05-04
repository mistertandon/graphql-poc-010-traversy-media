import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./Project.gql.query";
import ProjectRecord from "./ProjectRecord";

const ProjectMaster = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading</p>

    if (error) return <p>Error...</p>

    const { projects } = data;

    return (
        <section>
            {
                projects.map((project) => <ProjectRecord key={project.id} project={project} />)
            }
        </section>
    )
}

export default ProjectMaster;