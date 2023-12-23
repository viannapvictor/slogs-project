import { type IconType } from 'react-icons';
import OrganizationRole from '../../../../shared/models/entities/OrganizationRole';

export default interface MenuItem {
    readonly path: string;
    readonly name: string;
    readonly icon: IconType;
    readonly authenticated: boolean;
    readonly minRole?: OrganizationRole
}
