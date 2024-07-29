import { Link } from 'react-router-dom'

export default function Error() {
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
