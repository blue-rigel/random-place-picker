import { PrismaClient } from "@prisma/client";
import { ulid } from "ulidx";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  const planData = [
    "Team Bonding Lunch - Sept 2023",
    "Dev Event Dinner - Dec 2023",
    "Some Tech Event - Dec 2023",
  ];

  const planIds: string[] = [];

  for (const plan of planData) {
    // CreateMany is not supported on SQLite
    await prisma.plan
      .create({
        data: {
          id: ulid(),
          title: plan,
        },
        select: {
          id: true,
        },
      })
      .then((plan) => {
        planIds.push(plan.id);
      });
  }

  const restaurantData = [
    {
      place: "Lau Pa Sat",
      desc: "Historic hawker center offering a wide range of local Singaporean and international cuisine.",
    },
    {
      place: "Newton Food Centre",
      desc: "Famous hawker center known for its seafood dishes and local street food.",
    },
    {
      place: "Chinatown Food Street",
      desc: "A vibrant street filled with stalls offering Chinese and Singaporean delicacies.",
    },
    {
      place: "Maxwell Food Centre",
      desc: "Renowned hawker center serving a variety of local dishes like Hainanese chicken rice.",
    },
    {
      place: "Hawker Chan",
      desc: "Michelin-starred hawker stall famous for its soy sauce chicken rice.",
    },
    {
      place: "Jumbo Seafood",
      desc: "Well-known for its chili crab and other Singaporean seafood dishes.",
    },
    {
      place: "Tim Ho Wan",
      desc: "Famous for its dim sum, including delicious barbecue pork buns.",
    },
    {
      place: "The Song of India",
      desc: "Award-winning Indian restaurant offering a range of authentic dishes.",
    },
    {
      place: "Makansutra Gluttons Bay",
      desc: "Hawker center offering a mix of local and international street food.",
    },
    {
      place: "Restaurant André",
      desc: "Fine dining establishment known for its inventive French cuisine.",
    },
    {
      place: "Odette",
      desc: "Luxurious French restaurant with three Michelin stars.",
    },
    {
      place: "Burnt Ends",
      desc: "Modern Australian barbecue restaurant with a focus on wood-fired cooking.",
    },
    {
      place: "National Kitchen by Violet Oon",
      desc: "Peranakan cuisine restaurant located within the National Gallery Singapore.",
    },
    {
      place: "Gunther's",
      desc: "Elegant French restaurant offering a gourmet dining experience.",
    },
    {
      place: "Wild Rocket",
      desc: "Contemporary Singaporean restaurant known for its innovative dishes.",
    },
    {
      place: "Crystal Jade Palace",
      desc: "Well-regarded Chinese restaurant serving dim sum and Cantonese cuisine.",
    },
    {
      place: "Whitegrass",
      desc: "Modern Australian restaurant offering a tasting menu of creative dishes.",
    },
    {
      place: "Jān",
      desc: "Nordic-Asian fusion restaurant helmed by Chef Janice Wong.",
    },
    {
      place: "Corner House",
      desc: "Gastronomic French cuisine restaurant located in a colonial-era house.",
    },
    {
      place: "The Black Swan",
      desc: "Art deco-style restaurant known for its classic European dishes.",
    },
    {
      place: "Din Tai Fung",
      desc: "International chain famous for its steamed dumplings and Taiwanese cuisine.",
    },
    {
      place: "Labyrinth",
      desc: "Modern Singaporean restaurant offering inventive dishes inspired by local flavors.",
    },
    {
      place: "Waku Ghin",
      desc: "Japanese-European fusion restaurant by Chef Tetsuya Wakuda.",
    },
    {
      place: "Les Amis",
      desc: "Michelin-starred French restaurant known for its elegant fine dining.",
    },
    {
      place: "The White Rabbit",
      desc: "Classic European restaurant set in a restored chapel.",
    },
    {
      place: "Shinji by Kanesaka",
      desc: "Renowned sushi restaurant offering an authentic omakase experience.",
    },
    {
      place: "Candlenut",
      desc: "Peranakan restaurant known for its flavorful and traditional dishes.",
    },
    {
      place: "Shisen Hanten",
      desc: "Szechuan restaurant with a Michelin star, famous for its spicy dishes.",
    },
    {
      place: "Sky on 57",
      desc: "Restaurant by Chef Justin Quek offering modern Asian cuisine with a view.",
    },
  ];

  for (const planId of planIds) {
    for (let i = 0; i < getRandomInt(3, 15); i++) {
      const { place, desc } =
        restaurantData[getRandomInt(0, restaurantData.length - 1)];
      await prisma.submission.create({
        data: {
          name: faker.person.fullName(),
          place,
          desc,
          planId: planId,
        },
      });
    }
  }

  console.log("DB seeded");
}

const getRandomInt = (minNum: number, maxNum: number) => {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
