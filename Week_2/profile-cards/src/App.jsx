import ProfileCard from "./ProfileCard";
import Card from "./Card";

let heroes = [
  {
    photo: ["../pics/midoriya.jpg", 250, 400],
    name: "Izuku Midoriya",
    age: 24,
    gender: "Male",
    height: 166,
    quote:
      "You'll be fine. After all, didn't you make an effort to reach out with a helping hand just now? You can be a hero. Do your best, kid!",
  },
  {
    photo: ["../pics/bakugo.jpg", 250, 500],
    name: "Katsuki Bakugo",
    age: 25,
    gender: "Male",
    height: 172,
    quote:
      "You wanna talk about some big disparity? Lack of understanding? Dread? Guess what- I've long since taken all that crap to heart. And I've seen a real step toward progress, with all that. It might take some time, but some people I know are trying to push forward. Thanks anyway, but you can shove your sermon... ya nutsack-faced handy-man!",
  },
  {
    photo: ["../pics/todoroki.jpg", 150, 500],
    name: "Shoto Todoroki",
    age: 24,
    gender: "Male",
    height: 176,
    quote:
      "You're not wrong about me... I took the long way around... and was full of doubt all the while... A half-baked dummy. That's me. Here I thought you were only focusing on dad! But no - you were nice enough to take a close look at me too. Glad to know it.",
  },
  {
    photo: ["../pics/yaoyorozu.jpg", 250, 600],
    name: "Momo Yaoyorozu",
    age: 24,
    gender: "Female",
    height: 173,
    quote:
      "In all our lessons, we were never taught... to turn our backs to the enemy. I... will stand and fight! You all... prepare to engage the enemy!",
  },
  {
    photo: ["../pics/uraraka.jpg", 200, 500],
    name: "Ochaco Uraraka",
    age: 24,
    gender: "Female",
    height: 156,
    quote:
      "My family... was poor. And my folks were always looking kinda gloomy. I set out to become a hero to make their lives easier and cheer 'em up!! But as I grew up... I learned that the world's full of other people! Not just my parents and our home! And then I fell in love with Izuku Midoriya... And now I'm trying to stop you!! That's who I am! That's why... I'm here right now! So tell me... what's on your mind! Your thoughts and feelings! All of it!",
  },
  {
    photo: ["../pics/tenya.jpg", 200, 500],
    name: "Tenya Ida",
    age: 24,
    gender: "Male",
    height: 179,
    quote:
      "Ingenium the Hero... will dash across the land to take a lost child by the hand. Because giving help that's not asked for... is what makes a true hero.",
  },
  {
    photo: ["../pics/kirishima.jpg", 250, 500],
    name: "Eijiro Kirishima",
    age: 24,
    gender: "Male",
    height: 170,
    quote:
      "I've confronted plenty of scary stuff so far. But there's one thing that scares me more than anything... And that's going back to how I used to be! That's why I never wanna regret anything ever again!",
  },
];

export default function App() {
  // Method 1: Using separate variable and map
  // let heroCards = heroes.map((hero) => (
  //   <Card>
  //     <ProfileCard {...hero}></ProfileCard>
  //   </Card>
  // ));

  // Method 2: Using separate variable and for loop
  // let heroCards = [];
  // for (let hero of heroes) {
  //   heroCards.push(
  //     <Card>
  //       <ProfileCard {...hero}></ProfileCard>
  //     </Card>,
  //   );
  // }

  return (
    <>
      <title>My Hero Academia!</title>
      <h1>My Hero Academia Hero Profile Cards!</h1>
      <p>
        Sources were retrieved from{" "}
        <a href="https://myheroacademia.fandom.com/wiki/List_of_Characters">
          here
        </a>
        .
      </p>
      {/* Method 3: Using inline jsx and map */}
      {heroes.map((hero) => (
        <Card>
          <ProfileCard {...hero}></ProfileCard>
        </Card>
      ))}
    </>
  );
}
