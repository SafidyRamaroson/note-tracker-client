import { Routes , Route,Navigate} from 'react-router-dom';
// import { Suspense } from 'react';
import DashboardPage from "./../pages/dashboardPage/Dashboard"
import NotesList from '../pages/studentsPage/NotesList';
import PageNotFound from '../pages/PageNotFound';

function AppNavigation (){
    return (
            <Routes>
                {/* <Route exact path='/' element={<Navigate to="/home" replace={true}/>}></Route> */}
                <Route path='/' exact element={<Navigate to={'/dashboard'} replace={true}/>}></Route>
                <Route path='/dashboard' element={<DashboardPage/>}></Route>
                <Route path='/students/notes' element={<NotesList/>}></Route>
                <Route path='/*' element={<PageNotFound/>}></Route>
            </Routes>
    );
};

export default AppNavigation ;