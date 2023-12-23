import axios, { type AxiosRequestConfig } from 'axios';
import type OrganizationForm from '../models/forms/OrganizationForm';
import type UserForm from '../models/forms/UserForm';
import type LoginForm from '../models/forms/LoginForm';
import type SimpleAccount from '../models/entities/SimpleAccount';
import type IncidentLog from '../models/entities/IncidentLog';
import EditUserForm from '../models/entities/EditUserForm';

export interface Success {
    success: boolean;
    errorType?: ErrorType;
}

export interface Result<T> extends Success {
    result?: T;
}

const baseUrl = 'http://localhost:5143/';

export class AuthManager {
    private static readonly authBaseUrl = `${baseUrl}Auth/`;

    static async login(form: LoginForm): Promise<Success> {
        return await getResponse({
            method: 'post',
            url: this.authBaseUrl + 'Login',
            form,
            config: { withCredentials: true },
        });
    }

    static async registerOrganization(form: OrganizationForm): Promise<Success> {
        return await getResponse({
            method: 'post',
            url: this.authBaseUrl + 'RegisterOrganization',
            form,
        });
    }

    static async registerUser(form: UserForm): Promise<Success> {
        return await getResponse({
            method: 'post',
            url: this.authBaseUrl + 'RegisterUser',
            form,
            config: { withCredentials: true }
        });
    }

    static async logout(): Promise<Success> {
        return await getResponse({
            method: 'post',
            url: this.authBaseUrl + 'Logout',
            config: { withCredentials: true },
        });
    }

    static async getCurrentAccount(): Promise<Result<SimpleAccount>> {
        return await getResponse({
            method: 'get',
            url: this.authBaseUrl + 'GetCurrentAccount',
            config: { withCredentials: true },
        });
    }

    static async deleteAccount(): Promise<Success> {
        return await getResponse({
            method: 'delete',
            url: this.authBaseUrl + 'DeleteAccount',
            config: { withCredentials: true }
        });
    }
}

export class OrganizationManager {
    private static readonly organizationBaseUrl = `${baseUrl}Organization/`;

    static async addIncidentLog(form: FormData): Promise<Result<IncidentLog>> {
        return await getResponse({
            method: 'post',
            url: this.organizationBaseUrl + 'AddIncidentLog',
            form,
            config: { withCredentials: true },
        });
    }

    static async getAllIncidentLogs(): Promise<Result<IncidentLog[]>> {
        return await getResponse({
            method: 'get',
            url: this.organizationBaseUrl + 'GetAllIncidentLogs',
            config: { withCredentials: true },
        });
    }

    static async getIncidentLogById(id: string): Promise<Result<IncidentLog>> {
        return await getResponse({
            method: 'get',
            url: this.organizationBaseUrl + `GetIncidentLogById/${id}`,
            config: { withCredentials: true },
        });
    }

    static async findAccount(id: string): Promise<Result<SimpleAccount>> {
        return await getResponse({
            method: 'get',
            url: this.organizationBaseUrl + `FindAccount/${id}`,
            config: { withCredentials: true },
        });
    }

    static async getAllUsers(): Promise<Result<SimpleAccount[]>> {
        return await getResponse({
            method: 'get',
            url: this.organizationBaseUrl + 'GetAllUsers',
            config: { withCredentials: true },
        });
    }

    static async updateUserRole(id: string, form: EditUserForm): Promise<Success> {
        return await getResponse({
            method: 'put',
            url: this.organizationBaseUrl + `UpdateUserRole/${id}`,
            form,
            config: { withCredentials: true }
        });
    }
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface GetResponseProps {
    method: HttpMethod;
    url: string;
    form?: any;
    config?: AxiosRequestConfig<any>;
}

async function getResponse<T extends Success>({
    method,
    url,
    form,
    config,
}: GetResponseProps): Promise<T> {
    try {
        const response =
            method === 'get' || method === 'delete'
                ? await axios[method](url, config)
                : await axios[method](url, form, config);
        return (
            response.data.result === undefined
                ? { success: true }
                : { result: response.data.result, success: true }
        ) as any;
    } catch (error: any) {
        if (error?.response?.status === 401 && !(await isAuthorized())) {
            if (await refreshToken()) return await getResponse({ method, url, form, config });
        }
        return { success: false, errorType: getErrorType(error) } as any;
    }
}

async function isAuthorized(): Promise<boolean> {
    try {
        await axios.get(baseUrl + 'Auth/IsAuthorized', { withCredentials: true });
        return true;
    } catch {
        return false;
    }
}

async function refreshToken(): Promise<boolean> {
    try {
        await axios.post(baseUrl + 'Auth/RefreshToken', undefined, { withCredentials: true });
        return true;
    } catch {
        return false;
    }
}

function getErrorType(error: any): ErrorType {
    const receivedErrorType = error?.response?.data.error as ErrorType | undefined;
    if (receivedErrorType) return receivedErrorType;

    return ErrorType.Unknown;
}

export enum ErrorType {
    Unknown = 'Unknown',
    IncorrectEmailOrPassword = 'IncorrectEmailOrPassword',
    InvalidForm = 'InvalidForm',
    InvalidEmail = 'InvalidEmail',
    DuplicateEmail = 'DuplicateEmail',
    PasswordTooShort = 'PasswordTooShort',
    PasswordRequiresNonAlphanumeric = 'PasswordRequiresNonAlphanumeric',
    PasswordRequiresDigit = 'PasswordRequiresDigit',
    PasswordRequiresLower = 'PasswordRequiresLower',
    PasswordRequiresUpper = 'PasswordRequiresUpper',
    InsufficientPermission = 'InsufficientPermission',
}
