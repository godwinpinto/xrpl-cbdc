package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type ResponseStruct struct {
	Status string `json:"status"`
}
type RequestStruct struct {
	MessageText  string `json:"message_text"`
	MobileNumber string `json:"mobile_number"`
}

func SendMessage(w http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodPost {
		http.Error(w, "Invalid HTTP method", http.StatusMethodNotAllowed)
		return
	}

	var req RequestStruct
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&req); err != nil {
		http.Error(w, "Failed to parse JSON request", http.StatusBadRequest)
		return
	}
	if strings.TrimSpace(req.MessageText) == "" {
		http.Error(w, "Invalid message text", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(req.MobileNumber) == "" {
		http.Error(w, "Invalid mobile number", http.StatusBadRequest)
		return
	}

	commands := strings.Split(strings.TrimSpace(req.MessageText), " ")

	if commands[0] != "BAL" && commands[0] != "SEND" {
		http.Error(w, "Invalid request command", http.StatusBadRequest)
		return
	}

	if commands[0] == "BAL" {
		if !isValidPin(commands[1]) {
			http.Error(w, "Invalid PIN", http.StatusBadRequest)
			return

		}
		URL_PATH := "/account/balance"

		payload := map[string]interface{}{
			"identifier": req.MobileNumber,
			"pin":        commands[1],
		}
		payloadBytes, err := json.Marshal(payload)
		if err != nil {
			fmt.Println("Error marshaling JSON:", err)
			return
		}
		response := callRpayService(payloadBytes, URL_PATH)
		fmt.Println(response)

	}

	if commands[0] == "SEND" {
		if !isValidPin(commands[3]) {
			http.Error(w, "Invalid PIN", http.StatusBadRequest)
			return
		}
		URL_PATH := "/account/transfer"

		payload := map[string]interface{}{
			"identifier":       req.MobileNumber,
			"pin":              commands[3],
			"destinationPixId": commands[2],
			"amount":           commands[1],
		}
		payloadBytes, err := json.Marshal(payload)
		if err != nil {
			fmt.Println("Error marshaling JSON:", err)
			return
		}
		response := callRpayService(payloadBytes, URL_PATH)

		fmt.Println(response)

	}

	/* 	APP_ID := os.Getenv("APP_ID")
	   	APP_KEY := os.Getenv("APP_KEY")
	   	APP_SECRET := os.Getenv("APP_SECRET")
	   	APP_CLUSTER := os.Getenv("APP_CLUSTER")

	   	pusherClient := pusher.Client{
	   		AppID:   APP_ID,
	   		Key:     APP_KEY,
	   		Secret:  APP_SECRET,
	   		Cluster: APP_CLUSTER,
	   		Secure:  true,
	   	}

	   	err := pusherClient.Trigger(req.Channel, req.Event, req.Data)
	   	if err != nil {
	   		fmt.Println(err.Error())
	   	}
	*/
	response := ResponseStruct{
		Status: "OK",
	}

	// Convert the array of structs to JSON
	data, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func isValidPin(value string) bool {

	if len(value) != 4 {
		return false
	}
	_, err := strconv.Atoi(value)
	if err != nil {
		return false
	} else {
		return true
	}
}

func callRpayService(payload []byte, URL_PATH string) string {

	RPAY_URL := os.Getenv("RPAY_URL")

	url := RPAY_URL + URL_PATH
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return ""
	}
	req.Header.Set("Content-Type", "application/json")

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making API call:", err)
		return ""
	}
	defer resp.Body.Close()

	responseBody, _ := ioutil.ReadAll(resp.Body)
	return string(responseBody)
}
