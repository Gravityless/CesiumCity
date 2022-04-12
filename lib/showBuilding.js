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
    const selected = {
    feature: undefined,
    originalColor: new Cesium.Color(),
    };

    // An entity object which will hold info about the currently selected feature for infobox display
    const selectedEntity = new Cesium.Entity();

    // Get default left click handler for when a feature is not picked on left click
    const clickHandler = viewer.screenSpaceEventHandler.getInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
    );

    const silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
    silhouetteBlue.uniforms.length = 0.01;
    silhouetteBlue.selected = [];

    const silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteGreen.uniforms.color = Cesium.Color.LIME;
    silhouetteGreen.uniforms.length = 0.01;
    silhouetteGreen.selected = [];

    viewer.scene.postProcessStages.add(
        Cesium.PostProcessStageLibrary.createSilhouetteStage([
        silhouetteBlue,
        silhouetteGreen,
        ])
    );

    // Silhouette a feature blue on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
        movement
    ) {
        // If a feature was previously highlighted, undo the highlight
        silhouetteBlue.selected = [];

        // Pick a new feature
        const pickedFeature = viewer.scene.pick(movement.endPosition);
        if (!Cesium.defined(pickedFeature)) {
        nameOverlay.style.display = "none";
        return;
        }

        // A feature was picked, so show it's overlay content
        nameOverlay.style.display = "block";
        nameOverlay.style.bottom = `${
        viewer.canvas.clientHeight - movement.endPosition.y
        }px`;
        nameOverlay.style.left = `${movement.endPosition.x}px`;
        //const name = pickedFeature.getProperty("BIN");
        nameOverlay.textContent = "test";

        // Highlight the feature if it's not already selected.
        if (pickedFeature !== selected.feature) {
        silhouetteBlue.selected = [pickedFeature];
        }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Silhouette a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
        movement
    ) {
        // If a feature was previously selected, undo the highlight
        silhouetteGreen.selected = [];

        // Pick a new feature
        const pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) {
        clickHandler(movement);
        return;
        }

        // Select the feature if it's not already selected
        if (silhouetteGreen.selected[0] === pickedFeature) {
        return;
        }

        // Save the selected feature's original color
        const highlightedFeature = silhouetteBlue.selected[0];
        if (pickedFeature === highlightedFeature) {
        silhouetteBlue.selected = [];
        }

        // Highlight newly selected feature
        silhouetteGreen.selected = [pickedFeature];

        // Set feature infobox description
        //const featureName = pickedFeature.getProperty("name");
        //selectedEntity.name = featureName;
        selectedEntity.description =
        'Loading <div class="cesium-infoBox-loading"></div>';
        viewer.selectedEntity = selectedEntity;
        /*selectedEntity.description =
        `${
            '<table class="cesium-infoBox-defaultTable"><tbody>' +
            "<tr><th>BIN</th><td>"
        }${pickedFeature.getProperty("BIN")}</td></tr>` +
        `<tr><th>DOITT ID</th><td>${pickedFeature.getProperty(
            "DOITT_ID"
        )}</td></tr>` +
        `<tr><th>SOURCE ID</th><td>${pickedFeature.getProperty(
            "SOURCE_ID"
        )}</td></tr>` +
        `</tbody></table>`;*/
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
}