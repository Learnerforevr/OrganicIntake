import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Fruits",
    slug: "fruits",
    description: "Colorful picks for everyday snacking.",
    image: "/images/categories/fruits.webp",
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    description: "Everyday greens and cooking essentials.",
    image: "/images/categories/vegetables.webp",
  },
  {
    name: "Grains & Pulses",
    slug: "grains-pulses",
    description: "Grains and pantry staples for your meals.",
    image: "/images/categories/grains-pulses.webp",
  },
  {
    name: "Pantry & Groceries",
    slug: "pantry-groceries",
    description: "Useful essentials for your kitchen.",
    image: "/images/categories/pantry-groceries.webp",
  },
];

function CategorySection() {
  return (
    <section id="categories" className="section category-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the marketplace</p>
            <h2 className="section-heading__title">
              A little something for your everyday.
            </h2>
          </div>

          <p className="section-heading__description">
            Browse our demo collection of fresh produce,
            grains, pulses and pantry groceries.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="category-card"
            >
              <div className="category-card__image-wrap">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />

                <span className="category-card__arrow">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </div>

              <div className="category-card__content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;