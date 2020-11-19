import http from "../http-common";

class UploadFilesService {
    upload(file, onUploadProgress, setFolderName) {
        let formData = new FormData();
        formData.append("file", file.file);

        http.post("/api/upload/video", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        }).then(data => {
            const fileName = data.data[0].filename.split('.')
            const originalname = data.data[0].originalname.split('.')

            setFolderName({ fileName: fileName[0], originalname: originalname[0] })
            file.onSuccess()
        })
    }

    getFiles() {
        return http.get("/api/files");
    }

    // getFileConvert(file) {
    //     return http.post("/api/file", {data: file});
    // }
}

export default new UploadFilesService();