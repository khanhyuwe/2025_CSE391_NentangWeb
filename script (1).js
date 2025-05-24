$(document).ready(function () {
    console.log("jQuery is ready!");
  
    $('#register-form').on('submit', function (e) {
      e.preventDefault();
      $('.error').text('');
      $('#message').hide();
  
      const name = $('#fullname').val().trim();
      const email = $('#email').val().trim();
      const password = $('#password').val();
      const confirmPassword = $('#confirm-password').val();
      let valid = true;
  
      if (name === '') {
        $('#error-name').text('Họ tên không được để trống.');
        valid = false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        $('#error-email').text('Email không hợp lệ.');
        valid = false;
      }
  
      if (password.length < 6) {
        $('#error-password').text('Mật khẩu phải từ 6 ký tự.');
        valid = false;
      }
  
      if (confirmPassword !== password) {
        $('#error-confirm-password').text('Mật khẩu nhập lại không khớp.');
        valid = false;
      }
  
      if (valid) {
        submitForm(name, email, password);
      }
    });
  
    function submitForm(name, email, password) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        data: {
          name: name,
          email: email,
          password: password
        },
        success: function (response) {
          $('#register-form').slideUp(500, function () {
            $('#message').text('🎉 Đăng ký thành công!').fadeIn();
            $('#toggle-details').fadeIn();
          });
          console.log("Response từ server:", response);
        },
        error: function () {
          $('#message').text('🚫 Server bận, vui lòng thử lại sau.').css('color', 'red').fadeIn();
        }
      });
    }
  
    $('#toggle-details').on('click', function () {
      $('#details').slideToggle();
    });
  });
  