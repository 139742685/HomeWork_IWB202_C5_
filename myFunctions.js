$(document).ready(function() {

    $('.toggle-details').change(function() {
        $(this).closest('tr').next().toggleClass('show-details');
    });


    $('.continue-btn').click(function() {
        if ($('input[data-name]:checked').length === 0) {
            alert('الرجاء اختيار وجبة واحدة على الأقل');
            return;
        }
        $('#order-form-container').show();
    }); 



    $('#cancel-form').click(function() {
        $('#order-form-container').hide();
        $('#order-form')[0].reset();
    }); 


    $('#order-form').submit(function(e) {
        e.preventDefault();
        
        // Clear all previous error messages and error classes
        $('.error-message').text('');
        $('.form-group').removeClass('error');
        
        var nationalId = $('#national-id').val();
        var fullName = $('#full-name').val();
        var mobile = $('#mobile').val();
        var email = $('#email').val();
        var birthDate = $('#birth-date').val();
        var hasError = false;
        
        // التحقق من الرقم الوطني
        if (!nationalId) {
            $('#national-id-error').text('الرجاء إدخال الرقم الوطني');
            $('#national-id').closest('.form-group').addClass('error');
            hasError = true;
        } else if (nationalId.length !== 11) {
            $('#national-id-error').text('الرجاء إدخال رقم وطني صحيح (11 خانة)');
            $('#national-id').closest('.form-group').addClass('error');
            hasError = true;
        } else {
            var provinceCode = nationalId.substring(0, 2);
            var validProvinces = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
            if (!validProvinces.includes(provinceCode)) {
                $('#national-id-error').text('كود المحافظة غير صحيح');
                $('#national-id').closest('.form-group').addClass('error');
                hasError = true;
            }
        }
        
        // التحقق من جميع الحقول الإلزامية
        if (!fullName) {
            $('#full-name-error').text('الرجاء إدخال الاسم الكامل');
            $('#full-name').closest('.form-group').addClass('error');
            hasError = true;
        } else if (!/^[\u0600-\u06FF\s]+$/.test(fullName)) {
            $('#full-name-error').text('الرجاء إدخال الاسم بالأحرف العربية فقط');
            $('#full-name').closest('.form-group').addClass('error');
            hasError = true;
        }
        
        // التحقق من رقم الموبايل
        if (!mobile) {
            $('#mobile-error').text('الرجاء إدخال رقم الموبايل');
            $('#mobile').closest('.form-group').addClass('error');
            hasError = true;
        } else if (!/^09[0-9]{8}$/.test(mobile)) {
            $('#mobile-error').text('رقم الموبايل يجب أن يبدأ ب09');
            $('#mobile').closest('.form-group').addClass('error');
            hasError = true;
        }
        
        // التحقق من الإيميل
        if (!email) {
            $('#email-error').text('الرجاء إدخال الإيميل');
            $('#email').closest('.form-group').addClass('error');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#email-error').text('الرجاء إدخال إيميل صحيح');
            $('#email').closest('.form-group').addClass('error');
            hasError = true;
        }
        
        // التحقق من تاريخ الميلاد
        if (!birthDate) {
            $('#birth-date-error').text('الرجاء إدخال تاريخ الميلاد');
            $('#birth-date').closest('.form-group').addClass('error');
            hasError = true;
        } else if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthDate)) {
            $('#birth-date-error').text('التاريخ يجب أن يكون بالشكل yyyy-mm-dd');
            $('#birth-date').closest('.form-group').addClass('error');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        var selectedMeals = [];
        var totalPrice = 0;
        
        $('input[data-name]:checked').each(function() {
            var mealName = $(this).data('name');
            var mealPrice = parseFloat($(this).data('price'));
            selectedMeals.push({
                name: mealName,
                price: mealPrice
            });
            totalPrice += mealPrice;
        });
        
        var tax = totalPrice * 0.05;
        var finalPrice = totalPrice + tax;
        
        var message = 'تم إرسال الطلب بنجاح!\n\n';
        message += 'البيانات الشخصية:\n';
        message += 'الاسم: ' + (fullName || 'لم يتم الإدخال') + '\n';
        message += 'الرقم الوطني: ' + nationalId + '\n';
        if (mobile) message += 'الموبايل: ' + mobile + '\n';
        if (email) message += 'الإيميل: ' + email + '\n';
        if (birthDate) message += 'تاريخ الميلاد: ' + birthDate + '\n';
        
        message += '\nالوجبات المختارة:\n';
        selectedMeals.forEach(function(meal) {
            message += '- ' + meal.name + ': ' + meal.price + '\n';
        });
        
        message += '\nالمجموع: ' + totalPrice + '\n';
        message += 'الضريبة (5%): ' + tax.toFixed(2) + '\n';
        message += 'المبلغ الإجمالي: ' + finalPrice.toFixed(2);
        
        alert(message);
        
        $('#order-form-container').hide();
        $('#order-form')[0].reset();
    });
});
