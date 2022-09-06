import { PermissionTypeEnum } from "./enums/permissions";

export interface Patient {
    surname: string;
    addressLine: string;
    county: string;
    postcode: string;
    firstName: string;
    middleNames: string;
    startDate: Date;
    prognosis: string;
    city: string;
    id: string;
    diagnoses: string[];
    generalPractionerId: number;
    referralId?: number;
    eightWeekReview: Date;
    sixWeekReview: Date;
    telephoneNumber: string;
    dob: Date;
    gpFullname: string;
}

export interface IStaff {
    firstName: string;
    surname: string;
    dob: Date;
    addressLine: string;
    postcode: string;
}
export interface IGpSurgery {
    id: number;
    phoneNumber: string;
    surgeryName: string;
    address: string;
}

export interface IRole {
    id: string;
    name: string;
    created: Date;
    lastUpdated: Date;
    permissions: PermissionTypeEnum[];
}