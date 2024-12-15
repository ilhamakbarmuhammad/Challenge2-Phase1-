import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

function EditPage() {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    category: '',
    price: 0
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchDetail = async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/products/' + id)
      setProduct(data)
    } catch (err) {
      console.error(err)
    }
  }

  const editProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null);
    try {
      await axios.put(BASE_URL + '/products/' + id, {
        name: product.name,
        image: product.image,
        category: product.category,
        price: Number(product.price)
      })
      setProduct({
        name: '',
        image: '',
        category: '',
        price: 0
      })
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [id])

  return (
    <>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="col-span-2">
          <form onSubmit={(e) => editProduct(e)}>
            <div className="flex flex-col">
              <label>Product Name:</label>
              <input
                type="text"
                placeholder="Product name..."
                className="p-2 border rounded-md"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label>Image URL:</label>
              <input
                type="text"
                placeholder="Image URL..."
                className="p-2 border rounded-md"
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label>Category:</label>
              <select className="p-2 border rounded-md" value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                <option value="" disabled>
                  Select category
                </option>
                <option value="desk">Desk</option>
                <option value="kitchen">Kitchen</option>
                <option value="storage">Storage</option>
              </select>
            </div>
            <div className="flex flex-col mt-3">
              <label>Price:</label>
              <input
                type="text"
                placeholder="Price..."
                className="p-2 border rounded-md"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
            </div>
            <button className="mt-3 bg-sky-700 rounded-full py-2.5 px-2 w-full text-white font-bold" type="submit">
              Edit Product
            </button>
          </form>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <img width={300} src={product.image} alt="" />
        </div>
      </div>
    </>
  )
}

export default EditPage