import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Upload, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PreviewImageForMetadata } from "./PreviewImageForMetadata";
import { connect } from 'react-redux'
import { createVideoThunks } from "../../redux/thunks/video.thunks";
import UploadService from "../../services/upload-files";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const VideoMetadataForm = props => {


    const [form] = Form.useForm();
    const [progress, setProgress] = useState(0)
    const [folderName, setFolderName] = useState(0)

    const onFinish = (values) => {
        values.folder = props.folderName
        props.createVideo({
            ...values,
            folder: folderName.fileName
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => onFill());
    const onFill = () => {
        form.setFieldsValue({
            title: folderName.originalname,
            folder: folderName.fileName,
            description: '',
        });
    };

    const action = e => {
        console.log('Action e', e)
        UploadService.upload(e, event => propsVideoUpload.onChange(event), setFolderName)
    }

    const propsVideoUpload = {
        progress: { strokeWidth: 2, showInfo: false, steps: 20 },
        name: 'file',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        customRequest: action,
        onChange(info) {
            const percent = ((info.loaded / info.total) * 100).toFixed(0)
            if (info.loaded || info.total) setProgress(percent)
        },
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="video"
                label="Видеофайл в формате .mp4"
            >
                <Upload {...propsVideoUpload}>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
                {progress > 0 ? <Progress percent={progress}/> : null}
            </Form.Item>
            <Form.Item
                name="folder"
                label="Папка на сервере"
             fieldContext='folder'>
                <Input/>
            </Form.Item>
            <Form.Item
                name="title"
                label="Заголовок видео"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="description"
                label="Краткое описание"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea/>
            </Form.Item>

            {!!folderName && <Form.Item label="Превью видео">
                <PreviewImageForMetadata folderName={folderName.fileName}/>
            </Form.Item>}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Сохранить видео
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Сбросить метаданные
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Заполнить из fill
                </Button>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = state => ({
    state: state
})

const mapDispatchToProps = dipatch => ({
    createVideo: data => dipatch(createVideoThunks(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoMetadataForm)