import axios from 'axios'

const test = async (query) => {
    const url = `https://en.wikiversity.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=50&origin=*`

    try {
        const res = await axios.get(url)
        const wikiData = res.data.query.search

        return console.log(wikiData)
    } catch (error) {
        return console.log(error)
    }
}

test('python')
