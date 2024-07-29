import styles from './Home.module.css'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWikiPediaData } from '../redux/slices/wikiPediaSlice'
import { fetchWikiBooksData } from '../redux/slices/wikiBooksSlice'
import { fetchWikiVersityData } from '../redux/slices/wikiVersitySlice'

export default function Home() {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const BALL_NUM = 6
    const R = 2
    const alpha_f = 0.03
    const link_line_width = 0.3
    const dis_limit = 1000
    const [pointerValue, setPointerValue] = useState('none')

    const words = [
        'Python 🚌',
        'JavaScript 😴',
        'Java 🛣️',
        'Ruby 🙂',
        'C++ 🐃',
        'HTML 🌔',
        'CSS 🙃',
        'SQL 🦇',
        'React 🌗',
        'Node.js 🛵',
        'TypeScript 🐦',
        'Swift 🚛',
        'Go 🌷',
        'Kotlin 💧',
        'PHP 🦝',
        'Angular 🐴',
        'Django 🌷',
        'Flask 🚊',
        'Rails 🍧',
        'Spring 😥',
        'Docker 🍝',
        'Booleancowboy 🥺',
        'FizzBuzz ☃️',
        'CodeMonkeys 🍇',
        'SpaghettiCode 🕊️',
        'RubberDuckDebugging 🎂',
        'ForkBomb 🦃',
        'MagicNumber 🐎',
        'ZombieCode 🤨',
        'WTFPL 🐬',
        'CodeNinja 😚',
        'N00b 🦡',
        'FooBar 🦌',
        'Grok 🥦',
        'MemeProgrammer 🌱',
        'L33tSpeak 🛵',
        'BitTwiddling 🐱',
    ]

    const ball_color = {
        r: 243,
        g: 233,
        b: 210,
    }

    let balls = []

    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(fetchWikiPediaData(`${query} programming`))
        dispatch(fetchWikiBooksData(query))
        dispatch(fetchWikiVersityData(query))
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctxRef.current = ctx

        const can_w = window.innerWidth
        const can_h = window.innerHeight
        canvas.width = can_w
        canvas.height = can_h

        const getRandomSpeed = () => {
            const min = -1
            const max = 1
            return {
                vx: Math.random() * (max - min) + min,
                vy: Math.random() * (max - min) + min,
            }
        }

        const randomNumFrom = (min, max) => {
            return Math.random() * (max - min) + min
        }

        const getRandomBall = () => {
            return {
                x: randomNumFrom(0, can_w),
                y: randomNumFrom(0, can_h),
                ...getRandomSpeed(),
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10),
                type: Math.random() > 0.5 ? 'word' : 'dot',
                text: words[Math.floor(Math.random() * words.length)],
                stopMoving: false,
            }
        }

        const renderBalls = () => {
            const ctx = ctxRef.current
            balls.forEach((b) => {
                if (b.type === 'word') {
                    ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},1)`
                    ctx.font = '26px Alegreya Sans'
                    ctx.fillText(b.text, b.x, b.y)
                } else if (b.type === 'dot') {
                    ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`
                    ctx.beginPath()
                    ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true)
                    ctx.closePath()
                    ctx.fill()
                }
            })
        }

        const updateBalls = () => {
            const new_balls = []
            balls.forEach((b) => {
                if (!b.stopMoving) {
                    b.x += b.vx
                    b.y += b.vy

                    if (
                        b.x > can_w + R ||
                        b.x < -R ||
                        b.y > can_h + R ||
                        b.y < -R
                    ) {
                        if (b.type === 'dot') {
                            Object.assign(b, getRandomBall())
                        }
                    }

                    b.phase += alpha_f
                    b.alpha = Math.abs(Math.cos(b.phase))
                }
                new_balls.push(b)
            })

            balls = new_balls.slice(0)
        }

        const renderLines = () => {
            const ctx = ctxRef.current
            let fraction, alpha
            for (let i = 0; i < balls.length; i++) {
                for (let j = i + 1; j < balls.length; j++) {
                    fraction = getDisOf(balls[i], balls[j]) / dis_limit

                    if (fraction < 1) {
                        alpha = (1 - fraction).toString()

                        ctx.strokeStyle = `rgba(243,233,210,${alpha})`
                        ctx.lineWidth = link_line_width

                        ctx.beginPath()
                        ctx.moveTo(balls[i].x, balls[i].y)
                        ctx.lineTo(balls[j].x, balls[j].y)
                        ctx.stroke()
                        ctx.closePath()
                    }
                }
            }
        }

        const getDisOf = (b1, b2) => {
            const delta_x = Math.abs(b1.x - b2.x)
            const delta_y = Math.abs(b1.y - b2.y)

            return Math.sqrt(delta_x * delta_x + delta_y * delta_y)
        }

        const addBallIfy = () => {
            if (balls.length < BALL_NUM) {
                balls.push(getRandomBall())
            }
        }

        const render = () => {
            const ctx = ctxRef.current
            const can_w = canvas.width
            const can_h = canvas.height

            ctx.clearRect(0, 0, can_w, can_h)

            renderBalls()
            renderLines()
            updateBalls()
            addBallIfy()

            window.requestAnimationFrame(render)
        }

        const initBalls = () => {
            for (let i = 0; i < BALL_NUM; i++) {
                balls.push(getRandomBall())
            }
        }

        const initCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleResize = () => {
            initCanvas()
        }

        const handleMouseMove = (e) => {
            const mousePos = {
                x: e.clientX,
                y: e.clientY,
            }
            let cursorChanged = false

            balls.forEach((b) => {
                if (b.type === 'word') {
                    const wordWidth = ctxRef.current.measureText(b.text).width
                    const wordHeight = 36

                    if (
                        mousePos.x >= b.x &&
                        mousePos.x <= b.x + wordWidth &&
                        mousePos.y >= b.y - wordHeight &&
                        mousePos.y <= b.y
                    ) {
                        b.stopMoving = true
                        cursorChanged = true
                    } else {
                        b.stopMoving = false
                    }
                }
            })

            if (cursorChanged) {
                document.body.style.cursor = 'pointer'
            } else {
                document.body.style.cursor = 'default'
            }
        }

        const handleClick = (e) => {
            const mousePos = {
                x: e.clientX,
                y: e.clientY,
            }
            balls.forEach((b) => {
                if (b.type === 'word') {
                    const wordWidth = ctxRef.current.measureText(b.text).width
                    const wordHeight = 36

                    if (
                        mousePos.x >= b.x &&
                        mousePos.x <= b.x + wordWidth &&
                        mousePos.y >= b.y - wordHeight &&
                        mousePos.y <= b.y
                    ) {
                        window.open(b.url, '_blank')
                    }
                }
            })
        }

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('click', handleClick)

        initCanvas()
        initBalls()
        window.requestAnimationFrame(render)

        const spawnInterval = setInterval(() => {
            balls.push(getRandomBall())
        }, 2000)

        return () => {
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('click', handleClick)
            clearInterval(spawnInterval)
        }
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <canvas
                    ref={canvasRef}
                    id="particle-effect"
                    className="absolute top-0 left-0 w-full h-full"
                ></canvas>

                {/* Overlay content */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                    <div className="bg-teagreen p-2 rounded shadow-lg w-[600px] h-[370px]">
                        <h1 className="text-[55px] text-midnightgreen m-3 text-center">
                            Hey, bug buster! 🐨
                        </h1>
                        <p className=" text-[25px] text-midnightgreen mb-8 text-center">
                            Want to access tech knowledge or just explore coding
                            curiosities? <br />
                            Everything you need is right here! 🏎️
                        </p>

                        <link
                            rel="stylesheet"
                            href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
                        />
                        <div className="max-w-2xl mx-auto">
                            <form>
                                <label
                                    htmlFor="default-search"
                                    className="mb-2 text-sm text-orange sr-only dark:text-gray-300"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3">
                                        <svg
                                            className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value)
                                        }}
                                        id="default-search"
                                        className="block p-6 pl-10 w-full text-xl text-navy rounded-lg border border-navy focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search Python, Javascript..."
                                        required
                                    />
                                    <Link to="content">
                                        <button
                                            type="submit"
                                            className="text-white absolute right-2.5 bottom-4 bg-blue-800 hover:bg-blue-400 rounded-lg text-sm px-5 py-3"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                    </Link>
                                </div>
                            </form>
                            <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
