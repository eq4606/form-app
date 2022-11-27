export interface IProcess {
    superClaim: {
        superClaimNum: number;
        superClaimStatus: {
            code: number | undefined;
            value: string;
        };
        superClaimType: number | undefined;
        eventDate: number | undefined;
        claimCause: number | undefined;
        injuryType: number | undefined;
        submitedBy: number | undefined;
        submitionMethod: number | undefined;
    };
    insured: {
        address: {
            cityName: string;
            streetName: string;
        };
        identityType: number;
        age: number;
        lastName: string;
        identity: number;
        firstName: string;
    };
    contactPersons: [{
        id: number;
        deliveryFlag: boolean;
        type: number;
        name: string;
        phoneNumber: number;
        email: string;
        address: string;
    }];
}