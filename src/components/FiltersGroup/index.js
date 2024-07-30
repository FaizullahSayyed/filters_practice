import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    updateCategory,
    activeCategory,
    ratingsList,
    updateRating,
    searchText,
    updateSearchText,
    clearFilter,
    fetchSearchResult,
  } = props

  //   const onClickCategory = event => {
  //     console.log(event.target.value)
  //     updateCategory(event.target.value)
  //   }

  //   const onClickRating = event => {
  //     console.log(event.target.value)
  //     updateRating(event.target.value)
  //   }

  const onChangeSearchInput = event => updateSearchText(event.target.value)

  const onEnterEvent = event => {
    if (event.key === 'Enter') {
      fetchSearchResult()
    }
  }

  const onClickClearFilter = () => clearFilter()

  return (
    <div className="filters-group-container">
      <div className="search-box-container">
        <input
          type="search"
          className="search-box"
          placeholder="search"
          value={searchText}
          onChange={onChangeSearchInput}
          onKeyPress={onEnterEvent}
        />
      </div>
      <ul className="category-container">
        <h1 className="category-heading">Category</h1>
        {categoryOptions.map(eachCategory => (
          <li className="category-list-item" key={eachCategory.categoryId}>
            <button
              type="button"
              className={`category-button ${
                eachCategory.categoryId === activeCategory && 'active-category'
              }`}
              //   onClick={onClickCategory}
              onClick={() => updateCategory(eachCategory.categoryId)}
              value={eachCategory.categoryId}
            >
              <p>{eachCategory.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <ul className="filter-group-rating-container">
        <h1 className="rating-heading">Rating</h1>
        {ratingsList.map(eachItem => (
          <li className="rating-list-item" key={eachItem.ratingId}>
            <button
              className="rating-button"
              value={' '}
              type="button"
              //   onClick={onClickRating}
              onClick={() => updateRating(eachItem.ratingId)}
            >
              <img
                src={eachItem.imageUrl}
                className="rating-image"
                alt={`rating ${eachItem.ratingId}`}
              />
              & up
            </button>
          </li>
        ))}
      </ul>
      <div className="clear-filter-button-container">
        <button
          type="button"
          className="clear-filter-button"
          onClick={onClickClearFilter}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
