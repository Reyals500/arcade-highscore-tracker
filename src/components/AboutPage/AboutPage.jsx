import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>How It Works:</h3>
        <ol type='1'>
          <li>User Registration: New users can sign up for an account, providing a username and password.</li>
          <li>Game Selection: Users can browse the list of available arcade games and choose which ones they want to compete in.</li>
          <li>Score Submission: After playing a game, users can submit their high score along with the date and time it was achieved.</li>
          <li>Leaderboards: The app displays leaderboards for each game, showing the top scores and the usernames of the players who achieved them.</li>
          <li>User Profiles: Users can view their own scores and track their progress over time through their user profile.</li>
        </ol>
        <h3>Future Enhancements:</h3>
        <ol type='1'>
          <li>Social Aspect: In future iterations I would add in a chat feature so that people can talk to other users and compare scores.</li>
          <li>Expanded Game Library: Continually add games to the ever expansive app, to keep users engaged.</li>
          <li>Image Uploads: Have the ability for any user to add images to thier score post to add a sense of honesty with their score.</li>
        </ol>
        <h3>Technologies Used:</h3>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>React/Redux</li>
          <li>Saga</li>
          <li>Material UI</li>
          <li>Material Joy UI</li>
          <li>Sweet Alerts</li>
          <li>Luxon</li>
          <li>Chart.js</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
