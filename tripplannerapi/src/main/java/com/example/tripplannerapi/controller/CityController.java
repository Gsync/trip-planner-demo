package com.example.tripplannerapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripplannerapi.model.City;
import com.example.tripplannerapi.service.CityService;

@RestController
@CrossOrigin(origins = "http://khuram-trip-planner-demo.s3-website-us-west-2.amazonaws.com")
@RequestMapping(path = "/api")
public class CityController {
    
    CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/cities")
    public List<City> getCities() {
        return cityService.getCities();
    }

    @GetMapping("/weather/{cityName}")
    public Object getWeather(@PathVariable("cityName") String cityName) {
        return cityService.getWeatherbyCityName(cityName);
    } 

    @GetMapping("/forecast/{cityName}")
    public Object getWeatherForecast(@PathVariable("cityName") String cityName) {
        return cityService.getWeatherForecastbyCityName(cityName);
    } 
}
