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
      description: 'Explore every recipe on the site, from quick bites to full-course meals.'
    },
    {
      title: 'breakfast', 
      icon: <Breakfast />,
      description: 'Start your day right with pancakes, eggs, and other hearty breakfast dishes.'
    },
    {
      title: 'appetizers', 
      icon: <Appetizers />,
      description: 'Small bites to kick off your meal — perfect for sharing or snacking.'
    },
    {
      title: 'entrees', 
      icon: <Entrees />,
      description: 'Main courses to satisfy every appetite, from comfort food to bold flavors.'
    },
    {
      title: 'soups', 
      icon: <Soups />,
      description: 'Warm and comforting soups for every season — creamy, brothy, and beyond.'
    },
    {
      title: 'sides', 
      icon: <Sides />,
      description: 'Support your main dish with delicious sides like fries, veggies, and grains.'
    },
    {
      title: 'sauces', 
      icon: <Sauces />,
      description: 'Elevate your dishes with homemade sauces, dressings, and marinades.'
    },
    {
      title: 'deserts', 
      icon: <Deserts />,
      description: 'Sweet endings: pies, cakes, and treats to satisfy your sugar cravings.'
    },
    {
      title: 'drinks', 
      icon: <Drinks />,
      description: 'Refreshing drinks and cocktails to pair with any meal or enjoy on their own.'
    },
  ]
  

  const paths = categories.map((cat) => {
    return {
      params: {
        category: cat.title,
      },
    };
  });

  return { categories, paths };
}