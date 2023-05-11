window.addEventListener('DOMContentLoaded', function() {
  const timeline = document.querySelector('.timeline');
  const h4Elements = document.querySelectorAll('h4.title-heading-left');
  const spanElements = document.querySelectorAll('span.fusion-tb-published-date');



  if (h4Elements.length !== spanElements.length) {
    console.error('Le nombre d\'éléments h4 et span ne correspond pas.');
    return;
  }

  const events = [];

  // Générer 10 événements aléatoires entre 1900 et 2010
  for (let i = 0; i < 10; i++) {
    const year = Math.floor(Math.random() * (2011 - 1900)) + 1900;
    const title = `Événement ${i + 1}`;
    const link = `https://example.com/event${i + 1}`;
  
    const event = {
      title: title,
      date: year.toString(),
      link: link
    };
  
    events.push(event);
  }
  
  // Ajouter deux événements se produisant la même année
  const sameYear = Math.floor(Math.random() * (2011 - 1900)) + 1900;
  const sameYearEvent1 = {
    title: 'Événement A',
    date: sameYear.toString(),
    link: 'https://example.com/eventA'
  };
  const sameYearEvent2 = {
    title: 'Événement B',
    date: sameYear.toString(),
    link: 'https://example.com/eventB'
  };
  events.push(sameYearEvent1, sameYearEvent2);
  
  // Trier les événements par date
  events.sort(function(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
  
  console.log(events);
  

  for (let i = 0; i < h4Elements.length; i++) {
    const h4Text = h4Elements[i].innerText;
    const spanText = spanElements[i].innerText.match(/\b(\w+)$/)[0];
    const link = h4Elements[i].querySelector('a').href;

    const event = {
      title: h4Text,
      date: spanText,
      link: link
    };

    events.push(event);
  }

  events.sort(function(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  const mergedEvents = [];
  let prevEvent = null;

  events.forEach(function(event) {
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

  decades.forEach(function(decade) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    const eventTitleDiv = document.createElement('div');
    eventTitleDiv.classList.add('event-title');
    const titleList = document.createElement('ul');
    mergedEvents.forEach(function(event) {
      if (parseInt(event.date) >= decade && parseInt(event.date) < decade + 10) {
        event.title.forEach(function(title) {
          const listItem = document.createElement('li');
          const dateElement = document.createElement('span');
          dateElement.innerText = event.date;
          listItem.appendChild(dateElement);
          const linkElement = document.createElement('a');
          linkElement.href = event.link;
          linkElement.innerText = title;
          listItem.appendChild(linkElement);
          titleList.appendChild(listItem);
        });
      }
    });
    eventTitleDiv.appendChild(titleList);

    const eventDateDiv = document.createElement('div');
    eventDateDiv.classList.add('event-date');
    eventDateDiv.innerText = decade;

    if (titleList.children.length === 0) {
      eventDateDiv.classList.add('disabled');
    } else {
      eventDateDiv.addEventListener('click', function() {
        const isHidden = eventTitleDiv.style.display === 'none';

        // Cacher tous les event-title
        const allEventTitles = document.querySelectorAll('.event-title');
        allEventTitles.forEach(function(title) {
          title.style.display = 'none';
        });

        if (isHidden) {
          eventTitleDiv.style.display = 'block'; // Afficher le event-title
        } else {
          eventTitleDiv.style.display = 'none'; // Masquer le event-title
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
  const countElement = document.createElement('span');
  countElement.innerText = ` (${eventsByDecade[decade]})`;

  const eventDateDiv = Array.from(timeline.getElementsByClassName('event-date')).find(element => element.innerText === decade);
  eventDateDiv.appendChild(countElement);
}


  // Cacher tous les event-title au chargement de la page
  const allEventTitles = document.querySelectorAll('.event-title');
  allEventTitles.forEach(function(title) {
    title.style.display = 'none';
  });
});
