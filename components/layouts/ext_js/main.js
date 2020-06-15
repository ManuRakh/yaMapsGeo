ymaps.ready(get_coords);



function get_coords()
{
    var settings = {
        "url": "http://localhost:3000/api/1.0/get_coords",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer 82wwsniolndcw78bpx6v927ccb8da28pdn2badpl",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({"x":"53.924757","y":"27.522683","name":"улица Сапёров"}),
      };
      
      $.ajax(settings).done(function (response) {
        init(response)
      });
}

function init(coords) {
    let groups = coords
    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [53.896468, 27.546445],
            zoom: 16 //приближение  : район от 15 до 9
        }, {
            searchControlProvider: 'yandex#search' //яндекс поиск по карте
        }),
        // Контейнер для меню.
        menu = $('<div class="menu"></div>'); //создание контейнера для карты
    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]); 
    }
    show_coords(myMap)
    function createMenuGroup (group) {
        // Пункт меню.
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
        // Контейнер для подменю.
            submenu2 = $('<select ></select>');//создание List Box
            menu.append(submenu2);
        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
      
        submenu2.click();
            submenu2.bind('click',function()
            {
                for (var j = 0, m = group.items.length; j < m; j++) { //в случае изменения клика по метке изменить центр карты и клик по метке.
                        placemark = new ymaps.Placemark(group.items[j].center, { balloonContent: group.items[j].name });//добавить метки на карту. и название.
                        collection.add(placemark);

                        if($(this).val()==group.items[j].id)
                            { 
                                myMap.setCenter(group.items[j].center);//изменяет центр 
                                if (!placemark.balloon.isOpen()) { 
                                    placemark.balloon.open();
                                }
                                myMap.setCenter([53.896468, 27.546445]);
                                myMap.setZoom(19); //максимальное увеличение обзора местности
                            }

                    }
                });
            
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu2);
        }
    }
    function show_coords (map){
        map.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');
                myMap.balloon.open(coords, {
                    contentHeader:'',
                    contentBody:'<p>Вы щелкнули на точку.</p>' +
                        '<br/> Если вы считаете что это автомойка, пожалуйста подтвердите действие и метка появится тут для всех пользователей!'+
                        '<p>Добавить координату на карту: '
                        +'<br/> <input id = "x_coord" value = ' + coords[0].toPrecision(6) +' readonly>'
                        +'<br/> <input id = "y_coord" value = ' + coords[1].toPrecision(6) +' readonly>'

                        +'<br/> Укажите пожалуйста название Автомойки, или адресс!'+
                        '<br/> <input id = "name_address" placeholder = "Улица Маяковского дом 3" size = "50" required>'+
                        "<p> Добавьте описание, можно подробное "+
                        '<br/> <textarea id = "big_text"> </textarea>' 
                        ,
                    contentFooter:'<sup> <button onclick = "add_coords()">Подтвердить добавление</button></sup>'
                });
            }
            else {
                map.balloon.close();
            }
        });
    }
    
    function createSubMenu (item, collection, submenu2) { //добавить list итемы для нашего List Box
        // Пункт подменю.
        let balloonContent = { 
        
            balloonContent:  "<p>" + item.name + "</p>"
            +'<br/> <input id = "x_coord_del" value = ' + item.x_coord +' readonly>'
            +'<br/> <input id = "y_coord_del" value = ' + item.y_coord +' readonly>'
            +"<br/> " + item.description 
            +"<br/> <button onclick = 'delete_coords()'> Удалить Метку!</button>"
            }
        placemark = new ymaps.Placemark(item.center, balloonContent);//добавить метки на карту. и название.
        collection.add(placemark);

        var submenuItem = $('<option value='+item.id+'>' + item.name + '</option>');
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu2); //добавить итемы к основному List box     
    }

    menu.appendTo($('body')); //добавить list box к тегу body.
    myMap.setBounds(myMap.geoObjects.getBounds());//назначить границы карты
}