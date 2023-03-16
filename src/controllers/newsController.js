import newsService from '../services/newsService';

let handleCreateNews = async (req, res) => {
    let message = await newsService.createNews(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditNews = async (req, res) => {
    let data = req.body;
    let message = await newsService.updateNewsData(data);
    return res.status(200).json(message)
}
let handleGetAllNews = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',
                news: news
            }
        )
    }

    let news = await newsService.getAllNews(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            news: news
        }
    )

}
let handleDeleteNews = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await newsService.deleteNews(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateNews: handleCreateNews,
    handleEditNews: handleEditNews,
    handleGetAllNews: handleGetAllNews,
    handleDeleteNews: handleDeleteNews
}