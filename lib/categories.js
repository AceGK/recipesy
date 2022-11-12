export function getCategories() {
  const categories = [
    'all',
    'appetizers',
    'entrees',
    'soups',
    'sides',
    'sauces',
    'desserts'
  ];

  const paths = categories.map((cat) => {
    return {
      params: {
        category: cat,
      },
    };
  });

  return { categories, paths };
}