ymaps.ready(init);

function init() {

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
                
               // alert($(this).val());
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

    function createSubMenu (item, collection, submenu2) { //добавить list итемы для нашего List Box
        // Пункт подменю.
        placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });//добавить метки на карту. и название.
        collection.add(placemark);

        var submenuItem = $('<option value='+item.id+'>' + item.name + '</option>');
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu2); //добавить итемы к основному List box
           
    }

    menu.appendTo($('body')); //добавить list box к тегу body.
    myMap.setBounds(myMap.geoObjects.getBounds());//назначить границы карты
}