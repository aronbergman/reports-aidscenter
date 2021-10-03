import React from 'react';
import { Progress, Spin, Alert  } from 'antd';

const StartReport = () => {

    return (
        <div>
            <Progress percent={30}/>
            <Progress percent={50} status="active"/>
            <Progress percent={70} status="exception"/>
            <Progress percent={100}/>
            <Progress percent={50} showInfo={false}/>

            <br/>

            <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
            <Progress type="circle" percent={100} format={() => 'Done'} />

            <br/>

            <Spin tip="Loading...">
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Spin>
        </div>
    );
};

export default StartReport;
