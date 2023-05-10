window.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const h4Elements = document.querySelectorAll('h4.title-heading-left');
    const spanElements = document.querySelectorAll('span.fusion-tb-published-date');
  
    if (h4Elements.length !== spanElements.length) {
      console.error('Le nombre d\'éléments h4 et span ne correspond pas.');
      return;
    }
  
    const events = [];
  
    for (let i = 0; i < h4Elements.length; i++) {
      const h4Text = h4Elements[i].innerText;
      const spanText = spanElements[i].innerText.match(/\b(\w+)$/)[0];
  
      const event = {
        title: h4Text,
        date: spanText
      };
  
      events.push(event);
    }
  
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
  