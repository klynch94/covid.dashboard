# Corona-Stats

For this project, we wanted to give the user the ability to search a location and present them with COVID-19 related news articles and statistics about that area. If the user is traveling somewhere, or simply wants to see how prevalent the disease is within their neighborhood, they can easily reference this application to find the most recent COVID-19 related data and news.

## Functionality

Utilizing zip codes, users can search a specific location to better understand COVID-19 cases within that area. 

![Search-Photo](/Assets/search.png)

Using The Weather Company’s Disease Tracker API, we are able to pull in COVID-19 data and statistics from the user’s searched location. We built the API call to present the user with the following metrics:
1. Cases confirmed
2. Deaths confirmed
3. No. of Tests performed
4. No. of Tests positive 

Data is shown in a chart like the below:
![Chart-Photo](/Assets/results1.png)


In addition, we are able to surface the latest COVID-19 related news articles by utilizing The Guardian’s news API. We present the articles below the disease data and the user is able to share these on their favorite Social Media site. 
![Articles-Photo](/Assets/articles.png)

In the first photo, you can see two streams of data displaying.

![DataOn-Photo](/Assets/testpositive.png)

If the user chooses, then either of the two streams of data can be toggled off so that only one line of data displays at a time. The user may do this by clicking the title for that line above the chart. It will strikethrough and disappear from the graph, until clicked again.

![DataOff-Photo](/Assets/crossedoff.png)




### Chart.js Code Example
``` JS
var casesvsconfirmed = document.getElementById('testsChart').getContext('2d');
        var testsPerformed = (response.covid19.testsPerformed).reverse();
        var thirdChart = new Chart(casesvsconfirmed, {
            type: 'line',
            data: {
                labels: newCasesLabels,
                datasets: [{
                    label: 'Tests Performed in ' + county,
                    borderColor: 'rgb(18, 18, 20)',
                    pointHoverBackgroundColor: '#c45850',
                    pointHoverRadius: '6',
                    pointHoverBorderWidth: '2',
                    data: testsPerformed,
                    order: 1
                }, {
                    label: 'Cases Positive in ' + county,
                    borderColor: '#c45850',
                    pointHoverBackgroundColor: '#c45850',
                    pointHoverRadius: '6',
                    pointHoverBorderWidth: '2',
                    data: confirmedCases,
                    order: 2
                }]
```

## Future Enhancements:

We plan to add in the following features: 
1. Surface localized news articles for the user depending on what location they are searching
2. In addition to searching by zip code, give the user the ability to search by city, town and state
3. Create forums for each city searched for people to connect and share news
4. Allow users to "like" an article at the click of a "heart" button

### Link to the deployed app on Heroku
https://coviddashboard8.herokuapp.com/
