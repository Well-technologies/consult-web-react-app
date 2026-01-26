export enum ConsultationType {
  InPerson = 'in-person',
  Online = 'online',
}

export type ConsultationCardProps = {
  type: ConsultationType;
  appointmentId: string;
};
