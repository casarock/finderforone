(function(w) {
    var dateObj = new Date(),
        currentYear = dateObj.getFullYear(),
        shows = window.dates["2014"];

    function getUpcomingShows() {
        var timeNow = new Date(),
            upcoming = [];

        for (var i = 0, len = shows.length; i < len; i++) {
            var startTimeHour = shows[i].from.split(':')[0],
                dateString = "%year%/12/31 %time%:00",
                refDate,
                newDateString = dateString.replace("%time%", shows[i].from);

            newDateString = newDateString.replace("%year%", (startTimeHour == 0 ? currentYear + 1 : currentYear));
            refDate = new Date(newDateString);

            if (refDate.getTime() > timeNow.getTime()) {
                upcoming.push(shows[i]);
            }
        }

        return upcoming;
    }

    function getMissedShows() {
        var timeNow = new Date(),
            missed = [];

        for (var i = 0, len = shows.length; i < len; i++) {
            var startTimeHour = shows[i].from.split(':')[0],
                dateString = "%year%/12/31 %time%:00",
                refDate,
                newDateString = dateString.replace("%time%", shows[i].from);

            newDateString = newDateString.replace("%year%", (startTimeHour == 0 ? currentYear + 1 : currentYear));
            refDate = new Date(newDateString);

            if (refDate.getTime() < timeNow.getTime()) {
                missed.push(shows[i]);
            }
        }

        return missed;
    }

    function renderUpcoming() {
        var upcoming = getUpcomingShows();

        renderTemplate(upcoming, "Es kommen noch ");
    }

    function renderMissed() {
        var missed = getMissedShows();

        renderTemplate(missed, "Verpasst wurden bereits ");
    }

    function renderTemplate(data, title) {
        var tmplSource = $("#entry-template").html(),
            tmpl= Handlebars.compile(tmplSource),
            showCount = data.length,
            context = {show: data, title: title, showCount: showCount},
            htmlOutput = tmpl(context);

        $('#content').html(htmlOutput);
    }

    function renderAbout() {
        var tmplSource = $("#about-template").html(),
            tmpl= Handlebars.compile(tmplSource),
            htmlOutput = tmpl();

        $('#content').html(htmlOutput);
    }

    function bindEvents() {
        $('#missed').on('click', function() {
            renderMissed();
            $('.nav li').attr('class', '');
            $('#missed').addClass('active');
        });

        $('#home').on('click', function() {
            renderUpcoming();
            $('.nav li').attr('class', '');
            $('#home').addClass('active');
        });

        $('#about').on('click', function() {
            renderAbout();
            $('.nav li').attr('class', '');
            $('#about').addClass('active');
        });
    }

    w.forOne = {
        upcoming: getUpcomingShows,
        renderUpcoming: renderUpcoming,
        renderMissed: renderMissed

    };

    renderUpcoming();
    bindEvents();

})(window);
