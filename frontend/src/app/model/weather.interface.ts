export interface WeatherResponse {
    dt?: number;
    main?: {
        feels_like: number;
        humidity: number;
        temp: number;
    };
    weather?: WeatherDescription[];
}

export interface ForecastResponse {
    list: WeatherResponse[];
}

interface WeatherDescription {
    description: string;
    id: number;
    main: string;
    icon: string;
}