import newsService from '../services/newsService';

let handleCreateNews = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

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
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['title', 'contents']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

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