import type IncidentImage from './IncidentImage';
import type Urgency from './Urgency';

export default interface IncidentLog {
    id: string;
    title: string;
    description: string;
    userId: string;
    organizationId: string;
    urgency: Urgency;
    createdDateTime: Date;
    images?: IncidentImage[];
}
