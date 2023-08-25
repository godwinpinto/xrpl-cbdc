import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { fetchData } from '@/service/appServices'

export interface UserInfo {
    username: string
    userId: string
    email: string
    profileImage: string
}
const stepIndicator = ref(0);
const registrationInput = ref({
    "account_no": "",
    "origin_id": "",
    "origin_add_details": {
        "type": "W",
        "os": "A"
    },
    "contact_id": "",
    "contact_type": "WEB",
    "subscription_details": ["PAYMENT"],
    "msg_meta_info": {
        "sound": true,
        "lang": "en"
    }
})


export const useUserStore = defineStore('userStore', () => {
    const userInfo = ref<UserInfo>({
        username: '',
        userId: '',
        email: '',
        profileImage: ''
    })

    const setUserDetails = (userInfoVal: UserInfo) => {
        userInfo.value = userInfoVal
    }

    const signInWithGoogle = () => {
        try {
            Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
        } catch (error) {
            console.log("Failed to authenticate", error)
        }
    }

    async function asyncSetUser() {
        try {
            const user: any = await Auth.currentAuthenticatedUser()
            if (user && user.attributes) {
                registrationInput.value.origin_id = user.attributes.email;
                registrationInput.value.contact_id = user.attributes.email;
                const registeredStatus = await fetchData(user.attributes.email);
                userInfo.value.email = user.attributes.email;
                if (registeredStatus) {
                    stepIndicator.value = 4
                } else {
                    stepIndicator.value = 1
                }
            } else {
                stepIndicator.value = 0
            }
        } catch (error) {
            console.log("Something went wrong in authentication", error)
        }
    }


    const signOut = () => {
        try {
            Auth.signOut();
            userInfo.value = {
                username: '',
                userId: '',
                email: '',
                profileImage: ''
            }
            stepIndicator.value = 0;
        } catch (error) {
            console.log("Something went wrong in signout", error);
        }
    }

    return { userInfo, setUserDetails, signInWithGoogle, asyncSetUser, signOut, stepIndicator, registrationInput }
})