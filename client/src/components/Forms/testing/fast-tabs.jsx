import { Radio } from "antd";
import React from "react";

export const FastTabs = ({ goTo }) => {
    const tabs = [
        { name: 'testing' },
        { name: 'hot-line' },
        { name: 'groups', disabled: true }
    ]

    return (
        <Radio.Group onChange={goTo} style={{ justifyContent: "center", display: "flex", margin: "0 0 10px" }}>
            {tabs.map(tab => <Radio.Button disabled={tab.disabled}
                                           value={tab.name}>{tab.name.toUpperCase()}</Radio.Button>)}
        </Radio.Group>
    )
}
