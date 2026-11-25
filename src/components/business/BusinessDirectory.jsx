import { useState, useMemo } from "react";
import "./BusinessDirectory.css";

const categoryLabels = {
  mechanic: "Автосервиз",
  restaurant: "Ресторант",
  salon: "Салон за красота",
  custom: "Друг бизнес"
};

function normalize(value) {
 const letters = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sht',ъ:'a',ь:'y',ю:'yu',я:'ya'};
 return value.toLowerCase().trim().replace(/[а-я]/g,c=>letters[c]||c).replace(/4/g,'ch').replace(/6/g,'sh');
}
function BusinessDirectory({
  businesses = [],
  onSelectBusiness
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  const categories = useMemo(() => {
    return [...new Set(businesses.map((b) => b.category))];
  }, [businesses]);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesName = normalize([business.name,business.description,categoryLabels[business.category],business.category].join(" ")).includes(normalize(searchTerm));

      const matchesCategory =
        selectedCategory === "all" ||
        business.category === selectedCategory;

      const location = [
        business.location?.city,
        business.location?.address,
        business.location?.country
      ].filter(Boolean).join(" ").toLowerCase();

      const matchesLocation = normalize(location).includes(normalize(locationFilter));

      return matchesName && matchesCategory && matchesLocation;
    });
  }, [businesses, searchTerm, selectedCategory, locationFilter]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setLocationFilter("");
  }

  return (
    <section className="directory-container">
      <h1>Открий своята следваща резервация</h1>

      <div className="filters-bar">
        <input
          type="text"
          className="filter-input"
          aria-label="Търсене по име"
          placeholder="Търси по име на бизнес..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          aria-label="Категория"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Всички категории</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category] || category}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="filter-input"
          aria-label="Местоположение"
          placeholder="Град или местоположение..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      <div className="directory-toolbar">
        <p>Намерени резултати: {filteredBusinesses.length}</p>

        <button
          type="button"
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Изчисти филтрите
        </button>
      </div>

      {filteredBusinesses.length === 0 ? (
        <div className="empty-state">
          <p>Няма намерени бизнеси.</p>
        </div>
      ) : (
        <div className="business-grid">
          {filteredBusinesses.map((business) => (
            <article key={business.id} className="business-card">
              <div>
                <span className="business-category">
                  {categoryLabels[business.category] ||
                    business.category}
                </span>

                <h3 className="business-name">
                  {business.name}
                </h3>

                <p className="business-location">
                  📍 {[
                    business.location?.city,
                    business.location?.address
                  ].filter(Boolean).join(", ")}
                </p>

                <p className="business-description">
                  {business.description}
                </p>
              </div>

              <button
                type="button"
                className="select-btn"
                onClick={() => onSelectBusiness?.(business.id)}
              >
                Виж свободни часове
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default BusinessDirectory;
