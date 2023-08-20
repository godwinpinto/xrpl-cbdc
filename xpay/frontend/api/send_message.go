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

	"github.com/tidwall/gjson"
)

type ResponseStruct struct {
	Message string `json:"message"`
}
type RequestStruct struct {
	MessageText  string `json:"message_text"`
	MobileNumber string `json:"mobile_number"`
}

func SendMessage(w http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodPost {
		writeResponse("Invalid HTTP method", w)
		return
	}

	var req RequestStruct
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&req); err != nil {
		writeResponse("Failed to parse JSON request", w)
		return
	}
	if strings.TrimSpace(req.MessageText) == "" {
		writeResponse("Invalid message text", w)
		return
	}

	if strings.TrimSpace(req.MobileNumber) == "" {
		writeResponse("Invalid mobile number", w)
		return
	}

	commands := strings.Split(strings.TrimSpace(req.MessageText), " ")

	if commands[0] != "BAL" && commands[0] != "SEND" {
		writeResponse("Invalid request command", w)
		return
	}

	if commands[0] == "BAL" {
		executeBalance(commands, w, req)
		return
	}

	if commands[0] == "SEND" {
		executeTransfer(commands, w, req)
		return
	}
}

func executeTransfer(commands []string, w http.ResponseWriter, req RequestStruct) bool {
	if !isValidPin(commands[3]) {
		writeResponse("Invalid PIN", w)
		return true
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
		writeResponse("Unkown error occured", w)
		return true
	}
	response := callRpayService(payloadBytes, URL_PATH)
	fmt.Println(response)

	status := gjson.Get(response, "response.status")
	if !status.Exists() {
		fmt.Println("Status field not found")
		return true
	}
	if status.Int() == 200 {
		transactionResult := gjson.Get(response, "response.data.result.meta.TransactionResult")
		validated := gjson.Get(response, "response.data.result.validated")
		balance := gjson.Get(response, "response.data.result.meta.AffectedNodes.1.ModifiedNode.FinalFields.Balance")
		if transactionResult.String() == "tesSUCCESS" && validated.Bool() {
			xrp, err := dropsToXRP(balance.String())
			if err != nil {
				writeResponse("Error in fetching balance after transaction. Please check your balance before executing new transaction", w)
				return true
			}
			writeResponse(fmt.Sprintf("Your transaction is successful. Your new balance is %.6f XRP\n", xrp), w)
		}
		return true
	} else {
		msg := gjson.Get(response, "response.msg")
		writeResponse("Error in fetching balance. "+msg.String(), w)
		return true
	}
}

func executeBalance(commands []string, w http.ResponseWriter, req RequestStruct) bool {
	if !isValidPin(commands[1]) {
		writeResponse("Invalid PIN", w)
		return true

	}
	URL_PATH := "/account/balance"

	payload := map[string]interface{}{
		"identifier": req.MobileNumber,
		"pin":        commands[1],
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		writeResponse("Unkown error occured", w)
		return true
	}
	response := callRpayService(payloadBytes, URL_PATH)
	fmt.Println(response)

	status := gjson.Get(response, "response.status")
	if !status.Exists() {
		fmt.Println("Status field not found")
		return true
	}
	if status.Int() == 200 {
		balance := gjson.Get(response, "response.data.result.account_data.Balance")
		xrp, err := dropsToXRP(balance.String())
		if err != nil {
			writeResponse("Error in fetching balance", w)
			return true
		}
		writeResponse(fmt.Sprintf("Your account balance is %.6f XRP\n", xrp), w)
		return true
	} else {
		msg := gjson.Get(response, "response.msg")
		writeResponse("Error in fetching balance. "+msg.String(), w)
		return true
	}
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

func writeResponse(message string, w http.ResponseWriter) {
	response := ResponseStruct{
		Message: message,
	}
	data, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func dropsToXRP(drops string) (float64, error) {
	dropsValue, err := strconv.ParseFloat(drops, 64)
	if err != nil {
		return 0, err
	}
	xrpValue := dropsValue / 1000000.0
	return xrpValue, nil
}
