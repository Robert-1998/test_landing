from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    phone = models.CharField(max_length=10, verbose_name="Телефонный номер")
    creat_data = models.DateField(auto_now_add=True, verbose_name="Дата заявки")

    def __str__(self):
        return f"{self.name}({self.phone})"

    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"