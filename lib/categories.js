import All from '../public/icons/food/fork-knife.svg'
import Breakfast from '../public/icons/food/pancakes.svg'
import Entrees from '../public/icons/food/burger.svg'
import Appetizers from '../public/icons/food/kebab.svg'
import Soups from '../public/icons/food/soup.svg'
import Sides from '../public/icons/food/fries.svg'
import Sauces from '../public/icons/food/bottle.svg'
import Deserts from '../public/icons/food/pie.svg'
import Drinks from '../public/icons/food/martini-citrus.svg'

export function getCategories() {
  const categories = [
    {
      title: 'all',
      icon: <All />,
      src: '/icons/food/fork-knife.svg',
      description: 'Explore every recipe on the site, from quick bites to full-course meals.',
    },
    {
      title: 'breakfast',
      icon: <Breakfast />,
      src: '/icons/food/pancakes.svg',
      description: 'Start your day right with pancakes, eggs, and other hearty breakfast dishes.',
    },
    {
      title: 'appetizers',
      icon: <Appetizers />,
      src: '/icons/food/kebab.svg',
      description: 'Small bites to kick off your meal — perfect for sharing or snacking.',
    },
    {
      title: 'entrees',
      icon: <Entrees />,
      src: '/icons/food/burger.svg',
      description: 'Main courses to satisfy every appetite, from comfort food to bold flavors.',
    },
    {
      title: 'soups',
      icon: <Soups />,
      src: '/icons/food/soup.svg',
      description: 'Warm and comforting soups for every season — creamy, brothy, and beyond.',
    },
    {
      title: 'sides',
      icon: <Sides />,
      src: '/icons/food/fries.svg',
      description: 'Support your main dish with delicious sides like fries, veggies, and grains.',
    },
    {
      title: 'sauces',
      icon: <Sauces />,
      src: '/icons/food/bottle.svg',
      description: 'Elevate your dishes with homemade sauces, dressings, and marinades.',
    },
    {
      title: 'deserts',
      icon: <Deserts />,
      src: '/icons/food/pie.svg',
      description: 'Sweet endings: pies, cakes, and treats to satisfy your sugar cravings.',
    },
    {
      title: 'drinks',
      icon: <Drinks />,
      src: '/icons/food/martini-citrus.svg',
      description: 'Refreshing drinks and cocktails to pair with any meal or enjoy on their own.',
    },
  ];

  const paths = categories.map((cat) => ({
    params: { category: cat.title },
  }));

  return { categories, paths };
}
