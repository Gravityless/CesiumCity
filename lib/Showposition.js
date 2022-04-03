var showposition=function(){
    var handler = viewer.screenSpaceEventHandler
      //注册鼠标事件,event参数是点击的地方是在哪里
      handler.setInputAction(function (event) {
          //定义一个屏幕点击的事件，pickPosition封装的是获取点击的位置的坐标
          var position = viewer.scene.pickPosition(event.position);
          var cartographic = Cesium.Cartographic.fromCartesian(position);
          var longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
          var latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
          var height = cartographic.height; //高度
          var drawpoint = viewer.entities.add(
            {
                position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height),
                point: {
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    show: true,
                    color: Cesium.Color.SKYBLUE,
                    pixelSize: 5,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 1
                },
                label: {
                    text: "经度："+ longitude.toFixed(4) + "\n纬度："+ latitude.toFixed(4) + "\n高度："+  height.toFixed(2),
                    font: '14pt monospace',
                    color: Cesium.Color.RED,
                    backgroundColor: Cesium.Color.CORAL,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    //垂直位置
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(50, 0)
                }
            })
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function () {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
}