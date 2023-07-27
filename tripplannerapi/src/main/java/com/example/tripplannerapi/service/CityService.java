package com.example.tripplannerapi.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.tripplannerapi.model.City;

@Service
public class CityService {

    @Value("${WEATHER_API_KEY}")
    private String weatherApiKey;

    List<City> cities = new ArrayList<>(Arrays.asList(
            new City(
                    "calgary,ca",
                    "Calgary, CA",
                    "Calgary is a city in the Canadian province of Alberta. It is the largest city in Alberta and the largest metro area within the three Prairie Provinces region."),
            new City(
                    "toronto,ca",
                    "Toronto, CA",
                    "Toronto is the capital city of the Canadian province of Ontario. With a recorded population of 2,794,356 in 2021,[12] it is the most populous city in Canada and the fourth most populous city in North America."),
            new City(
                    "vancouver,ca",
                    "Vancouver, CA",
                    "Vancouver is a major city in western Canada, located in the Lower Mainland region of British Columbia. As the most populous city in the province."),
            new City(
                    "montreal,ca",
                    "Montreal, CA",
                    "Montreal is the second most populous city in Canada and the most populous city in the province of Quebec."),
            new City(
                    "edmonton,ca",
                    "Edmonton, CA",
                    "Edmonton is the capital city of the Canadian province of Alberta. Edmonton is situated on the North Saskatchewan River and is the centre of the Edmonton Metropolitan Region, which is surrounded by Alberta's central region.")));

    public List<City> getCities() {
        return cities;
    }

    public ResponseEntity<Object> getWeatherbyCityName(String cityName) {
        try {
            final String baseUrl = "http://api.openweathermap.org/data/2.5/weather";
            String uri = UriComponentsBuilder
                    .fromUriString(baseUrl)
                    .queryParam("appid", weatherApiKey)
                    .queryParam("q", cityName)
                    .queryParam("limit", 15)
                    .queryParam("units", "metric")
                    .build().toUriString();
            RestTemplate restTemplate = new RestTemplate();

            String res = restTemplate.getForObject(uri, String.class);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error!, Please try again", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getWeatherForecastbyCityName(String cityName) {
        try {
            final String baseUrl = "http://api.openweathermap.org/data/2.5/forecast";
            String uri = UriComponentsBuilder
                    .fromUriString(baseUrl)
                    .queryParam("appid", weatherApiKey)
                    .queryParam("q", cityName)
                    .queryParam("units", "metric")
                    .build().toUriString();
            RestTemplate restTemplate = new RestTemplate();

            String res = restTemplate.getForObject(uri, String.class);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error!, Please try again", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
