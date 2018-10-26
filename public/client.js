// * As a user, I should be able to login so that I may use Popcorn.
// * As a user, I should be able to logout so that my account remains private.
// * As a user, I should be able to register so that I can use the features.
// * As a user, I should be able to chat with another user so that I can socialize while watching videos.
// * As a user, I should be able to watch and chat at the same time with long-distance friends/family.
// * As a user, I should be able to be in sync with the other user so that we can always watch at the same time.



// * As a user, I should be able to search YouTube videos so that I can watch what I want.

searchForm.on('submit', function () {
    // store the search term
    // make a call to the API
    const term = input.value;
    $.getJSON(`/videos/${term}`)
        .done(data => {
            // generate videos in the results container of Search Page
            // or if it's the search bar on the Main Page
            // generate a drop down list
            // save data like thumbnail and id for storage. Won't be actual iFrames
            console.log('Video search: Success!');
            console.log(data);
        })
        .fail();
});


// * As a user, I should be able to get my list of videos (read) so that I can access what I want easily.

// when click on the Watchlist link in the nav
WatchList.on('click', function () {
    $.getJSON('/videos')
        .done(data => {
            // get list of videos from database
            // generate a bunch of iframe players in the video containe
        })
        .fail();
});



// * As a user, I should be able to add a video to my watch list (create) so that I can access them later.

addToWatchList.on('click', function () {
    // get the videoID and create <iframe> YouTube player after the API code downloads.
    const videoID = 'rj7xMBxd5iY';

      // persist video list
      // not sure what to save
      // and other data, like thumbnails and description

      $.post(`/videos/${videoID}`)
        .done(data => {
            console.log(data);
        })
        .fail();

      // place this video inside the video watch list container

});

// * As a user, I should be able to pick a video to watch from my list of videos.

function onYouTubeIframeAPIReady() {
    console.log("2. createIFrame ran!");
    player = new YT.Player("player", {
      videoId: `${videoID}`,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }


// * As a user, I should be able to delete a video from my watch list (delete) so that I can keep my list up-to-date.
DeleteVideo.on('click', function () {
    $.ajax(`/videos/${videoID}`, {
        method: 'DELETE'
    })
        .done(response => {
            // re render the watchlist
        })
        .fail()
});




// generate videos in the results container of Search/Watchlist Page

function generateVideoImages () {
    // this will render a series of youtube video thumbnails; each are buttons to
    // make ajax call with id;
}