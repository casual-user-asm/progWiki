import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './DataList.module.css'

export default function DataList() {
    const { data, status, error } = useSelector((state) => state.wikiPedia)
    const { bookData, bookStatus, bookError } = useSelector(
        (state) => state.wikiBooks
    )
    const { versityData, versityStatus, versityError } = useSelector(
        (state) => state.wikiVersity
    )

    if (status === 'loading') {
        return (
            <div
                id="loading-overlay"
                class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
            >
                <svg
                    class="animate-spin h-8 w-8 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>

                <span class="text-white text-3xl font-bold">Loading...</span>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div class="border m-auto mt-60 rounded-lg shadow relative max-w-lg bg-midnightgreen p-4">
                <div class="p-6 pt-0 text-center mt-3">
                    <svg
                        class="w-20 h-20 text-parchment mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <h3 class="text-2xl text-parchment mt-5 mb-6">
                        Something wrong... <br />
                        Try another query to search
                    </h3>
                    <Link
                        to="/"
                        class="text-midnightgreen bg-parchment hover:bg-seagreen focus:ring-4 focus:ring-red-300 rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                    >
                        Go back
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-screen overflow-scroll snap-y snap-proximity">
            <div className="h-screen flex flex-col items-center justify-center bg-celadon snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-midnightgreen text-white font-bold`}
                    >
                        ARTICLES!
                    </button>

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-seagreen`}
                    >
                        <p className="text-lg mt-3 text-white font-bold">
                            👆 View more articles
                        </p>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.slice(0, 9).map((el, index) => (
                                <a
                                    key={index}
                                    href={`https://en.wikipedia.org/wiki/${el.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 text-black border-l-8 border-green-500 rounded-md px-3 py-2 flex flex-col"
                                >
                                    <div className="text-lg font-serif font-bold mb-2">
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
                    </div>
                </div>
                <p className="text-center text-black p-4 mt-4 font-bold text-lg">
                    Scroll Down To See Books 👇
                </p>
            </div>
            <div className="h-screen flex flex-col items-center justify-center bg-teagreen text-white snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-parchment text-midnightgreen font-bold`}
                    >
                        BOOKS!
                    </button>

                    <div
                        className={`${styles.parchment_border} p-8 border border-black bg-midnightgreen`}
                    >
                        <p className="text-lg mt-3 text-white font-bold">
                            👆 View more Books
                        </p>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookData.slice(0, 9).map((el, index) => {
                                return (
                                    <div className="relative flex flex-col">
                                        <div className="relative cursor-pointer dark:text-white">
                                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg dark:bg-gray-200"></span>
                                            <a
                                                key={index}
                                                href={`https://en.wikibooks.org/wiki/${el.title}`}
                                                target="_blank"
                                            >
                                                <div className="relative p-6 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                                                    <div className="flex items-center">
                                                        <h3 className="my-2 text-lg font-bold text-gray-800 dark:text-white">
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
                                )
                            })}
                        </div>
                    </div>
                </div>
                <p className="text-center text-black p-4 mt-4 font-bold text-lg">
                    Scroll Down To See Courses 👇
                </p>
            </div>
            <div className="h-screen flex flex-col items-center justify-center bg-seagreen text-white snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-celadon text-midnightgreen font-bold`}
                    >
                        COURSES!
                    </button>

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-teagreen`}
                    >
                        <p className="text-lg mt-3 text-black font-bold">
                            👆 View more Courses
                        </p>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {versityData.slice(0, 9).map((el, index) => {
                                return (
                                    <div class="p-2 w-full">
                                        <a
                                            href={`https://en.wikipedia.org/wiki/${el.title}`}
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
                                                <span class="font-bold text-xl">
                                                    {el.title}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
