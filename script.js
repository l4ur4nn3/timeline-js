window.addEventListener("DOMContentLoaded", function () {
  const timeline = document.querySelector(".timeline");
  const h4Elements = document.querySelectorAll("h4.title-heading-left");
  const spanElements = document.querySelectorAll(
    "span.fusion-tb-published-date"
  );

  if (h4Elements.length !== spanElements.length) {
    console.error("Le nombre d'éléments h4 et span ne correspond pas.");
    return;
  }

  const events = [];

  // Générer 10 événements aléatoires entre 1900 et 2010
  for (let i = 0; i < 10; i++) {
    const year = Math.floor(Math.random() * (2011 - 1900)) + 1900;
    const title = `Événement ${i + 1}`;
    const link = `#`;

    const event = {
      title: title,
      date: year.toString(),
      link: link,
    };

    events.push(event);
  }

  // Ajouter deux événements se produisant la même année
  const sameYear = Math.floor(Math.random() * (2011 - 1900)) + 1900;
  const sameYearEvent1 = {
    title: "Événement A",
    date: sameYear.toString(),
    link: "https://example.com/eventA",
  };
  const sameYearEvent2 = {
    title: "Événement B",
    date: sameYear.toString(),
    link: "https://example.com/eventB",
  };
  events.push(sameYearEvent1, sameYearEvent2);

  // Trier les événements par date
  events.sort(function (a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  console.log(events);

  for (let i = 0; i < h4Elements.length; i++) {
    const h4Text = h4Elements[i].innerText;
    const spanText = spanElements[i].innerText.match(/\b(\w+)$/)[0];
    const link = h4Elements[i].querySelector("a").href;

    const event = {
      title: h4Text,
      date: spanText,
      link: link,
    };

    events.push(event);
  }

  events.sort(function (a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  const mergedEvents = [];
  let prevEvent = null;

  events.forEach(function (event) {
    if (prevEvent && prevEvent.date === event.date) {
      prevEvent.title.push(event.title);
    } else {
      event.title = [event.title];
      mergedEvents.push(event);
      prevEvent = event;
    }
  });

  const decades = [];
  for (let year = 1900; year <= 2010; year += 10) {
    decades.push(year);
  }

  const eventsByDecade = {}; // Object pour stocker le nombre d'événements par décennie

  decades.forEach(function (decade) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.addEventListener("mouseleave", function () {
      eventTitleDiv.style.display = "none"; // Masquer le event-title
    });

    const eventTitleDiv = document.createElement("div");
    eventTitleDiv.classList.add("event-title");
    const titleList = document.createElement("ul");
    mergedEvents.forEach(function (event) {
      if (parseInt(event.date) >= decade && parseInt(event.date) < decade + 10) {
        event.title.forEach(function (title) {
          const listItem = document.createElement("li");
          const dateElement = document.createElement("span");
          dateElement.innerText = event.date;
          listItem.appendChild(dateElement);
          const linkElement = document.createElement("a");
          linkElement.href = event.link;
          linkElement.innerText = title;
          listItem.appendChild(linkElement);
          titleList.appendChild(listItem);
        });
      }
    });
    eventTitleDiv.appendChild(titleList);

    const eventDateDiv = document.createElement("div");
    eventDateDiv.classList.add("event-date");
    eventDateDiv.innerText = decade;

    // Ajouter l'attribut data-tooltip et l'événement mouseenter
    eventDateDiv.setAttribute("data-tooltip", "Aucune entrée pour cette décennie");
    eventDateDiv.addEventListener("mouseenter", function () {
      const tooltip = eventDateDiv.getAttribute("data-tooltip");
      if (tooltip) {
        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add("tooltip");
        tooltipElement.innerText = tooltip;
        eventDateDiv.appendChild(tooltipElement);
      }
    });

    eventDateDiv.addEventListener("mouseleave", function () {
      const tooltipElement = eventDateDiv.querySelector(".tooltip");
      if (tooltipElement) {
        tooltipElement.remove();
      }
    });

    function addPulseAnimation() {
      eventDateDiv.classList.add("pulse-animation", "pulse-beat"); // Ajouter les classes pulse-animation et pulse-beat

      setTimeout(function () {
        eventDateDiv.classList.remove("pulse-beat"); // Supprimer la classe pulse-beat après 3 secondes
      }, 3000);
    }

    // Vérifier si l'utilisateur a fait défiler jusqu'à la section ".timeline"
    let isTimelineVisible = false;
    const checkTimelineVisibility = function () {
      const timelineRect = timeline.getBoundingClientRect();
      if (timelineRect.top < window.innerHeight) {
        isTimelineVisible = true;
        addPulseAnimation();
        window.removeEventListener("scroll", checkTimelineVisibility);
      }
    };
    window.addEventListener("scroll", checkTimelineVisibility);

    if (titleList.children.length === 0) {
      eventDateDiv.classList.add("disabled");
      eventDateDiv.title = "Aucune entrée pour cette décennie";
    } else {
      eventDateDiv.addEventListener("mouseenter", function () {
        const isHidden = eventTitleDiv.style.display === "none";

        // Cacher tous les event-title
        const allEventTitles = document.querySelectorAll(".event-title");
        allEventTitles.forEach(function (title) {
          title.style.display = "none";
        });

        if (isHidden) {
          eventTitleDiv.style.display = "block"; // Afficher le event-title
        } else {
          eventTitleDiv.style.display = "none"; // Masquer le event-title
        }
      });
    }

    eventDiv.appendChild(eventTitleDiv);
    eventDiv.appendChild(eventDateDiv);

    timeline.appendChild(eventDiv);

    // Compter le nombre d'événements par décennie
    const eventCount = titleList.children.length;
    if (!eventsByDecade[decade]) {
      eventsByDecade[decade] = eventCount;
    } else {
      eventsByDecade[decade] += eventCount;
    }
  });

  // Afficher le nombre d'événements par décennie
  for (const decade in eventsByDecade) {
    const countElement = document.createElement("span");
    countElement.innerText = ` (${eventsByDecade[decade]})`;

    // Ajout de la classe "eventsByDecade"
    countElement.classList.add("eventsByDecade");

    const eventDateDiv = Array.from(
      timeline.getElementsByClassName("event-date")
    ).find((element) => element.innerText === decade);
    eventDateDiv.appendChild(countElement);
  }

  // Cacher tous les event-title au chargement de la page
  const allEventTitles = document.querySelectorAll(".event-title");
  allEventTitles.forEach(function (title) {
    title.style.display = "none";
  });

  const chartContainerClone = document.createElement("div");
  chartContainerClone.id = "chart-container-clone";

  // const myChartClone = document.createElement("canvas");
  // myChartClone.id = "myChartTwo";
  // chartContainerClone.appendChild(myChartClone);

  const timelineClone = timeline.cloneNode(true);
  timelineClone.classList.add("timelinetwo");

  timeline.parentNode.insertBefore(chartContainerClone, timeline.nextSibling);
  timeline.parentNode.insertBefore(timelineClone, chartContainerClone.nextSibling);

  const ctx = document.getElementById("myChart");
  const ctxClone = document.getElementById("myChartTwo");

  const data = {
    labels: Object.keys(eventsByDecade),
    datasets: [
      {
        label: "Événement(s)",
        data: Object.values(eventsByDecade),
        backgroundColor: "#0070ba",
        borderColor: "#0070ba",
        barThickness: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Permet au graphique d'ajuster sa taille en fonction du conteneur
    aspectRatio: 5, // Définit le ratio de l'aspect du graphique (largeur / hauteur)
    plugins: {
      legend: {
        display: false, // Masquer la légende
      },
    },
    scales: {
      x: {
        display: false,
        drawBorder: false,
        axis: {
          display: false, // Masquer la ligne de l'axe x
          drawOnChartArea: false, // Ne pas dessiner la ligne de l'axe x sur la zone du graphique
        },
        grid: {
          display: false, // Masquer la grille de l'axe x
        },
        title: {
          display: false, // Masquer le titre de l'axe x
        },
        ticks: {
          display: false, // Masquer les labels de l'axe x
        },
      },
      y: {
        display: false,
        drawBorder: false,
        axis: {
          display: false, // Masquer la ligne de l'axe x
          drawOnChartArea: false, // Ne pas dessiner la ligne de l'axe x sur la zone du graphique
        },
        grid: {
          display: false, // Masquer la grille de l'axe y
        },
        title: {
          display: false, // Masquer le titre de l'axe y
        },
        ticks: {
          display: false, // Masquer les labels de l'axe y
        },
      },
    },
  };

  const myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });

  const myChartCloneInstance = new Chart(ctxClone, {
    type: "bar",
    data: data,
    options: options,
  });

const originalTimeline = document.querySelector(".timeline");
const clonedTimeline = document.querySelector(".timelinetwo");
const firstClonedTimelineDate = clonedTimeline.querySelector(".event-date");

originalTimeline.addEventListener("click", function(event) {
  if (event.target.classList.contains("event-date")) {
    const clickedYear = event.target.textContent;
    const extractedYear = clickedYear.match(/\d+/); // Recherche du premier nombre dans le texte
    const yearText = extractedYear ? extractedYear[0] : ""; // Extraction du premier nombre trouvé

    firstClonedTimelineDate.textContent = yearText;
    firstClonedTimelineDate.removeAttribute("data-tooltip");
	  
	const clonedEventDates = clonedTimeline.querySelectorAll(".event-date");

for (let i = 1; i <= 10; i++) {
  const previousDate = parseInt(clonedEventDates[i - 1].textContent);
  const newDate = previousDate + 1;
  clonedEventDates[i].textContent = newDate;
}

  }
});

const clonedTimelineEvents = clonedTimeline.querySelectorAll(".event");

if (clonedTimelineEvents.length > 0) {
  const lastEvent = clonedTimelineEvents[clonedTimelineEvents.length - 1];
  lastEvent.remove();
}

const eventDateElements = document.querySelectorAll(".event-date");
eventDateElements.forEach(function (element) {
  element.removeAttribute("title");
  element.removeAttribute("data-tooltip");
});


});
