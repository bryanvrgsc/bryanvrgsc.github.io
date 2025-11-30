export interface CountryTelephoneData {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    areaCodes?: string[] | null;
}

export interface PhoneInputProps {
    value: string;
    countryCode: string;
    onChange: (value: string, countryCode: string) => void;
    placeholder?: string;
    disabled?: boolean;
}