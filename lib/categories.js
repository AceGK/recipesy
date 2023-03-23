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
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'breakfast', 
      icon: <Breakfast />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'appetizers', 
      icon: <Appetizers />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'entrees', 
      icon: <Entrees />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'soups', 
      icon: <Soups />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'sides', 
      icon: <Sides />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error.'
    },
    {
      title: 'sauces', 
      icon: <Sauces />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'deserts', 
      icon: <Deserts />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
    },
    {
      title: 'drinks', 
      icon: <Drinks />,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error, libero est odio dolores doloribus quis omnis iusto porro quisquam!'
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