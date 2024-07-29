import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './DataList.module.css'
import { Navigate } from 'react-router-dom'

export default function AllBooks() {
    const { bookData, bookStatus, bookError } = useSelector(
        (state) => state.wikiBooks
    )

    if (bookData.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="relative h-screen overflow-scroll snap-y snap-proximity">
            <div className="h-100vh flex flex-col items-center justify-center bg-teagreen text-white snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-parchment text-midnightgreen font-bold`}
                        disabled
                    >
                        ALL BOOKS!
                    </button>

                    <div
                        className={`${styles.parchment_border} p-8 md:p-10 border border-black bg-midnightgreen`}
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookData.map((el, index) => {
                                return (
                                    <div className="flex flex-col w-50 h-25">
                                        <div className="relative cursor-pointer dark:text-white">
                                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg dark:bg-gray-200"></span>
                                            <a
                                                key={index}
                                                href={`https://en.wikibooks.org/wiki/${el.title}`}
                                                target="_blank"
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
                                )
                            })}
                        </div>
                        <Link
                            class="absolute bottom-2 right-4 inline-flex items-center justify-center rounded-xl bg-parchment py-2 px-3 font-dm text-sm font-medium text-midnightgreen transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                            to="/"
                        >
                            Back to search
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
