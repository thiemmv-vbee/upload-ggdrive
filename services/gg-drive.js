const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
});

const uploadFile = async (name, type) => {
    try {
        const createFile = await drive.files.create({
            resource: {
                name: name,
            },
            media: {
                mimeType: type,
                body: fs.createReadStream(path.join(__dirname, '/../public/uploads', name))
            },
        });

        fs.unlink(path.join(__dirname, '/../public/uploads', name), (error) => { if (error) {
            throw error;
        }});
    } catch (error) {
        console.log(error);
    }
}

// const deleteFile = async () => {
//     try {
//         const deleteFile = await drive.files.delete({
//             fileId: "1kqgwtZcFenW84htq6sP-pyupwp3HtdSHb6fbHC5NI44"
//         });

//         console.log(deleteFile.data, deleteFile.status);
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {
    uploadFile,
    // deleteFile
};