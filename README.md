# testTaskMetacommerce
Create excel Report,express, typescpript,googlesheets,excel
### Стек
- Язык: Typescript
- Веб-сервер: ExpresJs
- Версия NodeJS: 12 или выше

### 1.Создать с помощью nodeJS отчет в Excel-формате.
- Данные забирать из публичного API https://api.publicapis.org/entries
- Должна быть “цветная“ шапка с наименованием свойств объектов: “API”,
“Description” и т.д.
- Одна строка отчета - одна запись из ответа API
- Ссылки должны быть активными(кликабельными)
-  Строки в отчете должны быть отсортированы по первому столбцу
наименованию (“API”)
- Исключить из отчета объекты с HTTPS со значением false
-  На выходе должны получить xls-файл с отчетом

**Готовый результат можно посмотреть в корневой папке Report.xls**

### 2. Создать с помощью nodeJS аналогичный отчет в Google Sheets.
Готовый результат можно посмотреть по ссылке
**https://docs.google.com/spreadsheets/d/1SFPx-x-yaBe9s8cTVFwmo_do5qbo1TgoMNwAYfqf24w/edit#gid=133961432**
### 3.Создать аналогичный отчет в Google Sheets с помощью Google Apps Script.

Готовый результат можно посмотреть по ссылке
**https://docs.google.com/spreadsheets/d/1SFPx-x-yaBe9s8cTVFwmo_do5qbo1TgoMNwAYfqf24w/edit#gid=2023167360**

Функция Google Apps Script
```sh
function createReport() {
   
    let arr=[];
    let result=[];
//Получение данных
    const url ="https://api.publicapis.org/entries";
    const params = {'escaping': false, 'headers': {'accept': 'application/json'}}
    const response = UrlFetchApp.fetch(url, params)
    if (response.getResponseCode() == 200)
       arr=JSON.parse(response.getContentText()).entries

//Форматирование и сортировка данных 
    arr.forEach((el) => {
      if (el.HTTPS != false) result.push(el);
    });
    result.sort((a, b) =>
      a.API.toLowerCase() < b.API.toLowerCase()
        ? -1
        : b.API.toLowerCase() > a.API.toLowerCase()
        ? 1
        : 0
    );

//открытие документа
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Googlescript');
  
//Рисование шапки
  var header=sheet.getRange("A1:g1")
    .setBackground("#FF0000")
    .setValues([
         [
          'API',
          'Description',
          'Auth',
          'HTTPS',
          'Cors',
          'Link',
          'Category',
        ],
    ]);
//Вывод данных на документ
  for (i=0; i<result.length-1; i++) {	
    let arr=[];
    for (var key in result[i]) {
    if (result[i].hasOwnProperty(key)) {
      arr.push(result[i][key])
    }
      }
    for (j=1; j<8; j++) {	
      sheet.getRange(i+2,j).setValue(arr[j-1]);
  } }
}

```
