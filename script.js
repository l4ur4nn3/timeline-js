window.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
  
    const events = [
      {
        title: 'Événement 1',
        year: 2021,
        description: 'Description de l\'événement 1.'
      },
      {
        title: 'Événement 2',
        year: 2019,
        description: 'Description de l\'événement 2.'
      },
      {
        title: 'Événement 3',
        year: 2020,
        description: 'Description de l\'événement 3.'
      },
      {
        title: 'Événement 4',
        year: 2018,
        description: 'Description de l\'événement 4.'
      },
      {
        title: 'Événement 5',
        year: 2022,
        description: 'Description de l\'événement 5.'
      }
    ];
  
    events.sort(function(a, b) {
      return a.year - b.year;
    });
  
    events.forEach(function(event) {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
  
      const eventTitleDiv = document.createElement('div');
      eventTitleDiv.classList.add('event-title');
      eventTitleDiv.innerText = event.title;
  
      const eventYearDiv = document.createElement('div');
      eventYearDiv.classList.add('event-year');
      eventYearDiv.innerText = event.year;
  
      const eventDescriptionDiv = document.createElement('div');
      eventDescriptionDiv.classList.add('event-description');
      eventDescriptionDiv.innerText = event.description;
  
      eventDiv.appendChild(eventTitleDiv);
      eventDiv.appendChild(eventYearDiv);
      eventDiv.appendChild(eventDescriptionDiv);
  
      timeline.appendChild(eventDiv);
    });
  });
  