var makefog=function(){
        var fog_obj=new Cesium.FogEffect(viewer, {
            visibility: 0.2,
            color: new Cesium.Color(0.8, 0.8, 0.8, 0.3)
        })
        var handler = viewer.screenSpaceEventHandler
        handler.setInputAction(function(event){
            fog_obj.destroy();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        
};
var makesnow=function(){
    let snow = new Snow({
            viewer:viewer
        })
    snow.addSnow()
    var handler = viewer.screenSpaceEventHandler
        handler.setInputAction(function(event){
            snow.deleteSnow();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
};
var makerain=function(){
    let rain=new Rain({
        viewer:viewer
    })
    rain.addRain();
    var handler = viewer.screenSpaceEventHandler
        handler.setInputAction(function(event){
            rain.deleteRain();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
};
        class FogEffect {
            constructor(viewer, options) {
                if (!viewer) throw new Error('no viewer object!');
                options = options || {};
                this.visibility = Cesium.defaultValue(options.visibility, 0.1);
                this.color = Cesium.defaultValue(options.color,
                    new Cesium.Color(0.8, 0.8, 0.8, 0.5));
                this._show = Cesium.defaultValue(options.show, !0);
                this.viewer = viewer;
                this.init();
            }
        
            init() {
                this.fogStage = new Cesium.PostProcessStage({
                    name: 'czm_fog',
                    fragmentShader: this.fog(),
                    uniforms: {
                        visibility: () => {
                            return this.visibility;
                        },
                        fogColor: () => {
                            return this.color;
                        }
                    }
                });
                this.viewer.scene.postProcessStages.add(this.fogStage);
            }
        
            destroy() {
                if (!this.viewer || !this.fogStage) return;
                this.viewer.scene.postProcessStages.remove(this.fogStage);
                this.fogStage.destroy();
                delete this.visibility;
                delete this.color;
            }
        
            show(visible) {
                this._show = visible;
                this.fogState.enabled = this._show;
            }
        
            fog() {
                return "uniform sampler2D colorTexture;\n\
                 uniform sampler2D depthTexture;\n\
                 uniform float visibility;\n\
                 uniform vec4 fogColor;\n\
                 varying vec2 v_textureCoordinates; \n\
                 void main(void) \n\
                 { \n\
                    vec4 origcolor = texture2D(colorTexture, v_textureCoordinates); \n\
                    float depth = czm_readDepth(depthTexture, v_textureCoordinates); \n\
                    vec4 depthcolor = texture2D(depthTexture, v_textureCoordinates); \n\
                    float f = visibility * (depthcolor.r - 0.3) / 0.2; \n\
                    if (f < 0.0) f = 0.0; \n\
                    else if (f > 1.0) f = 1.0; \n\
                    gl_FragColor = mix(origcolor, fogColor, f); \n\
                 }\n";
            }
        }
        
        Cesium.FogEffect = FogEffect;
        class Snow {
            constructor(val) {
                this.viewer = val.viewer;
                this.snow = null;
            }
            addSnow() {
                this.snow = new Cesium.PostProcessStage({
                    name: "czm_snow",
                    fragmentShader:
                        'uniform sampler2D colorTexture;\n' +
                        'varying vec2 v_textureCoordinates;\n' +
                        'uniform float speed;\n' +
                        'float snow(vec2 uv,float scale)\n' +
                        '{\n' +
                        '    float time = czm_frameNumber * speed / 1000.0 ;\n' +
                        '    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n' +
                        '    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n' +
                        '    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n' +
                        '    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n' +
                        '    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n' +
                        '    return k*w;\n' +
                        '}\n' +
                        'void main(void){\n' +
                        '     vec2 resolution = czm_viewport.zw;\n' +
                        '     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n' +
                        '     vec3 finalColor=vec3(0);\n' +
                        '     float c = 0.0;\n' +
                        '     c+=snow(uv,30.)*.0;\n' +
                        '     c+=snow(uv,20.)*.0;\n' +
                        '     c+=snow(uv,15.)*.0;\n' +
                        '     c+=snow(uv,10.);\n' +
                        '     c+=snow(uv,8.);\n' +
                        '     c+=snow(uv,6.);\n' +
                        '     c+=snow(uv,5.);\n' +
                        '     finalColor=(vec3(c));\n' +
                        '     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5);\n' +
                        '}',
                    uniforms: {
                        speed: 20 // 下雪速度
                    }
                });
                this.viewer.scene.postProcessStages.add(this.snow);
            }
            deleteSnow(){
                if (this.snow) this.viewer.scene.postProcessStages.remove(this.snow);
            }
        }
        class Rain {
            constructor(val) {
                this.viewer = val.viewer;
                this.rain = null;
            }
            addRain() {
                this.rain = new Cesium.PostProcessStage({
                    name: "czm_rain",
                    fragmentShader:
                    "uniform sampler2D colorTexture;\n\
                        varying vec2 v_textureCoordinates;\n\
                        uniform float angle;\n\
                        uniform float size;\n\
                        uniform float speed;\n\
                        float hash(float x) {\n\
                            return fract(sin(x * 133.3) * 13.13);\n\
                        }\n\
                        void main(void) {\n\
                            float time = czm_frameNumber / speed;\n\
                            vec2 resolution = czm_viewport.zw;\n\
                            vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n\
                            vec3 c = vec3(.6, .7, .8);\n\
                            float a = angle;\n\
                            float si = sin(a), co = cos(a);\n\
                            uv *= mat2(co, -si, si, co);\n\
                            uv *= length(uv + vec2(0, 4.9)) * size + 1.;\n\
                            float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);\n\
                            float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;\n\
                            c *= v * b;\n\
                            gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), .5);\n\
                        }\n\
                        ",
                    uniforms: {
                        angle: 0.2,//角度
                        size:0.2,//雨点大小
                        speed: 120//降雨量
                    }
                });
                this.viewer.scene.postProcessStages.add(this.rain);
            }
            deleteRain(){
                if (this.rain) this.viewer.scene.postProcessStages.remove(this.rain);
            }
        }
        
        