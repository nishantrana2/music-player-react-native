/*
id => id of the music track
name => name of the music track
performer => name of the performer or band who performed the music track
path => path where the music track is stored locally
icon => image icon of the music track
favorite => whether the music track is marked as favorite or not
*/

const tracks = [
  {
    id: "1",
    name: "Barbara Allen",
    performer: "Frank Luther",
    path: require("../assets/tracks/Barbara_Allen_by_Frank_Luther.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "2",
    name: "Dinah Polka",
    performer: "Charles P. Lowe",
    path: require("../assets/tracks/Dinah_Polka_by_Charles_P_Lowe.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "3",
    name: "El Choclo Tango",
    performer: "National Promenade Band",
    path: require("../assets/tracks/El_Choclo_Tango_by_National_Promenade_Band.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "4",
    name: "Opera Reel with Calls",
    performer: "Jep Bisbee",
    path: require("../assets/tracks/Opera_Reel_with_Calls_by_Jep_Bisbee.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "5",
    name: "Lonesome Road Blues",
    performer: "Blue Ridge Duo",
    path: require("../assets/tracks/Lonesome_Road_Blues_by_Blue_Ridge_Duo.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "6",
    name: "New York Blues",
    performer: "Pietro Frosini",
    path: require("../assets/tracks/New_York_Blues_by_Pietro_Frosini.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "7",
    name: "Saxema",
    performer: "Rudy Wiedoeft",
    path: require("../assets/tracks/Saxema_by_Rudy_Wiedoeft.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "8",
    name: "Sensation Jazz: One-Step",
    performer: "All Star Trio",
    path: require("../assets/tracks/Sensation_Jazz_One_Step_by_All_Star_Trio.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "9",
    name: "The Pattison Waltz",
    performer: "Effie Stewart",
    path: require("../assets/tracks/The_Pattison_Waltz_by_Effie_Stewart.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
  {
    id: "10",
    name: "Arbucklenian Polka",
    performer: "Bohumir Kryl",
    path: require("../assets/tracks/Arbucklenian_Polka_by_Bohumir_Kryl.mp3"),
    icon: require("../assets/music.png"),
    favorite: false,
  },
];

export { tracks };
