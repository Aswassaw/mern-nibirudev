const htmlTemplateTop = `
<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="Aplikasi Sosial Media untuk Developer">
  <meta name="keywords" content="Social Media, Developer, Javascript, NodeJS, ExpressJS">
  <meta name="author" content="Andry Pebrianto">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    @import "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";

    * {
      font-family: "Open Sans", sans-serif;
      box-sizing: border-box;
    }

    .auth-title {
      text-align: center;
      color: white;
      margin: 0;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .auth-content {
      border: 2px solid #0a1d37;
      border-radius: 3px;
      line-height: 30px;
      max-width: 800px;
      margin: 0 auto;
      margin-bottom: 30px;
      padding: 25px;
    }

    .auth-token {
      background-color: #293b5f;
      text-align: center;
      border-radius: 5px;
      font-weight: bold;
      margin: 0 auto;
      padding: 5px;
      display: block;
    }
  </style>

  <title>Verify Your Account!</title>
</head>

<body style="background-color: #17a2b8; padding: 20px;">
  <h1 class="auth-title">
    NibiruDev
  </h1>

  <div class="auth-content" style="background-color: white;">
    <p style="font-size: 20px;">Halo, hai hai!</p>

    <hr>`;

const htmlTemplateBottom = `
  </div>
</body>
</html>`;

const createHtmlForEmail = (reason, token) => {
  const htmlContent = `
  <p>
    Anda menerima email ini karena Anda telah melakukan ${reason} di NibiruDev.
    <br>
    Segera verifikasi akun Anda dengan menggunakan token di bawah ini.
  </p>
  
  <p style="color: white;" class="auth-token">${token}</p>
  
  <p>
    Token tersebut akan kedaluwarsa dalam 30 menit.
    <br>
    Jika Anda tidak merasa melakukan ${reason} di NibiruDev, abaikan email ini.
  </p>
  
  <hr>
  
  <p>Copyright &copy; ${new Date().getFullYear()} NibiruDev - Developed with &hearts; by Andry Pebrianto in Trenggalek</p>`;

  return htmlTemplateTop + htmlContent + htmlTemplateBottom;
};

module.exports = createHtmlForEmail;
