/**
 * Created by Administrator on 2016/6/20 0020.
 */
map(113.312213, 23.147267)
function map(lng,lat) {
    var map = new BMap.Map("map");
    var point = new BMap.Point(lng,lat);
    var  mapStyle ={
        features: ["road", "building","water","land"],//隐藏地图上的poi
        style : "googlelite"  //设置地图风格为高端黑
    }
    map.setMapStyle(mapStyle);
    map.centerAndZoom(point, 13);
    map.enableScrollWheelZoom(true);
    // 编写自定义函数,创建标注
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        //marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    }

    // 随机向地图添加25个标注
    var markerArr = [
        {txt: "安康中心医院", lng: '113.264531', lat: '23.157003'},
        {txt: "广州市第六人民医院", lng: '113.312213', lat: '23.147267'}
    ]
    for (var i = 0; i < markerArr.length; i++) {
        var lng = markerArr[i].lng, lat = markerArr[i].lat
        var point = new BMap.Point(lng, lat);
        addMarker(point);
    }

}