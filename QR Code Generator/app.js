const inputField = document.getElementById('inputText');
const qrCode = document.getElementById('qr_code_image');
const downloadBtn = document.getElementById('downloadBtn');

inputField.addEventListener('blur', () =>{
  fetch('http://api.qrserver.com/v1/create-qr-code/?data='+ inputField.value + '&bgcolor=255-255-255&color=1F3251').then(response =>{
    return response.blob();
  }).then(blob =>{
    qrCode.src =  URL.createObjectURL(blob);
    downloadBtn.href = qrCode.src;
  }).catch(error =>{
    console.log(error);
  })
})