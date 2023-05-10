window.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    
    const events = [
      {
        title: 'Titre de l\'événement 1',
        date: '2023-05-01'
      },
      {
        title: 'Titre de l\'événement 2',
        date: '2023-05-05'
      },
      {
        title: 'Titre de l\'événement 3',
        date: '2023-05-10'
      }
    ];
  
    events.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      return dateA - dateB;
    });
  
    events.forEach(function(event) {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
  
      const eventTitleDiv = document.createElement('div');
      eventTitleDiv.classList.add('event-title');
      eventTitleDiv.innerText = event.title;
  
      const eventDateDiv = document.createElement('div');
      eventDateDiv.classList.add('event-date');
      eventDateDiv.innerText = event.date;
  
      eventDateDiv.addEventListener('click', function() {
        const isHidden = eventTitleDiv.style.display === 'none';
  
        // Cacher tous les event-title
        const allEventTitles = document.querySelectorAll('.event-title');
        allEventTitles.forEach(function(title) {
          title.style.display = 'none';
        });
  
        if (isHidden) {
          eventTitleDiv.style.display = 'block'; // Afficher le event-title
        }
      });
  
      eventDiv.appendChild(eventTitleDiv);
      eventDiv.appendChild(eventDateDiv);
  
      timeline.appendChild(eventDiv);
    });
  
    // Cacher tous les event-title au chargement de la page
    const allEventTitles = document.querySelectorAll('.event-title');
    allEventTitles.forEach(function(title) {
      title.style.display = 'none';
    });
  });
  