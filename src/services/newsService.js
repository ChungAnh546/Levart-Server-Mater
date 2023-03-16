import db from '../models/index';

let createNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            await db.News.create({
                title: data.title,
                description: data.description,
                contents: data.contents,

                state: data.state,
                postDate: data.postDate,
                imgUML: data.imgUML,
                creatorId: data.creatorId,

            })
            resolve({
                errCode: 0,
                errMessage: '',
                message: 'OK',

            })


        } catch (error) {
            reject(error)
        }
    })
}
let updateNewsData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let news = await db.News.findOne({
                where: { id: data.id }, raw: false
            })
            if (news) {
                news.title = data.title;
                news.description = data.description;
                news.contents = data.contents;
                news.state = data.state;
                news.imgUML = data.imgUML;
                news.creatorId = data.creatorId;
                await news.save();
                resolve({
                    errCode: 0,
                    Message: 'Update the news succeeds!'
                })


            } else {
                resolve({
                    errCode: 2,
                    Message: `news's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllNews = (newsId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let News = '';
            if (newsId === 'ALL') {
                News = await db.News.findAll();
            }
            if (newsId && newsId !== 'ALL') {
                News = await db.News.findOne({
                    where: { id: newsId }
                })
            }
            resolve(News)
        } catch (error) {
            reject(error)
        }
    })
}
let deleteNews = (newsId) => {
    return new Promise(async (resolve, reject) => {
        let news = await db.News.findOne({
            where: { id: newsId }
        })
        if (!news) {
            resolve({
                errCode: 2,
                errMessage: `The news isn't exist`
            })

        }
        await db.News.destroy({
            where: { id: newsId }
        })
        resolve({
            errCode: 0,
            message: `The news is deleted`
        })

    })
}
module.exports = {
    createNews: createNews,
    updateNewsData: updateNewsData,
    getAllNews: getAllNews,
    deleteNews: deleteNews
}