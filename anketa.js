let surname, name, midName,
    age, gender, retire;

do {
    surname = prompt('Введите Вашу фамилию', '');
    name = prompt('Введите Ваше имя', '');
    midName = prompt('Введите Ваше отчество', '');
    age = prompt('Сколько Вам (полных) лет?', 0);
    gender = confirm('Ваш пол - мужской?') ? 'мужской' : 'женский';
    retire = gender == 'мужской' ? 
                         age < 63 ? "нет" : 'да' :
                          age < 58 ? "нет" : 'да';
    
}
while (surname == '' || !isNaN(surname) || surname == null || 
       name == '' || !isNaN(name) || name == null ||
       midName == '' || !isNaN(name) || name == null ||
       age == '' || isNaN(age) || age < 0 || age == null);

alert(`ваше ФИО: ${surname} ${name} ${midName}
ваш возраст в годах: ${age}
ваш возраст в днях: ${age * 365}
через 5 лет вам будет: ${+age + 5}
ваш пол: ${gender}
вы на пенсии: ${retire}`);


