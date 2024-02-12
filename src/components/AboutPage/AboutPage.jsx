import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>Technologies Used:</h3>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>React/Redux</li>
          <li>Saga</li>
          <li>Material UI</li>
          <li>Material Joy UI</li>
          <li>Sweet Alerts</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
