//获取两个经纬度之间的距离，单位为米
var getDistance=function(lon1, lat1, lon2, lat2){
    let radLat1 = lat1*Math.PI / 180.0;
    let radLat2 = lat2*Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = lon1*Math.PI / 180.0 - lon2*Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137 ;//6378.137是地球半径;
    s = Math.round(s * 10000) / 10000 * 1000;
    return s;//调用return的距离单位为m
}
var showBuilding=function(){
    /*添加建筑显示模块*/
    const nameOverlay = document.createElement("div");
    viewer.container.appendChild(nameOverlay);
    nameOverlay.className = "backdrop";
    nameOverlay.style.display = "none";
    nameOverlay.style.position = "absolute";
    nameOverlay.style.bottom = "0";
    nameOverlay.style.left = "0";
    nameOverlay.style["pointer-events"] = "none";
    nameOverlay.style.padding = "4px";
    nameOverlay.style.backgroundColor = "white";

    // Information about the currently selected feature
    // An entity object which will hold info about the currently selected feature for infobox display
    const selectedEntity = new Cesium.Entity();

    // Get default left click handler for when a feature is not picked on left click
    const clickHandler = viewer.screenSpaceEventHandler.getInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
    );

    // Silhouette a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
        movement
    ) {
        // Delete previous selection
        var deleteobj=viewer.entities.getById('test');
        viewer.entities.remove(deleteobj)
        // Pick a new feature
        var pickedFeature = viewer.scene.pickPosition(movement.position);
        if(pickedFeature) {
            var cartographic = Cesium.Cartographic.fromCartesian(pickedFeature);
            var height_picked = cartographic.height; //高度
        }
        if (!Cesium.defined(pickedFeature)) {
        clickHandler(movement);
        return;
        }
        var building_height,real_height;
        /*发送查询请求*/
        /*接受请求，返回高度，面积，经纬度，名称,假设查询结果为经度属于[118.2202-118.2211],纬度属于[25.0748-25.0753]*/
        building_pt1=[118.2202,25.0748]
        building_pt2=[118.2202,25.0753]
        building_pt3=[118.2211,25.0748]
        building_pt4=[118.2211,25.0753]
        building_center=[((+building_pt1[0])+(+building_pt2[0])+(+building_pt3[0])+(+building_pt4[0]))*0.25,((+building_pt1[1])+(+building_pt2[1])+(+building_pt3[1])+(+building_pt4[1]))*0.25]


        let cartesians = [];let start = Cesium.Cartesian3.fromDegrees(building_center[0], building_center[1], 0);cartesians.push(start);viewer.scene
                .clampToHeightMostDetailed(cartesians)
                .then(function (clampedCartesians) {
                    var cartographic = Cesium.Cartographic.fromCartesian(clampedCartesians[0]);
                    var height=cartographic.height;
                    document.getElementById("tmp").innerHTML=String(height);
                    building_height=document.getElementById("tmp").innerHTML;
                    //document.write(building_height);
                    real_height=(+building_height)-42.25;
                    viewer.entities.add({
                        id:'box',
                        position:Cesium.Cartesian3.fromDegrees(building_center[0], building_center[1], 42.25+0.5*real_height),
                        box:{
                            dimensions : new Cesium.Cartesian3(0.0009*111000, 0.0005*111000*Math.cos(23/180*3.1415926), real_height),
                            material : Cesium.Color.RED.withAlpha(0.5),
                        }
                    })

                });


        //console.log(building_height);
        /*console.log("centerheight:");console.log(center_height);
        console.log("edgeheight:");console.log(edge_height);*/

        selectedEntity.name = 'test';
        selectedEntity.description =
        'Loading <div class="cesium-infoBox-loading"></div>';
        viewer.selectedEntity = selectedEntity;
        selectedEntity.description =
        `${
            '<table class="cesium-infoBox-defaultTable"><tbody>' +
            "<tr><th>name</th><td>"
        }${/*pickedFeature.getProperty("BIN")*/"name"}</td></tr>` +
        `<tr><th>height</th><td>${/*pickedFeature.getProperty(
            "DOITT_ID"
        )*/"height"}</td></tr>` +
        `<tr><th>lon/lat</th><td>${/*pickedFeature.getProperty(
            "SOURCE_ID"
        )*/"lon/lat"}</td></tr>` + `<tr><th>area</th><td>${/*pickedFeature.getProperty(
            "SOURCE_ID"
        )*/"area"}</td></tr>`;
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
}