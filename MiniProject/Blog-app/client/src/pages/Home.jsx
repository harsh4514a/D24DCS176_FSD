import { useSelector } from 'react-redux';
import heroImg from '../assests/homeImg.png'
import { motion } from 'framer-motion';

import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../assests/spinner/Spinner';
import LeftSidebar from '../components/LeftSidebar';




const Home = () => {
  // const { blogs } = useSelector((state) => state.blogSliceApp.blogs);

  const [recentBlogs, setRecentBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { theme } = useSelector((state) => state.themeSliceApp);

  const [loading, setLoading] = useState(false);




  useEffect(() => {

    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const query = selectedCategory ? `/api/blog/get-all-blogs?limit=9&category=${selectedCategory}` : `/api/blog/get-all-blogs?limit=9`;
        const response = await axios.get(query);

        if (response.status === 200) {
          setRecentBlogs(response.data.blogs)
          setLoading(false)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.message);
      }
    }
    getAllBlogs();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };



  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row gap-4">
        {/* Left Sidebar */}
        <div className="lg:w-64 lg:flex-shrink-0 hidden lg:block">
          <LeftSidebar onCategorySelect={handleCategorySelect} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className='text-2xl text-center my-5'>Recent Blogs</h1>

          {
            loading ?

              <span className='flex justify-center w-full my-5'>
                <Spinner />
              </span>

              :
              <div className="flex flex-wrap px-5 w-full my-10 gap-4 justify-center">
                {
                  recentBlogs && recentBlogs.map((value, index) => {
                    return (
                      <div key={index} className={`shadow-md duration-300 border hover:scale-[99%]  transition-all w-96 rounded-tl-xl rounded-br-xl pb-5 cursor-pointer ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                        <Link to={`/blog/${value.slug}`}>
                          <img src={value.blogImgFile} className='hover:scale-[99%] duration-300  transition-all w-96 h-60 rounded-tl-xl rounded-br-xl' />

                          <div className="px-3">
                            <p className='text-lg md:text-xl'>{value.blogTitle}</p>
                            <span className='text-xs md:text-sm w-20 text-center border px-4 rounded-full'>{value.blogCategory}</span>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}
export default Home;