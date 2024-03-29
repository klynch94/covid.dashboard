var olArticles;
var liArticleList;
var numberOfArticles = 2
var hideLower = $(".startHide");
var confirmedTodayEl = $(".confirmed");
var percentagePositiveEl = $(".positive");
var deathsEl = $(".deaths");

hideLower.hide();

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    hideLower.show();
    var zipCode = $("#zipCode").val();
    alert("This API is depreciated and no longer publicly accessible. No Covid-19 data will be displayed in the below charts. Thank you.");
 
    $.ajax({
        url: "/api/covid/" + zipCode,
        method: 'GET',
    }).then(function(response) {
        var confirmedToday = response.covid19.confirmed[0];
        var county = response.covid19.recordLocation;
        var deaths = response.covid19.deaths[0];
        var percentagePositive = ((response.covid19.confirmed[0] / response.covid19.testsPerformed[0]) * 100).toFixed(2) + "%";
        var populationConfirmed = ((response.covid19.confirmed[0] / response.covid19.totalPopulation) * 100).toFixed(2) + "%";
        confirmedTodayEl.text("Confirmed Cases in " + county + ": " + confirmedToday);
        percentagePositiveEl.text("Percentage of Tests Positive in " + county + ": " + percentagePositive);
        deathsEl.text("Reported Deaths in " + county + ": " + deaths);
        var ctx = document.getElementById("casesChart").getContext("2d");
        var confirmedCases = (response.covid19.confirmed).reverse();
        var orgCasesLabels = (response.covid19.dateReport).reverse();
        var newCasesLabels = [];
        for (var y=0; y<orgCasesLabels.length; y+=2) { 
            newCasesLabels.push(orgCasesLabels[y]);
        }

        var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: newCasesLabels,
            datasets: [{
                label: 'Confirmed Cases in ' + county,
                borderColor: 'rgb(18, 18, 20)',
                pointStyle: 'rectRots',
                pointHoverBackgroundColor: '#c45850',
                pointHoverRadius: '6',
                pointHoverBorderWidth: '2',
                data: confirmedCases
            }]
        },

        options: {}
        });

        var deathsVisual = document.getElementById('deathsChart').getContext('2d');
        var confirmedDeaths = (response.covid19.deaths).reverse();
        var secondChart = new Chart(deathsVisual, {
            type: 'line',
            data: {
                labels: newCasesLabels,
                datasets: [{
                    label: 'Confirmed Deaths in ' + county,
                    borderColor: '#c45850',
                    pointStyle: 'rectRots',
                    pointHoverBackgroundColor: 'rgb(18, 18, 20)',
                    pointHoverRadius: '6',
                    pointHoverBorderWidth: '2',
                    data: confirmedDeaths,
                    order: 1
                }, {
                    label: 'Confirmed Cases in ' + county,
                    borderColor: 'rgb(18, 18, 20)',
                    pointStyle: 'rectRots',
                    pointHoverBackgroundColor: '#c45850',
                    pointHoverRadius: '6',
                    pointHoverBorderWidth: '2',
                    data: confirmedCases,
                    order: 2
                }]
            }
        })

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
                    pointHoverBackgroundColor: 'rgb(18, 18, 20)',
                    pointHoverRadius: '6',
                    pointHoverBorderWidth: '2',
                    data: confirmedCases,
                    order: 2
                }]

            }
        })

            var sources = response.covid19.source;
            var sourcesDiv = $("<div>");
            var sourcesP = $("<p>");
            for(var x=0; x<sources.length; x++) {
                if (sources.indexOf(sources[x]) != sources.length -1) {
                    sourcesP.append(sources[x] + ", ");
                } else {
                    sourcesP.append(sources[x]);
                }
                sourcesDiv.append(sourcesP);
            }
            
            $("#sourcesArea").html("<h3><b>Sources:</b></h3>");
            $("#sourcesArea").append(sourcesDiv);
    });
    newsCall();
});

function newsCall() {
    $.ajax({
        url: "/api/guardian",
        method: "GET",
  
    }).then (function(result) {
        $(".articlesList").empty();
        for (var i = 0; i < 3; i++) {
            var newEI = $("<i>");
            // pull data
            var headline = result.response.results[i].webTitle;
            var pubDate = result.response.results[i].webPublicationDate;
            var newPubDate = pubDate.substring(0,10);
            var webUrl = result.response.results[i].webUrl;

            // Facebook Sharing
            var facebookLink = $("<a>").addClass("icon content mt-4 mb-4").attr("target", "_blank").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + webUrl)
            var facebookIcon = $("<i>");
            facebookIcon.addClass("fa fa-facebook-official");
            facebookLink.append(facebookIcon);

            // Twitter Sharing
            var twitterLink = $("<a>").addClass("icon content").attr("target", "_blank").attr("href","https://twitter.com/home?status=" + webUrl);
            var twitterIcon = $("<i>");
            twitterIcon.addClass("fa fa-twitter mb-0");
            twitterLink.append(twitterIcon);

            // email icon
            var email = $("<a>").addClass("icon content").attr("target", "_blank").attr("href", "mailto:info@example.com?&subject=&body=" + webUrl); 
            var emailIcon = newEI.addClass("fa fa-envelope mb-0");
            email.append(emailIcon);

            // LinkedIn Sharing
            var linkedInLink = $("<a>").addClass("icon").attr("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + webUrl);
            var linkedInIcon = $("<i>");
            linkedInIcon.addClass("fa fa-linkedin");
            linkedInLink.append(linkedInIcon);
            
            // create tile elements in HTML
            var longTile = $("<div>").addClass("tile is-vertical");
            var middleTile = $("<div>").addClass("tile");
            longTile.append(middleTile);
            var newItem = $("<li>").addClass("title is-4 ml-4").text(headline);
            var dateP = $("<p>").addClass("subtitle ml-4").text(newPubDate);
            var urlA = $("<a>").addClass("content color").attr("target", "_blank").attr("href", webUrl).text(webUrl);

            // tile container elements
            var levelContainer = $("<div>").addClass("level").attr("id", "levelers");
            var s1 = $("<section>").addClass("level-item").append(facebookLink);
            var s2 = $("<section>").addClass("level-item").append(twitterLink);
            var s3 = $("<section>").addClass("level-item").append(email);
            var s4 = $("<section>").addClass("level-item").append(linkedInLink);
            levelContainer.append(s1, s2, s3, s4);
            levelContainer.prepend($("<br>"))
            var tile = $("<div>").addClass("tile is-parent");
            var art = $("<article>").addClass("tile is-child box");

            // append icons
            art.append(newItem, dateP, urlA, levelContainer);
            tile.append(art);
            middleTile.append(tile);
            longTile.append(middleTile);
            $(".articlesList").append(longTile);
        }
    });
}


let tabsWithContent = (function () {
    let tabs = document.querySelectorAll('.tabs li');
    let tabsContent = document.querySelectorAll('.tab-content');
  
    let deactvateAllTabs = function () {
      tabs.forEach(function (tab) {
        tab.classList.remove('is-active');
      });
    };
  
    let hideTabsContent = function () {
      tabsContent.forEach(function (tabContent) {
        tabContent.classList.remove('is-active');
      });
    };
  
    let activateTabsContent = function (tab) {
      tabsContent[getIndex(tab)].classList.add('is-active');
    };
  
    let getIndex = function (el) {
      return [...el.parentElement.children].indexOf(el);
    };
  
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        deactvateAllTabs();
        hideTabsContent();
        tab.classList.add('is-active');
        activateTabsContent(tab);
      });
    })
  
    tabs[0].click();
  })();


    







