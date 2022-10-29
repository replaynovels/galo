import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdHelp } from "react-icons/md";

interface IProps {
    id: string;
    text: string;
}

const HelperText = (props: IProps) => {
    return (
        <OverlayTrigger
            overlay={<Tooltip>{props.text}</Tooltip>}
            placement="right"
        >
            <div id={`helpBtn-${props.id}`} className="osInputHelperIcon">
                <MdHelp size={20} />
            </div>
        </OverlayTrigger>
    );
};

export default HelperText;
