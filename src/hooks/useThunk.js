import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';


function useThunk(thunk){
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(null)
    const [error, setIsError] = useState(null)
    
  
    const doThunk = useCallback((args) => {
      setIsLoading(true)
      dispatch(thunk(args))
        .unwrap()
        .catch((err) => setIsError(err))
        .finally(() => setIsLoading(false))
    },[dispatch, thunk])
  
    return [doThunk, isLoading, error]
  }

  export { useThunk }