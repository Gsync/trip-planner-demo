export interface WeatherResponse {
    main?: {
        feels_like: number;
        humidity: number;
        temp: number;
    };
    weather?: WeatherDescription[];
}

interface WeatherDescription {
    description: string;
    id: number;
    main: string;
    icon: string;
}