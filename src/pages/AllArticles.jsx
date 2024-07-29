import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './DataList.module.css'
import { Navigate } from 'react-router-dom'

export default function AllArticles() {
    const { data, status, error } = useSelector((state) => state.wikiPedia)

    if (data.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="relative h-screen overflow-scroll snap-y snap-proximity">
            <div className="h-100vh flex flex-col items-center justify-center bg-celadon snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-midnightgreen text-white font-bold`}
                        disabled
                    >
                        ALL ARTICLES!
                    </button>

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-seagreen`}
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.map((el, index) => (
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
            </div>
        </div>
    )
}
