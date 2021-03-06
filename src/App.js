import React, { Component, Fragment } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import scrollama from 'scrollama';
import { Row, Col, } from 'react-bootstrap';

const layerTypes = {



    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
}

const alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;	  
    const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";	  
    return {
      url: url + suffix
    }	 
}





class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChapter: props.chapters[0]
        };
        // this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        const config = this.props;
        const mapStart = config.chapters[0].location;

        mapboxgl.accessToken = config.accessToken;
    
       
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: config.style,
            center: mapStart.center,
            zoom: mapStart.zoom,
            fadeDuration: mapStart.duration,
            pitch: mapStart.pitch,
            bearing: mapStart.bearing,
            transformRequest: transformRequest
        });

        // const marker = new mapboxgl.Marker();
        // if (config.showMarkers) {
        //     marker.setLngLat(mapStart.center).addTo(map);
        // }

        function getLayerPaintType(layer) {
            var layerType = map.getLayer(layer).type;
            return layerTypes[layerType];
        }

        function setLayerOpacity(layer) {
            var paintProps = getLayerPaintType(layer.layer);
            paintProps.forEach(function(prop) {
                map.setPaintProperty(layer.layer, prop, layer.opacity);
            });
        }

        const setState = this.setState.bind(this);

        // instantiate the scrollama
        const scroller = scrollama();

        map.on('style.load', function () {
            map.rotateTo(45.0, {
                duration: 10000
            });
      
    })
        
        map.on('load', function () {

            

                // 2. reservechapterName

                map.loadImage("/marker.png", function(error, image) {
                    if (error) throw error;
                    map.addImage("custom-marker", image);
                    map.addSource('reserve', {
                        type: 'geojson',
                        data: 'data/reserve.geojson'
                      });
                
                    map.addLayer({ 
                        id: "reserve",
                        type: "symbol",
                        source:'reserve',
                        
                            layout: {
                                "icon-image": "custom-marker",
                                'icon-allow-overlap': true,
                                'visibility': 'none',
                            }
                            });


                          
                

                        // 3. Sea ports

                map.loadImage("/ship.png", function(error, image) {
                    if (error) throw error;
                    map.addImage("seaport-marker", image);
                    map.addSource('seaports', {
                        type: 'geojson',
                        data: 'data/seaports.geojson'
                      });
                
                    map.addLayer({ 
                        id: "seaports",
                        type: "symbol",
                        source:'seaports',
                       
                            layout: {
                                "icon-image": "seaport-marker",
                                'visibility': 'none',
                            }
                            });
                    });

                    //  4. Water Ways   
                    
                    map.addSource('waters', {
                        type: 'geojson',
                        data: 'data/waters.geojson'
                      });

                      map.addLayer({
                        "id": "waters",
                        "type": "fill",
                        "source": "waters", 
                        "transition": {
                            "duration": 300,
                            "delay": 0.2
                          },
                        "layout": {'visibility': 'none'},
                        "paint": {
                            "fill-color": "#2244bf",
                            "fill-opacity": 1,
                        }
                    });

                      map.addSource('pipelines', {
                        type: 'geojson',
                        data: 'data/pipeline.geojson'
                      });
                      map.addLayer({
                        "id": "pipelines",
                        "type": "line",
                        "source": "pipelines",
                        "layout": {'visibility' : 'none'},
                        "transition": {
                            "duration": 500,
                            "delay": 0.5
                          },
                        "paint": {
                            "line-color": "#9716ce",
                            "line-opacity": 1,
                            "line-width": 4
                        }
                    });

                    map.addSource('road-express', {
                        type: 'geojson',
                        data: 'data/roads.geojson'
                      });
                      map.addLayer({
                        "id": "road-express",
                        "type": "line",
                        "source": "road-express",
                        "layout": {'visibility' : 'none'},
                       
                        "paint": {
                            "line-color": "#1116ce",
                            "line-opacity": 1,
                            "line-width": 4
                        }
                    });



                    map.loadImage("/house.png", function(error, image) {
                        if (error) throw error;
                        map.addImage("settlement-marker", image);

                    map.addSource('settlement', {
                        type: 'geojson',
                        data: 'data/settlement.geojson'
                      });
                      
                    
                        map.addLayer({ 
                            id: "settlement",
                            type: "symbol",
                            source:'settlement',
                         
                                layout: {
                                    "icon-image": "settlement-marker",
                                    'visibility': 'none',
                                }
                                });
                        });



                        map.loadImage("/house.png", function(error, image) {
                            if (error) throw error;
                            map.addImage("pipeline-marker", image);
    
                        map.addSource('pipeline', {
                            type: 'geojson',
                            data: 'data/pipeline.geojson'
                          });
                          
                        
                            map.addLayer({ 
                                id: "pipeline",
                                type: "symbol",
                                source:'pipeline',
                               
                                    layout: {
                                        "icon-image": "pipeline-marker",
                                        'visibility': 'none',
                                    }
                                    });
                            });








                    

                            
                            // Existing Gas Plants


                map.loadImage("/marker.png", function(error, image) {
                    if (error) throw error;
                    map.addImage("gas-marker", image);
                    map.addSource('gas-existing', {
                        type: 'geojson',
                        data: 'data/existingGasPlant.geojson'
                      });
                
                    map.addLayer({ 
                        id: "gas-existing",
                        type: "symbol",
                        source:'gas-existing',
                       
                            layout: {
                                "icon-image": "gas-marker",
                                'visibility': 'none',
                            }
                            });
                    });



                    map.loadImage("/gas.png", function(error, image) {
                        if (error) throw error;
                        map.addImage("bunkering-marker", image);

                    map.addSource('bunkering', {
                        type: 'geojson',
                        data: 'data/bunkering.geojson'

                      });
                      
                    
                        map.addLayer({ 
                            id: "bunkering",
                            type: "symbol",
                            source:'bunkering',
                           
                                layout: {
                                    "icon-image": "bunkering-marker",
                                    'visibility': 'none',
                                }
                                });
                        });

                        map.loadImage("/gas.png", function(error, image) {
                            if (error) throw error;
                            map.addImage("result-marker", image);
    
                        map.addSource('result', {
                            type: 'geojson',
                            data: 'data/finally.geojson'
                          });
                          
                        
                            map.addLayer({ 
                                id: "result",
                                type: "symbol",
                                source:'result',
                             
                                    layout: {
                                        "icon-image": "result-marker",
                                        'visibility': 'none',
                                    }
                                    });
                            });


                           


            // setup the instance, pass callback functions
            scroller
            .setup({
                step: '.step',
                offset: 0.5,
                progress: true

            })
            .onStepEnter(response => {
                const chapter = config.chapters.find(chap => chap.id === response.element.id);
                setState({currentChapter:chapter});
                map.flyTo(chapter.location);
                console.log(chapter)
                // if (config.showMarkers) {
                //     marker.setLngLat(chapter.location.center);
                // }
                map.setLayoutProperty(chapter.id, 'visibility', 'visible');
                if (chapter.onChapterEnter.length > 0) {
                    chapter.onChapterEnter.forEach(setLayerOpacity);
                }
            })
            .onStepExit(response => {
                var chapter = config.chapters.find(chap => chap.id === response.element.id);
                map.setLayoutProperty(chapter.id, 'visibility', 'none');
                if (chapter.onChapterExit.length > 0) {
                    chapter.onChapterExit.forEach(setLayerOpacity);
                }
            });


                

        });

          // Add zoom and rotation controls to the map.
          map.addControl(new mapboxgl.NavigationControl(),'top-right');

        window.addEventListener('resize', scroller.resize);


        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
            });
             
            map.on('mouseenter', 'reserve', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
             
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description =  `<h6> Location : ${e.features[0].properties.FIELD_NAME}</h6>
            <p>Amount  of gas flared: ${e.features[0].properties.GAS_VOLUME.toLocaleString()} MCFN</p>
            <p>Number of times gas was Flared :<i> ${e.features[0].properties.TIMES_FLARED} </i></p>`;
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
            });
             
            map.on('mouseleave', 'reserve', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
            });


                 
                map.on('mouseenter', 'seaports', function(e) {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';
                 
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description =  `<h6> Location : ${e.features[0].properties.FIELD_NAME}</h6>`;
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                // Populate the popup and set its coordinates
                // based on the feature found.
                popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
                });
                 
                map.on('mouseleave', 'seaports', function() {
                map.getCanvas().style.cursor = '';
                popup.remove();
                });

              
                     
                    map.on('mouseenter', 'settlement', function(e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                     
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description =  `<h6> Location : ${e.features[0].properties.NAME}</h6>`
                
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                     
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                    });
                     
                    map.on('mouseleave', 'settlement', function() {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                    });
        

                    



                //Existing gas plants
                map.on('mouseenter', 'gas-existing', function(e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                     
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description =  `<h6> Location : ${e.features[0].properties.NAME}</h6>`;
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                     
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                    });
                     
                    map.on('mouseleave', 'gas-existing', function() {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                    });

                


                    map.on('style.load', function () {
                        map.rotateTo(45.0, {
                            duration: 10000
                        });
                  
                })
     

        })

    }

    

    render() {
        const config = this.props;
        const theme =  config.theme;
        const currentChapterID = this.state.currentChapter.id;
        return (
            <div>

                <Row>
                    <Col md="4">


                    <div id="story">
          
                   

                    <div id="features" className={alignments[config.alignment]}>
                        {
                            config.chapters.map(chapter => 
                                <Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID}/>
                            )
                        }
                       
                    </div>     
                    {config.footer &&
                        <div id="footer" className={theme}>
                            <p>{config.footer}</p>
                        </div>
                    }

             
                </div>


                    </Col>


                    <Col md="8">
                    <div id="legend" className={theme} >
        This is a Legend Box
    </div>
           
                <div style={{ width: '80%' }} ref={el => this.mapContainer = el} className="absolute top right left bottom" />
                    </Col>
                </Row>
               

               
            </div>
        );
    }

}

function Chapter({id, theme, title, image, description, chart, currentChapterID}) {
    const classList = id === currentChapterID ? "step active" : "step";
    return (
        <Fragment>
        <div id={id} className={classList}>
            <div className={`${theme} desc`}>
                { title &&
                    <h3 className="title">{title}</h3>
                }
                  { chart &&
                 <div dangerouslySetInnerHTML={{__html: chart}}></div>
              
                }
                { image &&
                    <img src={image} alt={title}></img>
                }
                { description &&
                 <div dangerouslySetInnerHTML={{__html: description}}></div>
              
                }
            </div>
        </div>
        
        </Fragment>
    )
}

export default App;
