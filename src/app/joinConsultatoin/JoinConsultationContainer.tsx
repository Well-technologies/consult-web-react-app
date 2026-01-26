import { useParams } from "react-router-dom";

export const JoinConsultationContainer = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();

    

    return (
        <>
        <h1>Join Consultation</h1>
        <h1>{appointmentId}</h1>
        </>
    )
}