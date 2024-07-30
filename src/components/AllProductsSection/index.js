import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategory: 1,
    activeRating: 1,
    searchText: '',
    fetchFailed: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategory,
      activeRating,
      searchText,
    } = this.state

    // const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    // const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=&rating=1`
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategory}&title_search=${searchText}&rating=${activeRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({fetchFailed: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderNoProductsView = () => (
    <div className="no-products-container">
      <div className="no-products-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-image"
          alt="no products"
        />
      </div>
      <h1 className="no-products-heading">No Products Found</h1>
      <p className="no-products-paragraph">
        We could not find any products. try other filters
      </p>
    </div>
  )

  loadFailedView = () => (
    <div className="load-failed-container">
      <div className="load-failed-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          className="load-failed-image"
          alt="products failure"
        />
      </div>
      <h1 className="load-failed-heading">No Products Found</h1>
      <p className="load-failed-paragraph">
        We could not find any products. try other filters
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId, fetchFailed} = this.state

    if (fetchFailed) {
      return this.loadFailedView()
    }

    // TODO: Add No Products View
    return productsList.length > 0 ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      this.renderNoProductsView()
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  updateCategory = categoryId =>
    this.setState({activeCategory: categoryId}, this.getProducts)

  updateRating = ratingId => {
    this.setState({activeRating: ratingId}, this.getProducts)
  }

  updateSearchText = searchInput => this.setState({searchText: searchInput})

  fetchSearchResult = () => {
    this.getProducts()
  }

  clearFilter = () =>
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        activeCategory: 1,
        activeRating: 1,
        searchText: '',
        fetchFailed: false,
      },
      this.getProducts,
    )

  render() {
    const {isLoading, activeCategory, searchText} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          activeCategory={activeCategory}
          updateCategory={this.updateCategory}
          ratingsList={ratingsList}
          updateRating={this.updateRating}
          searchText={searchText}
          updateSearchText={this.updateSearchText}
          clearFilter={this.clearFilter}
          fetchSearchResult={this.fetchSearchResult}
        />
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
