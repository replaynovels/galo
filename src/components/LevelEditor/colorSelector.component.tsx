import React, { memo } from 'react';
import { Handle } from 'reactflow';

const ColorSelectorNode = memo(({ data, isConnectable }: any) => {
    return (
        <>
            <Handle
                type="target"
                //@ts-ignore
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div>
                Custom Color Picker Node: <strong>{data.color}</strong>
            </div>
            <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} />
            <Handle
                type="source"
                //@ts-ignore
                position="right"
                id="a"
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                //@ts-ignore
                position="right"
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
});

export default ColorSelectorNode;