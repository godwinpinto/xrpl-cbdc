import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import type { IApolloResult } from '@/utils/commonInterfaces';

export const useUserStore = defineStore('userStore', () => {

  const senderAccountInfo=ref({
    mobile_number:"9999999999",
    xrpl_acccount_no:"rpTcQAvKAZmrU6bwf1FP2rMLKqziRcRPU6",
    pix_id:"9999999999"
  })

  const receiverAccountInfo=ref({
    mobile_number:"8888888888",
    xrpl_acccount_no:"rDKH6NniQpqoAJNBh4bTf7y9rXigwkyZHa",
    pix_id:"9999999999"
  })

  const generateAccountDetails=()=>{

  }

  return { senderAccountInfo, receiverAccountInfo, generateAccountDetails }
})

