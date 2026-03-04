from django.shortcuts import render, redirect
from django.contrib import messages
import requests
from .models import Client

def landing_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')

        if name and phone:
            # Сохраняем в базу
            Client.objects.create(name=name, phone=phone)

            # Отправка в Telegram
            token = "8314435687:AAHn9rH7zlgxvGJIUoHACySJ42-_Jz9iVto"
            chat_id = "1989230518"
            text = f"🚀 Новая заявка\n👤 Имя: {name}\n📞 Телефон: {phone}"
            url = f"https://api.telegram.org/bot{token}/sendMessage"
            
            try:
                requests.post(url, data={'chat_id': chat_id, 'text': text})
            except Exception as e:
                print(f"Ошибка TG: {e}")

            # Вместо render используем redirect на ту же страницу
            # Чтобы показать сообщение об успехе, можно использовать параметры в URL
            return redirect('/?success=1')

    # Проверяем, есть ли в URL пометка об успешной отправке
    success = request.GET.get('success') == '1'
    
    return render(request, 'landing/index.html', {'success': success})