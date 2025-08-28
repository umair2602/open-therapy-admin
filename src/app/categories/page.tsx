"use client";

import { useEmotionalCategories } from "@/hooks/useEmotionalCategories";

export default function CategoriesPage() {
  const { categories, isLoading, createCategory, deleteCategory } = useEmotionalCategories();

  console.log('Categories',categories);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{background: 'yellow'}}>
      <h1>Emotional Categories</h1>
      <ul>
        {categories?.map((cat) => (
          <li key={cat.id}>
            <span style={{ color: cat.color }}>{cat.name}</span>
            <button onClick={() => deleteCategory(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          createCategory({
            name: "Joy",
            color: "#FFD700",
            secondary_color: "#FFF8DC",
            emotions: [{ name: "Excited" }],
          })
        }
      >
        Add Category
      </button>
    </div>
  );
}
