# Nautical Escapes 2021
Base Website Design For Nautical Escapes 2021, with any sensitive information removed. 

![screenshot of nautical escapes 2021 homepage](./screenshots/nauticalescapes2021.com_.png)
-Screenshot taken with Google Chrome Inspector Commands-

***Personal Thoughts***

***Search Engine Optimization***

I was asked to delay any specific long-tail keyword optimization until COVID-19 ends, or even creating a Google 'My Business' Account, as the owners were hesitant to advertise their business before they were ready to launch. Notwithstanding that, I was able to ensure that nauticalescapes2021.com returned the number one result for 'nautical escapes' or 'nautical escapes 2021'.

Google Search Console - All Queries
![screenshot of google search console s.e.o for nautical escapes 2021](./screenshots/google_search_allq.png)

Google Search Console - Query ['nautical escapes']
![screenshot of google search console s.e.o for nautical escapes 2021](./screenshots/google_search_neq.png)

Google Search Results Page
![screenshot of google search results page for 'nautical escapes' query](./screenshots/google_search_resultsp.png)

***Geolocation / Marine AIS Solution***

One of the main requirements, and the most worrying technical challenge for me when I started this project was the business owners desire to integrate Marine A.I.S tracking systems into the implementation of the 'blogish' features on the website. ![screenshot of marinetraffic.com](./screenshots/marine_traffic.png)

At the beginning I had a very limited understanding of marine tracking intelligence systems, but given time I was able to look into a number of solutions for creating an automated system to receive AIS signals (VHF transceivers are able to receive signals from AIS), and update the website accordingly, however, in the end, the most efficient solution was to, (with permission), piggyback off of a service that receives AIS signals and records vessel locations in real-time. After setting all this up, and ensuring that I would be able to set-up what was needed, in the end, the business owners decided not to install AIS onboard their vessel anyways, but I still consider the entire process a valuable learning experience.

The current implementation of the geolocation tracking is much simpler, and does not run in real-time at all, for both financial and security reasons. When the business owners would like to place a pin on the leaflet.js map system (https://nauticalescapes2021.com/ouradventure), they simply authenticate using a trusted device, then complete a simple form, filling in the necessary information, while the web browser uses the cellular data to provide an accurate latitude and longitude. 

***Google Inspector Lighthouse Results***

![screenshot of google chrome inspector lightouse results for nauticalescapes2021.com](./screenshots/lighthouse.PNG)
