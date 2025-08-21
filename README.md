🏀 Basketball Scoresheet
Welcome to the Basketball Scoresheet web app! This is a simple and mobile-friendly tool to help you track game scores and player stats in real-time.
✨ Key Features
Live Scoreboard: Displays the current scores for both teams at the top of the page.
Game Timer & Period Indicator: Keeps track of the game's duration and the current period.
Player Stat Tracker: Easily input and update points, rebounds, assists, and more for each player.
Export Stats: Save all the game data into a single file once the game is over.
Mobile-Friendly: The layout is designed to work well on both computers and mobile phones.
🚀 How to Use the App
Using the scoresheet during a game is simple:
Start the Game: The game timer begins automatically when you open the page.
Update Player Stats:
Find the player card for the person you want to update.
Click on the input box next to the stat (e.g., "Points:").
Type in the new number or use the up/down arrows to change it.
Export the Stats:
Once the game is finished, click the "Export Stats" button at the bottom of the page.
This will download a file named basketball_stats.json to your computer. You can open this file with any text editor or paste its contents into a spreadsheet program like Google Sheets or Excel to analyze the data.
🛠️ How to Customize the Website (For Admins)
This website is easy to edit, even if you don't have a lot of coding experience. All the changes can be made by editing a single file: index.html.
1. Changing Player Information
To change a player's name or photo:
Open the index.html file in a text editor (like Notepad on Windows or TextEdit on Mac).
Look for the sections that say <section class="team-container team-a-container"> and <section class="team-container team-b-container">. These are for Team A and Team B.
Inside each team's section, you'll see a block of code for each player that starts with <div class="player-card">.
To change the player's name:

<h3 class="player-name">Player A1</h3>

Simply change Player A1 to the new player's name.
​To change the player's photo:

<img src="https://via.placeholder.com/100" alt="Player 1" class="player-photo">

Change the src link to the URL of the new player's picture. A good place to get a direct link to a picture is to upload it to a photo-hosting site and copy the image address.
​2. Adding or Removing Players
​To Add a Player: Copy the entire <div class="player-card">...</div> block from an existing player and paste it right below the last player in the team. Remember to update the player's name and photo link.
​To Remove a Player: Simply delete the entire <div class="player-card">...</div> block for the player you want to remove.
​3. Customizing Stats
​The stats are defined inside the player card. Each stat is an <input> line.

<label for="points-a1">Points:</label>
<input type="number" id="points-a1" class="stat-input" data-team="team-a" data-player="A1" data-stat="points" value="0">

To change a stat name (e.g., from "Points" to "Field Goals"): just change the text inside the <label> tag.
​To add a new stat: Copy one of the existing <label>...<input> pairs and change the text and the data-stat value to the new stat you want to track (e.g., data-stat="steals").
​📁 Project Structure
​For reference, this is how the files are organized in the repository:

basketball-scoresheet/
├── index.html          # The main web page you will edit for players
├── README.md           # This guide!
├── css/
│   └── styles.css      # Controls the look and feel of the site (for advanced users)
└── js/
    └── script.js       # Handles the timer and export features (for advanced users)
