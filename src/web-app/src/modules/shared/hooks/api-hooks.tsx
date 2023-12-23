import { type UseQueryResult, useQuery } from 'react-query';
import { AuthManager, OrganizationManager, type Result, type Success } from '../utils/slogs-api';
import type LoginForm from '../models/forms/LoginForm';
import type OrganizationForm from '../models/forms/OrganizationForm';
import type IncidentLogForm from '../models/forms/IncidentLogForm';
import type SimpleAccount from '../models/entities/SimpleAccount';
import { useEffect, useState } from 'react';
import type IncidentLog from '../models/entities/IncidentLog';
import UserForm from '../models/forms/UserForm';
import SimpleOrganization from '../models/entities/SimpleOrganization';
import OrganizationRole from '../models/entities/OrganizationRole';
import EditUserForm from '../models/entities/EditUserForm';

export function useOrganization(): {
    submitIncident: (form: IncidentLogForm) => Promise<Result<IncidentLog>>;
    getIncidentLog: (id: string) => Promise<Result<IncidentLog>>;
    findAccount: (id: string) => Promise<Result<SimpleAccount>>;
    updateUserRole: (id: string, form: EditUserForm) => Promise<Success>;
} {

    const onIncidentRegister = async (form: IncidentLogForm): Promise<Result<IncidentLog>> => {
        const formData = new FormData();
        for (let i = 0; i < form.images.length; i++) formData.append('images', form.images[i]);

        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('urgency', form.urgency);

        return await OrganizationManager.addIncidentLog(formData);
    };

    const onGetIncidentLog = async (id: string): Promise<Result<IncidentLog>> => {
        return await OrganizationManager.getIncidentLogById(id);
    };

    const onFindAccount = async (id: string): Promise<Result<SimpleAccount>> => {
        return await OrganizationManager.findAccount(id);
    };

    const onUpdateUserRole = async (id: string, form: EditUserForm): Promise<Success> => {
        return await OrganizationManager.updateUserRole(id, form)
    }

    return {
        submitIncident: onIncidentRegister,
        getIncidentLog: onGetIncidentLog,
        findAccount: onFindAccount,
        updateUserRole: onUpdateUserRole,
    };
}

export function useIncidentLogs(): {
    incidentLogs: IncidentLog[];
    reloadLogs: () => Promise<void>;
} {
    const { currentAccount, authenticated } = useAuth();
    const [incidentLogs, setIncidentLogs] = useState<IncidentLog[]>([]);
    const { data, refetch } = useGetAllIncidentLogsQuery();

    useEffect(() => {
        if (!authenticated) {
            setIncidentLogs([]);
            return;
        }
        if (!data?.success) return;

        setIncidentLogs(data.result ?? []);
    }, [currentAccount, data]);

    return {
        incidentLogs,
        reloadLogs: async () => {
            await refetch();
        },
    };
}

export function useMembers(): {
    members: SimpleAccount[];
    reloadMembers: () => Promise<void>;
} {
    const { currentAccount, authenticated } = useAuth();
    const [members, setMembers] = useState<SimpleAccount[]>([]);
    const { data, refetch } = useGetAllUsersQuery();

    useEffect(() => {
        if (!authenticated) {
            setMembers([]);
            return;
        }
        if (!data?.success) return;

        setMembers(data.result ?? []);
    }, [currentAccount, data]);

    return {
        members,
        reloadMembers: async () => {
            await refetch();
        }
    }
}

export function useAuth(): {
    submitLogin: (form: LoginForm) => Promise<Success>;
    submitOrganization: (form: OrganizationForm) => Promise<Success>;
    submitUser: (form: UserForm) => Promise<Success>;
    logout: () => Promise<Success>;
    deleteAccount: () => Promise<Success>;
    currentAccount: SimpleAccount | null;
    authenticated: boolean;
} {
    const currentAccountQuery = useCurrentAccountQuery();

    const onLogin = async (form: LoginForm): Promise<Success> => {
        const result = await AuthManager.login(form);
        if (result.success) {
            await currentAccountQuery.refetch();
        }
        return result;
    };

    const onRegisterOrganization = async (form: OrganizationForm): Promise<Success> => {
        return await AuthManager.registerOrganization(form);
    };

    const onSubmitUser = async (form: UserForm): Promise<Success> => {
        return await AuthManager.registerUser(form);
    }

    const onLogout = async (): Promise<Success> => {
        const result = await AuthManager.logout();
        if (result.success) {
            await currentAccountQuery.refetch();
        }
        return result;
    };

    const onDeleteAccount = async (): Promise<Success> => {
        const result = await AuthManager.deleteAccount();
        if (result.success) {
            await currentAccountQuery.refetch();
        }
        return result;
    }

    return {
        submitLogin: onLogin,
        submitOrganization: onRegisterOrganization,
        submitUser: onSubmitUser,
        logout: onLogout,
        deleteAccount: onDeleteAccount,
        currentAccount: currentAccountQuery.data?.result ?? null,
        authenticated: currentAccountQuery.data?.result !== undefined,
    };
}

function useCurrentAccountQuery(): UseQueryResult<Result<SimpleAccount>, unknown> {
    return useQuery({
        queryKey: 'getCurrentAccount',
        queryFn: async () => {
            return await AuthManager.getCurrentAccount();
        },
        staleTime: Infinity,
    });
}

function useGetAllIncidentLogsQuery(): UseQueryResult<Result<IncidentLog[]>, unknown> {
    return useQuery({
        queryKey: 'getAllIncidentLogs',
        queryFn: async () => {
            return await OrganizationManager.getAllIncidentLogs();
        },
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        refetchIntervalInBackground: true,
    });
}

function useGetAllUsersQuery(): UseQueryResult<Result<SimpleAccount[]>, unknown> {
    return useQuery({
       queryKey: 'getAllUsers',
       queryFn: async () => {
            return await OrganizationManager.getAllUsers();
       },
       refetchOnWindowFocus: false,
       refetchInterval: 60000,
       refetchIntervalInBackground: true,
    });
}
