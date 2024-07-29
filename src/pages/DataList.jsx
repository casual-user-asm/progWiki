import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './DataList.module.css'
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { useEffect } from 'react'

export default function DataList() {
    const { data, status, error } = useSelector((state) => state.wikiPedia)
    const { bookData, bookStatus, bookError } = useSelector(
        (state) => state.wikiBooks
    )
    const { versityData, versityStatus, versityError } = useSelector(
        (state) => state.wikiVersity
    )

    useEffect(() => {
        document.title = "Search's data"
    }, [])

    if (status === 'loading') {
        return <Loader />
    }

    if (status === 'failed') {
        return <Error />
    }

    if (data.length === 0) {
        return <Error />
    }

    return (
        <div className="relative h-screen overflow-scroll snap-y snap-proximity">
            <div className="h-screen flex flex-col items-center justify-center bg-celadon snap-start">
                <div className="relative m-16">
                    {data.length > 9 ? (
                        <Link to="/articles">
                            <button
                                className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-midnightgreen text-white font-bold`}
                            >
                                ARTICLES!
                            </button>
                        </Link>
                    ) : (
                        <>
                            <button
                                className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-midnightgreen text-white font-bold`}
                                disabled
                            >
                                ARTICLES!
                            </button>
                        </>
                    )}

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-seagreen`}
                    >
                        {data.length > 9 ? (
                            <h1 className="text-xl text-white font-bold">
                                👆 View more articles
                            </h1>
                        ) : (
                            ''
                        )}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.slice(0, 9).map((el, index) => (
                                <a
                                    key={index}
                                    href={`https://en.wikipedia.org/wiki/${el.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 text-black border-l-8 border-green-500 rounded-md px-3 py-2 flex flex-col"
                                >
                                    <div
                                        className={`text-lg font-serif font-bold mb-2 ${styles.truncate}`}
                                    >
                                        {el.title}
                                    </div>
                                    <div className="text-gray-500 font-thin text-sm">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: el.snippet + '...',
                                            }}
                                        ></span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <Link
                            class="absolute bottom-2 right-4 inline-flex items-center justify-center rounded-xl bg-midnightgreen py-2 px-3 font-dm text-sm font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                            to="/"
                        >
                            Back to search
                        </Link>
                    </div>
                </div>
                <p className="text-center text-black p-4 mt-4 font-bold text-lg">
                    Scroll Down To See Books 👇
                </p>
            </div>
            <div className="h-100vh flex flex-col items-center justify-center bg-teagreen text-white snap-start">
                <div className="relative m-16">
                    {bookData.length > 9 ? (
                        <Link to="/books">
                            <button
                                className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-parchment text-midnightgreen font-bold`}
                            >
                                BOOKS!
                            </button>
                        </Link>
                    ) : (
                        <button
                            className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-parchment text-midnightgreen font-bold`}
                            disabled
                        >
                            BOOKS!
                        </button>
                    )}

                    <div
                        className={`${styles.parchment_border} p-8 md:p-10 border border-black bg-midnightgreen`}
                    >
                        {bookData.length === 0 ? (
                            <h1 className="text-6xl">
                                No books about this theme 🌜
                            </h1>
                        ) : (
                            <>
                                {bookData.length > 9 ? (
                                    <p className="text-lg mt-3 text-white font-bold">
                                        👆 View more Books
                                    </p>
                                ) : (
                                    ''
                                )}

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {bookData.slice(0, 9).map((el, index) => (
                                        <div
                                            className="flex flex-col w-50 h-25"
                                            key={index}
                                        >
                                            <div className="relative cursor-pointer dark:text-white">
                                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg dark:bg-gray-200"></span>
                                                <a
                                                    href={`https://en.wikibooks.org/wiki/${el.title}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <div className="relative p-6 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                                                        <div className="flex items-center">
                                                            <h3
                                                                className={`my-2 text-lg font-bold text-gray-800 dark:text-white ${styles.truncate}`}
                                                            >
                                                                {el.title}
                                                            </h3>
                                                        </div>
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    el.snippet +
                                                                    '...',
                                                            }}
                                                            className="text-gray-600 dark:text-gray-300"
                                                        ></p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    className="absolute bottom-2 right-4 inline-flex items-center justify-center rounded-xl bg-parchment py-2 px-3 font-dm text-sm font-medium text-midnightgreen transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                                    to="/"
                                >
                                    Back to search
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <p className="text-center text-black p-4 mt-4 font-bold text-lg">
                    Scroll Down To See Courses 👇
                </p>
            </div>
            <div className="h-screen flex flex-col items-center justify-center bg-seagreen text-white snap-start">
                <div className="relative m-16">
                    {versityData.length > 9 ? (
                        <Link to="/courses">
                            <button
                                className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-celadon text-midnightgreen font-bold`}
                            >
                                COURSES!
                            </button>
                        </Link>
                    ) : (
                        <button
                            className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-celadon text-midnightgreen font-bold`}
                            disabled
                        >
                            COURSES!
                        </button>
                    )}

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-teagreen`}
                    >
                        {versityData.length === 0 ? (
                            <h1 className="text-6xl text-midnightgreen">
                                No courses about this theme 😌
                            </h1>
                        ) : (
                            <>
                                {versityData.length > 9 ? (
                                    <p className="text-lg mt-3 text-black font-bold">
                                        👆 View more Courses
                                    </p>
                                ) : (
                                    ''
                                )}

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {versityData
                                        .slice(0, 9)
                                        .map((el, index) => {
                                            return (
                                                <div class="p-2 w-full">
                                                    <a
                                                        href={`https://en.wikiversity.org/wiki/${el.title}`}
                                                        target="_blank"
                                                    >
                                                        <div class="bg-midnightgreen rounded flex p-4 h-[90px] items-center">
                                                            <svg
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="3"
                                                                class="text-parchment w-6 h-6 flex-shrink-0 mr-4"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                                                <path d="M22 4L12 14.01l-3-3"></path>
                                                            </svg>
                                                            <span
                                                                class={`font-bold text-xl ${styles.truncate}`}
                                                            >
                                                                {el.title}
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                </div>
                                <Link
                                    class="absolute bottom-2 right-4 inline-flex items-center justify-center rounded-xl bg-celadon py-2 px-3 font-dm text-sm font-medium text-black transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                                    to="/"
                                >
                                    Back to search
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
