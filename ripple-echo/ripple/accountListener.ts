import xrpl, { AccountInfoRequest, Client, Wallet, xrpToDrops } from "xrpl";
import { XRPL_NETWORK } from '../utils/constants'
import WebSocket  from 'ws'

export const startListeningAccounts = async () => {
    console.log(XRPL_NETWORK);
    //    const test_wallet = xrpl.Wallet.fromSeed(familySeed)
    const socket = new WebSocket('wss://s.altnet.rippletest.net:51233')

    socket.addEventListener('message', (event) => {
        console.log('Got message from server:', event.data)
    })
    socket.addEventListener('close', (event) => {
        // Use this event to detect when you have become disconnected
        // and respond appropriately.
        console.log('Disconnected...')
    })

    let autoid_n = 0
    function api_request(options: any) {
        if (socket.readyState === 0) {
            console.error("Socket is not connected yet")
            return
        }
        if (!options.hasOwnProperty("id")) {
            options.id = "autoid_" + (autoid_n++)
        }

        let resolveHolder;
        AWAITING[options.id] = new Promise((resolve, reject) => {
            // Save the resolve func to be called by the handleResponse function later
            resolveHolder = resolve
            try {
                // Use the socket opened in the previous example...
                socket.send(JSON.stringify(options))
            } catch (error) {
                reject(error)
            }
        })
        AWAITING[options.id].resolve = resolveHolder;
        return AWAITING[options.id]
    }




    const AWAITING: any = {}
    const handleResponse = (data: any) => {
        if (!data.hasOwnProperty("id")) {
            console.error("Got response event without ID:", data)
            return
        }
        if (AWAITING.hasOwnProperty(data.id)) {
            AWAITING[data.id].resolve(data)
        } else {
            console.warn("Response to un-awaited request w/ ID " + data.id)
        }
    }



    const WS_HANDLERS: any = {
        "response": handleResponse
        // Fill this out with your handlers in the following format:
        // "type": function(event) { /* handle event of this type */ }
    }
    socket.addEventListener('message', (event:any) => {
        const parsed_data = JSON.parse(event.data)
        if (WS_HANDLERS.hasOwnProperty(parsed_data.type)) {
            // Call the mapped handler
            WS_HANDLERS[parsed_data.type](parsed_data)
        } else {
            console.log("Unhandled message from server", event)
        }
    })

    // Demonstrate api_request functionality
    async function pingpong() {
        console.log("Ping...")
        const response = await api_request({ command: "ping" })
        console.log("Pong!", response)
    }

    async function do_subscribe() {
        const sub_response = await api_request({
            command: "subscribe",
            accounts: ["rDKH6NniQpqoAJNBh4bTf7y9rXigwkyZHa"]
        })
        if (sub_response.status === "success") {
            console.log("Successfully subscribed!")
        } else {
            console.error("Error subscribing: ", sub_response)
        }
    }

    const log_tx = function (tx: any) {
        console.log(tx.transaction.TransactionType + " transaction sent by " +
            tx.transaction.Account +
            "\n  Result: " + tx.meta.TransactionResult +
            " in ledger " + tx.ledger_index +
            "\n  Validated? " + tx.validated)
    }
    WS_HANDLERS["transaction"] = log_tx

    socket.addEventListener('open', (event) => {
        // This callback runs when the connection is open
        console.log("Connected!")
        pingpong()
        do_subscribe()
    })

}
