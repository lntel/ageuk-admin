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