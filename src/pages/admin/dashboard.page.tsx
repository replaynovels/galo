import React from 'react';
import { ROUTE_CLASS } from '../../contants/commonClasses';
import LevelEditor from './levelEditor.page';

const AdminDashboard = () => {
    return(
        <div className={ROUTE_CLASS}>
            <h1>Example Flowspace</h1>
            <LevelEditor />
        </div>
    )
}

export default AdminDashboard;