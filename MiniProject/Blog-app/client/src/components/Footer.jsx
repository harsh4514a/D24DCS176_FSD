import { useSelector } from 'react-redux';


const Footer = () => {


    const { theme } = useSelector((state) => state.themeSliceApp);

    return (
        <>
            <footer className={`border-t md:gap-2 py-6 text-xs md:text-base  flex md:flex-row flex-col justify-center items-center ${theme === 'dark' ? ' border-gray-700' : ' border-gray-100  '}`}>

                <p className=''>Made by <span className='text-blue-400 font-semibold'>Harsh Gondaliya & Meet Koriya</span></p>
                <p className='md:my-0 mt-2'>@2025 Copyright All rights reserved</p>

            </footer>
        </>
    )
}
export default Footer