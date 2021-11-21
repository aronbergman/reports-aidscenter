import { Radio } from "antd";
import React from "react";

export const FastTabs = ({ goTo }) => {
    const tabs = [
        { name: 'testing', label: "Тестирование" },
        { name: 'hotline', label: "Горячая линия" },
        { name: 'groups-hiv', label: "Группа ВИЧ+" },
        { name: 'drugs', label: "Аптечка" },
    ]

    return (
        <Radio.Group onChange={goTo} style={
            { justifyContent: "center", display: "flex", margin: "0 0 10px", flexWrap: "wrap" }
        }>
            {tabs.map(tab => <Radio.Button disabled={tab.disabled} style={{whiteSpace:"nowrap", textOverflow: "ellipsis", margin: 7}}
                                           value={tab.name}>{tab.label}</Radio.Button>)}
        </Radio.Group>
    )
}
