import { BACKEND_URL, service } from "@/constant";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Profile {
    refreshToken: string,
    userId: string,
    provider: service,
    accessToken: string,
    name: string,
    picture: string,
    oauthId: string
}

export interface IUser {
    id: string,
    spotify: Profile,
    google: Profile,
    spotifyConnected: boolean,
    googleConnected: boolean,
};

const useMe = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${BACKEND_URL}/api/me`, {
                    withCredentials: true,
                });
                console.log(response);
                if (response.status !== 200) {
                    router.push('/login');
                }
                setUserData(response.data);
            } catch (err) {
                console.log("error: ", err);
                setError('Failed to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { user: userData, isLoading, error };
};

export default useMe;
