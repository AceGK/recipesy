import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";
import { getCategories } from "@/lib/categories";
import Input from "@/components/input";
import styles from "./styles.module.scss";
import { getUserByUID } from "@/lib/firebase";
import Xmark from "@/assets/icons/xmark.svg";

interface SubmitRecipeFormProps {
  title?: string;
}

interface RecipeFormData {
  title: string;
  slug: string;
  categories: string[];
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeHours: string;
  prepTimeMinutes: string;
  cookTimeHours: string;
  cookTimeMinutes: string;
  dietTags: string[];
}

export default function SubmitRecipeForm({ title }: SubmitRecipeFormProps) {
  const router = useRouter();
  const { categories } = getCategories();
  const [username, setUsername] = useState<string | null>(null);

  console.log(auth.currentUser?.uid);

  useEffect(() => {
    const loadUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getUserByUID(user.uid);
        if (userDoc?.username) setUsername(userDoc.username);
      }
    };
    loadUsername();
    // console.log(username);
  }, [username]);

  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    slug: "",
    categories: [],
    description: "",
    ingredients: [""],
    instructions: [""],
    prepTimeHours: "0",
    prepTimeMinutes: "0",
    cookTimeHours: "0",
    cookTimeMinutes: "0",
    dietTags: [],
  });

  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updated = checked
        ? [...prev.categories, value]
        : prev.categories.filter((c) => c !== value);
      return { ...prev, categories: updated };
    });
  };

  const updateListField = (
    field: "ingredients" | "instructions",
    index: number,
    value: string
  ) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addListField = (field: "ingredients" | "instructions") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeListField = (
    field: "ingredients" | "instructions",
    index: number
  ) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to submit a recipe.");
      return;
    }

    setLoading(true);

    try {
      const recipeData = {
        ...formData,
        prepTime: `${formData.prepTimeHours}h ${formData.prepTimeMinutes}m`,
        cookTime: `${formData.cookTimeHours}h ${formData.cookTimeMinutes}m`,
        author: user.displayName || user.uid,
        username: (user as any).username || user.uid,
        createdAt: new Date().toISOString(),
      };

      await addDoc(
        collection(firestore, "users", user.uid, "recipes"),
        recipeData
      );
      router.push("/recipes");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {title && <h2>{title}</h2>}

      <div className={styles.rowGrid}>
        <fieldset>
          <legend>Categories</legend>
          <div className={styles.checkboxGrid}>
            {categories
              .filter((cat) => cat.title !== "all")
              .map((cat) => (
                <label key={cat.title}>
                  <input
                    type="checkbox"
                    value={cat.title}
                    checked={formData.categories.includes(cat.title)}
                    onChange={handleCheckboxChange}
                  />
                  {cat.title}
                </label>
              ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Dietary Tags</legend>
          <div className={styles.checkboxGrid}>
            {[
              "gluten-free",
              "nut-free",
              "soy-free",
              "vegan",
              "vegetarian",
              "pescatarian",
            ].map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.dietTags.includes(tag)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setFormData((prev) => {
                      const updated = checked
                        ? [...prev.dietTags, value]
                        : prev.dietTags.filter((t) => t !== value);
                      return { ...prev, dietTags: updated };
                    });
                  }}
                />
                {tag}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <Input
        name="title"
        type="text"
        value={formData.title}
        onChange={handleTitleChange}
        placeholderText="Title"
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <div className={styles.flexSplit}>
        <fieldset>
          <legend>Prep Time</legend>
          <div className={styles.selectGroup}>
            <select
              name="prepTimeHours"
              value={formData.prepTimeHours}
              onChange={handleChange}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={i}>
                  {i}h
                </option>
              ))}
            </select>
            <select
              name="prepTimeMinutes"
              value={formData.prepTimeMinutes}
              onChange={handleChange}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((min) => (
                <option key={min} value={min}>
                  {min}m
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Cook Time</legend>
          <div className={styles.selectGroup}>
            <select
              name="cookTimeHours"
              value={formData.cookTimeHours}
              onChange={handleChange}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={i}>
                  {i}h
                </option>
              ))}
            </select>
            <select
              name="cookTimeMinutes"
              value={formData.cookTimeMinutes}
              onChange={handleChange}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((min) => (
                <option key={min} value={min}>
                  {min}m
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>

      <div className={styles.flexSplit}>
        <fieldset>
          <legend>Ingredients</legend>
          {formData.ingredients.map((ing, i) => (
            <div key={i} className={styles.dynamicField}>
              <Input
                name={`ingredient-${i}`}
                type="text"
                value={ing}
                onChange={(e) =>
                  updateListField("ingredients", i, e.target.value)
                }
                placeholderText="Ingredient"
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListField("ingredients", i)}
                >
                  <Xmark />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addListField("ingredients")}>
            + Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          {formData.instructions.map((step, i) => (
            <div key={i} className={styles.dynamicField}>
              <Input
                name={`instruction-${i}`}
                type="text"
                value={step}
                onChange={(e) =>
                  updateListField("instructions", i, e.target.value)
                }
                placeholderText={`Step ${i + 1}`}
                required
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListField("instructions", i)}
                >
                  <Xmark />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addListField("instructions")}>
            + Add Step
          </button>
        </fieldset>
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
