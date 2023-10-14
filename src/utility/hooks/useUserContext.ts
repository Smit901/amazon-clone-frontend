import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserContext = () => {
	return useContext(AuthContext);
}

export default useUserContext;