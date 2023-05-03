module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};
//chuyen file anhr thanhf base64 luu database

//static getBase64(file){
// return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = () => resolve(error);
// });
// }
//lấy dữ liệu từ dtabase lên chuyễn thành ảnh
//let imageBase64 = ''
//if(user.image)
//{imageBase64 = new Buffer(user.image,'base64').toString('binary')}
////
//
//
//
//
//