import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { CookieName} from '../utils/UtilNames'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { dispatchProfile } from '../app/reducer'
import { Apis, GetApi } from './Apis'


const AuthRoutes = ({ children }) => {
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get(CookieName)
                if (!token) {
                    setLogin(false)
                    navigate(`/login`)
                }
                const isValidToken = isExpired(token)
                if (isValidToken) {
                    setLogin(false)
                    navigate(`/login`)
                }

                const response = await GetApi(Apis.auth.profile)
                if (response.status === 200) {
                    setLogin(true)
                    dispatch(dispatchProfile(response.data))
                }
            } catch (error) {
                return errorMessage(error.message)
            }
        }
        fetchProfile()
    }, [])
    if (login) return children
}

export default AuthRoutes