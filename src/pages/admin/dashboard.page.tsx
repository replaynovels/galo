import React from 'react';
import AnimatedLineBackground from '../../components/Animated/animatedLineBg.component';
import { ROUTE_CLASS } from '../../contants/commonClasses';
import LevelEditor from './levelEditor.page';

const AdminDashboard = () => {
    return(
        <div className={ROUTE_CLASS + " " + "position-relative"}>
            <AnimatedLineBackground />
            <LevelEditor />
        </div>
    )
}

export default AdminDashboard;