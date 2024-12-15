import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:3001';

function HomePage() {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    category: '',
    price: 0
  })
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(BASE_URL + '/products?_sort=-datetime');
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
  };

  const addProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null);
    try {
      await axios.post(BASE_URL + '/products', {
        name: product.name,
        image: product.image,
        category: product.category,
        price: Number(product.price),
        datetime: new Date()
      })
      setProduct({
        name: '',
        image: '',
        category: '',
        price: 0
      })
      fetchProducts();
      toast.success('Product has been added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    } catch (err) {
      console.error(err)
      setError(err);
    } finally {
      setIsLoading(false)
    }
  }
  
  const goToDetail = (id) => {
    navigate('/edit/' + id)
  }

  const deleteProduct = async (id) => {
    setIsLoading(true)
    setError(null);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.delete(BASE_URL + '/products/' + id)
          fetchProducts()
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="col-span-1">
          <form onSubmit={(e) => addProduct(e)}>
            <div className="flex flex-col mt-3">
            </div>

          </form>
        </div>
        <div className="col-span-3 ">
          <table className="border border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">TO DO LIST</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">Fetching data...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-red-500">Error: {error.message}</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">No products found</td>
                </tr>
              ) : (
                products?.map((product) => (
                  <tr>
                    <td className="p-2 border"></td>
                    <td className='text-center p-2 border'>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default HomePage;
