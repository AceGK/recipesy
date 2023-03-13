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
      icon: <All />
    },
    {
      title: 'breakfast', 
      icon: <Breakfast />
    },
    {
      title: 'appetizers', 
      icon: <Appetizers />
    },
    {
      title: 'entrees', 
      icon: <Entrees />
    },
    {
      title: 'soups', 
      icon: <Soups />
    },
    {
      title: 'sides', 
      icon: <Sides />
    },
    {
      title: 'sauces', 
      icon: <Sauces />
    },
    {
      title: 'deserts', 
      icon: <Deserts />
    },
    {
      title: 'drinks', 
      icon: <Drinks />
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