import { useParams } from "react-router-dom";
import { ConsultationCard } from "./ConsultationCard";
import { ConsultationType } from "./JoinConsultation.types";

export const JoinConsultationContainer = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Consultation</h1>
                <p className="text-sm text-gray-500">Appointment ID: {appointmentId}</p>
            </div>

            {/* Two Column Layout for Tablet View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
                {/* In-Person Consultation Card */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                        In-Person Consultation
                    </h2>
                    <div className="flex-1">
                        <ConsultationCard 
                            type={ConsultationType.InPerson} 
                            appointmentId={appointmentId || ''} 
                        />
                    </div>
                </div>

                {/* Online Consultation Card */}
                {/* <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                        Online Consultation
                    </h2>
                    <div className="flex-1">
                        <ConsultationCard 
                            type={ConsultationType.Online} 
                            appointmentId={appointmentId || ''} 
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
};