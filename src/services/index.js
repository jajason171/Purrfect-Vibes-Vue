export const submitForm = () => {
  axios
    .post("https://f275-49-228-35-135.ap.ngrok.io/warranty", {
      firstName: FName.value,
      lastName: LName.value,
      email: Email.value,
      phoneNo: PhoneNum.value,
      orderId: this.$route.params.serialnumber.value,
      serialNumber: this.$route.params.serialnumber.value
    })
    .then((response) => {
      // console.log(response);
      // this.response = response.data
      this.success = "Data saved successfully"
      this.response = JSON.stringify(response, null, 2)
    })
    .catch((error) => {
      this.response = "Error: " + error.response
    })
}