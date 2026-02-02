import { useTranslation } from 'react-i18next';
import { MedicationCardProps } from './MedicationCard.types';
import { Schedule } from '@/api/consult/consult.types';

export const MedicationCard = ({
    medicine,
    onEdit,
    onDelete,
}: MedicationCardProps) => {
    const { t } = useTranslation();

    return (
        <div className="p-3 md:p-4 border border-gray-100 rounded-2xl shadow-sm bg-white flex flex-col h-full relative group">
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-full"
                    title="Delete Medication"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="absolute top-2 right-8 text-gray-400 hover:text-blue-500 transition-colors p-1 hover:bg-blue-50 rounded-full"
                    title="Edit Medication"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            )}
            <h4
                className="font-semibold text-sm text-primary mb-2 line-clamp-2"
                title={medicine.medicineName}
            >
                {medicine.medicineName}
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 uppercase">
                <li>{medicine.dosage}</li>
                {medicine.schedules.map((schedule: Schedule, index: number) => (
                    schedule.count > 0 && (
                        <li key={index}>
                            {`${schedule.title}(${schedule.count})`}
                        </li>
                    )
                ))}
                <li>{medicine.frequency}</li>
                <li>{medicine.timing}</li>
                {medicine.duration && <li>{medicine.duration}</li>}
                {medicine.notes && (
                    <>
                        <h2 className="font-semibold text-[12px] text-primary mb-2 line-clamp-2 mt-4">
                            {t("consultation.details.notes")}
                        </h2>
                        <li>{medicine.notes}</li>
                    </>
                )}
            </ul>
        </div>
    );
};
