import { withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { NavMenu } from '../molecules/NavMenu/NavMenu';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GetContacts } from './GetContacts';

function App({ signOut, user }) {
  return (
    <div className="container-fluid">
      <NavMenu signOut={signOut} name={user.attributes.email }/>
      <Routes>

        <Route path = '/home' element = { <GetContacts user={user.attributes.email}/>}/>
        <Route path = '/*' element = { <Navigate to = '/home' /> }/>
      
      </Routes>
    </div>
  );
}

export default withAuthenticator(App);
