import { useCallback, useEffect, useState } from "react"


async function sentHttp (url, confg) {  
   const response = await fetch(url, confg)

   const resData = await response.json()

   if(!response.ok) {
    throw new Error(resData.message || 'Something is wrong, faild to sent request')
   }

   return resData
}

export default function useHttp (url, confg, initialData) {
   const[error, setError] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const [data, setData] = useState(initialData)

   function clearData () {
        setData(initialData)
   }


const sendRequest = useCallback( async function sendRequest (data) {
    setIsLoading(true)
   try{
    
    const resData = await sentHttp(url, {...confg, body: data})
    setData(resData)
   }catch(error) {
    setError(error.message || "Something went wrong")
   
   }
   setIsLoading(false)
  },[url, confg])

  useEffect(() => {
    if((confg && (confg.method === 'GET' || !confg.method)) || !confg){
        sendRequest()   
    }
  }, [sendRequest, confg])
return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
}

}



