import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import type { IApolloResult } from '@/utils/commonInterfaces';
import { sendMessageAPI } from '@/utils/sendMessageAPI';

export const useUserStore = defineStore('userStore', () => {

  const senderMessage = ref({
    message:"",
    from:""
  });

  const senderAccountInfo = ref({
    mobile_number: "9999999999",
    xrpl_acccount_no: "rpTcQAvKAZmrU6bwf1FP2rMLKqziRcRPU6",
    pix_id: "9999999999@yobank.in"
  })

  const receiverAccountInfo = ref({
    mobile_number: "8888888888",
    xrpl_acccount_no: "rDKH6NniQpqoAJNBh4bTf7y9rXigwkyZHa",
    pix_id: "8888888888@yobank.in"
  })

  const sendMessage = async (message: string, mobile_number: string) => {
    senderMessage.value={message,from:"U"};
    try {
      const response = await sendMessageAPI(message, mobile_number);
      senderMessage.value={
       message:response,
       from:"S" 
      }
    } catch (error: any) {
      console.error('Error sending event:', error);
      senderMessage.value = error.message || "Unknown error occured"
    }

  }


  return { senderAccountInfo, receiverAccountInfo, sendMessage, senderMessage }
})

