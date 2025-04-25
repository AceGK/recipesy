import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebase';
import { getCategories } from '../lib/categories';

export default function SubmitRecipePage() {
  const router = useRouter();
  const { categories } = getCategories();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categories: [],
    description: '',
    ingredients: [''],
    instructions: [''],
  });

  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value);
      return { ...prev, categories: newCategories };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateListField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addListField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to submit a recipe.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, 'users', user.uid, 'recipes'), {
        ...formData,
        author: user.displayName || user.uid,
        createdAt: new Date().toISOString(),
      });

      router.push('/recipes');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to submit recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Submit a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          required
        />

        <fieldset>
          <legend>Categories (select all that apply)</legend>
          {categories
            .filter((cat) => cat.title !== 'all')
            .map((cat) => (
              <label key={cat.title}>
                <input
                  type="checkbox"
                  value={cat.title}
                  checked={formData.categories.includes(cat.title)}
                  onChange={handleCheckboxChange}
                />
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </label>
            ))}
        </fieldset>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Ingredients</label>
        {formData.ingredients.map((ing, i) => (
          <div key={i}>
            <input
              type="text"
              value={ing}
              onChange={(e) => updateListField('ingredients', i, e.target.value)}
              required
            />
            {formData.ingredients.length > 1 && (
              <button type="button" onClick={() => removeListField('ingredients', i)}>
                ❌
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addListField('ingredients')}>
          ➕ Add Ingredient
        </button>

        <label>Instructions</label>
        {formData.instructions.map((step, i) => (
          <div key={i}>
            <input
              type="text"
              value={step}
              onChange={(e) => updateListField('instructions', i, e.target.value)}
              required
            />
            {formData.instructions.length > 1 && (
              <button type="button" onClick={() => removeListField('instructions', i)}>
                ❌
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addListField('instructions')}>
          ➕ Add Step
        </button>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Recipe'}
        </button>
      </form>
    </div>
  );
}
