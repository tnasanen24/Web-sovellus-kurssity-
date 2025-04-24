# Available parking space web application

## General information
This repository contains source code for a web application that uses Digitransit API map tiles and Oulunliikenne API information about parking garages/open space parking and their location, capacity and available spaces.
Leaflet is used to present the map tiles in interactive way on the webpage.

## What do I need to use this?
You will need an API key from Digitransit (https://digitransit.fi/) and you will need to add a "config.js" file to js folder with the API key in it.
Config.js
contains this:
const SUBSCRIPTION_KEY = "Your API Key here"
I used Live server extension on Vs code, but other solutions might work for you.

### Why is it useful?
You can see the availability and location information presented in a simple way.

### Important notice
Remember to use the Digitransit and Oulunliikenne APIs according to their terms of service.
For example from Digitransit 24.04.2025
<blockquote>
 "The APIs currently have no rate limiting, but you should avoid doing more than 10 requests per second. Starting 31.1.2024, we will enforce rate and > quota limits but the limits should only restrict misuse of the APIs, not normal use. If you need to make a large amount of requests, you might want to host the API locally."
</blockquote>
