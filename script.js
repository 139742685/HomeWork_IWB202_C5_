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
        
        var nationalId = $('#national-id').val();
        var fullName = $('#full-name').val();
        var mobile = $('#mobile').val();
        var email = $('#email').val();
        var birthDate = $('#birth-date').val();
        
        if (!nationalId || nationalId.length !== 11) {
            alert('الرجاء إدخال رقم وطني صحيح (11 خانة)');
            return;
        }
        
        var provinceCode = nationalId.substring(0, 2);
        var validProvinces = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
        if (!validProvinces.includes(provinceCode)) {
            alert('كود المحافظة غير صحيح');
            return;
        }
        
        if (fullName && !/^[\u0600-\u06FF\s]+$/.test(fullName)) {
            alert('الرجاء إدخال الاسم بالأحرف العربية فقط');
            return;
        }
        
        if (mobile && !/^09[0-9]{8}$/.test(mobile)) {
            alert('رقم الموبايل يجب أن يبدأ ب09');
            return;
        }
        
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('الرجاء إدخال إيميل صحيح');
            return;
        }
        
        if (birthDate && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthDate)) {
            alert('التاريخ يجب أن يكون بالشكل yyyy-mm-dd');
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
        
        message += '\nالمجموع الفرعي: ' + totalPrice + '\n';
        message += 'الضريبة (5%): ' + tax.toFixed(2) + '\n';
        message += 'المبلغ الإجمالي: ' + finalPrice.toFixed(2);
        
        alert(message);
        
        $('#order-form-container').hide();
        $('#order-form')[0].reset();
    });
});