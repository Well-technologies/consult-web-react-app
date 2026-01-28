import { useTranslation } from 'react-i18next';
import { Modal } from '@/ui/molecules/modal/Modal';
import { CallEndedTypeId } from '@/api/consult/consult.types';

export interface ConsultationEndTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (typeId: CallEndedTypeId) => void;
  isOnline?: boolean;
  isLoading?: boolean;
}

export const ConsultationEndTypeModal = ({
  isOpen,
  onClose,
  onSelect,
  isOnline = false,
  isLoading = false,
}: ConsultationEndTypeModalProps) => {
  const { t } = useTranslation();

  const title = isOnline
    ? t('joinConsultation.modal.endType.titleOnline')
    : t('joinConsultation.modal.endType.titleOffline');

  const options = [
    {
      id: CallEndedTypeId.Consulted,
      label: t('joinConsultation.modal.endType.consulted'),
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      description: 'Consultation completed successfully with prescription.'
    },
    {
      id: CallEndedTypeId.InCompleteConsult,
      label: t('joinConsultation.modal.endType.incompleteConsult'),
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Consultation was not fully completed.'
    }
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      isLoading={isLoading}
      isConfirmButtonHide={true}
      isCancelButtonHide={true}
      modalLayoutClassName="max-w-md"
    >
      <div className="space-y-3 py-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-200 group text-left"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              {option.icon}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {option.label}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {option.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};
