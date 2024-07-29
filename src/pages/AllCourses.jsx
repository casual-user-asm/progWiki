import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './DataList.module.css'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function AllBooks() {
    const { versityData, versityStatus, versityError } = useSelector(
        (state) => state.wikiVersity
    )

    useEffect(() => {
        document.title = 'All Courses'
    }, [])

    if (versityData.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="relative h-screen overflow-scroll snap-y snap-proximity">
            <div className="h-100vh flex flex-col items-center justify-center bg-seagreen text-white snap-start">
                <div className="relative m-16">
                    <button
                        className={`absolute text-xl py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black ${styles.black_border} bg-celadon text-midnightgreen font-bold`}
                        disabled
                    >
                        ALL COURSES!
                    </button>

                    <div
                        className={`${styles.midnight_border} p-8 border border-black bg-teagreen`}
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {versityData.map((el, index) => {
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
                    </div>
                    <Link
                        class="absolute bottom-2 right-4 inline-flex items-center justify-center rounded-xl bg-celadon py-2 px-3 font-dm text-sm font-medium text-black transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                        to="/"
                    >
                        Back to search
                    </Link>
                </div>
            </div>
        </div>
    )
}
