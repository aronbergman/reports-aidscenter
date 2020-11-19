import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './style.css'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file, videoFolder) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    // file.name = videoFolder + (file.type === 'image/jpeg') ? '.jpeg' : '.png'

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export class PreviewImageForMetadata extends React.Component {
    state = {
        loading: false,
    };

    changeNameFile = (file, videoFolder) => {
        const oldName = file.name.split('.')
        console.log(oldName)
        return new File([file], videoFolder + '.' + oldName[1], {
            type: file.type,
            lastModified: file.lastModified,
        });
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
            );
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
        );
        return (
            <Upload
                name="preview"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:5001/api/upload/preview"
                beforeUpload={beforeUpload}
                transformFile={e => this.changeNameFile(e, this.props.folderName)}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="preview" style={{ width: '100%' }}/> : uploadButton}
            </Upload>
        );
    }
}