const showTimes = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];



const showsSchedule = document.querySelector(".shows__schedule");
console.log(showsSchedule);

showTimes.forEach((show) => {
    //Element Creation for Show Card 
    const showCard  = document.createElement("div");
    const dateLabel = document.createElement("p");
    const showDate = document.createElement("p");
    const venueLabel = document.createElement("p");
    const venueName = document.createElement("p");
    const locLabel = document.createElement("p");
    const locName = document.createElement("p");
    const button = document.createElement("button");
    const newSec =  document.createElement("hr");


    //data insertion
    dateLabel.innerText = "DATE";
    venueLabel.innerText = "VENUE";
    locLabel.innerText = "LOCATION";
    showDate.innerText = show.date;
    venueName.innerText = show.venue;
    locName.innerText = show.location;
    button.innerText = "BUY TICKETS";


    //adding classes
    showCard.classList.add("shows__card");
    dateLabel.classList.add("shows__label");
    showDate.classList.add("shows__date");
    venueLabel.classList.add("shows__label");
    venueName.classList.add("shows__venue");
    locLabel.classList.add("shows__label");
    locName.classList.add("shows__loc");
    button.classList.add("shows__btn");
    newSec.classList.add("shows__new-sec");



    //html insertion
    showCard.appendChild(dateLabel);
    showCard.appendChild(showDate);
    showCard.appendChild(venueLabel);
    showCard.appendChild(venueName);
    showCard.appendChild(locLabel);
    showCard.appendChild(locName);
    showCard.appendChild(button);


    showsSchedule.appendChild(showCard);
    showsSchedule.appendChild(newSec);

});




showsSchedule.addEventListener("click", (e) => {
    const showCards = document.querySelectorAll('.shows__card');

    showCards.forEach(element => element.classList.remove('shows__card--clicked'))
    e.preventDefault();
    console.log(e.target);
    if ((e.target.nodeName === 'DIV') && e.target.classList.contains('shows__card')) {
        e.target.classList.add("shows__card--clicked");
    } else if(e.target.nodeName === 'HR') {
        return;
    }
    else {
        const clickedDiv = e.target.parentNode;
        if(clickedDiv.classList.contains("shows__card"))
            clickedDiv.classList.add("shows__card--clicked");
    }
});
//  API request to fetch a song
fetch('<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1770884049&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/chris-wallem" title="Chris Wallem" target="_blank" style="color: #cccccc; text-decoration: none;">Chris Wallem</a> · <a href="https://soundcloud.com/chris-wallem/sade-no-ordinary-love-chris-wallem-afrohouse-remix" title="SADE - NO ORDINARY LOVE (Chris Wallem AfroHouse Remix)" target="_blank" style="color: #cccccc; text-decoration: none;">SADE - NO ORDINARY LOVE (Chris Wallem AfroHouse Remix)</a></div>')
  .then(response => response.json())
  .then(data => {
    // Extract song URL from API response
    const songUrl = data.url;

    // Construct iframe element
    const iframe = document.createElement('iframe');
    iframe.src = songUrl;
    iframe.width = '25%';
    iframe.height = '300';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    
    // Append iframe to website
    document.body.appendChild(iframe);
  })
  .catch(error => console.error('Error fetching song:', error));
