import { Medication } from '@/api/consult/consult.types';

export interface MedicationCardProps {
    medicine : Medication
    onEdit?: () => void;
    onDelete?: () => void;
    variant?: 'simple' | 'detailed';
}