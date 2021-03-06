/*!
 * VIZABI GAPMINDER PREFERENCES (included only in Gapminder build)
 */

(function () {
    'use strict';
    var root = this;
    var Vizabi = root.Vizabi;
    var utils = Vizabi.utils;

    //DEFAULT OPTIONS
    var BarChart = this.Vizabi.Tool.get('BarChart');
    var LineChart = this.Vizabi.Tool.get('LineChart');
    var BubbleChart = this.Vizabi.Tool.get('BubbleChart');
    var MountainChart = this.Vizabi.Tool.get('MountainChart');
    var MountainChartComponent = this.Vizabi.Component.get('gapminder-mountainchart');
    var PopByAge = this.Vizabi.Tool.get('PopByAge');


    var language = {
        id: "en",
        strings: {}
    };

    var locationArray = window.location.href.split("/");
    var localUrl = locationArray.splice(0,locationArray.indexOf("preview")).join("/");
    localUrl += "/preview/"; 
    var onlineUrl = "http://static.gapminderdev.org/vizabi/develop/preview/";
    
    //TODO: remove hardcoded path from source code
    Vizabi._globals.gapminder_paths = {
        baseUrl: localUrl
    };

    BarChart.define('default_options', {
        state: {
            time: {
                start: "1952",
                end: "2012",
                value: "2000",
                step: 1,
                speed: 300,
                formatInput: "%Y"
            },
            entities: {
                dim: "geo",
                show: {
                    _defs_: {
                        "geo": ["*"],
                        "geo.cat": ["region"]
                    }
                }
            },
            marker: {
                space: ["entities", "time"],
                label: {
                    use: "property",
                    which: "geo.name"
                },
                axis_y: {
                    use: "indicator",
                    which: "lex",
                    scaleType: "linear",
                    min: 0,
                    max: 90,
                    allow: {scales: ["linear", "log"]}
                },
                axis_x: {
                    use: "property",
                    which: "geo.name",
                    allow: {scales: ["ordinal"]}
                },
                color: {
                    use: "property",
                    which: "geo.region",
                    scaleType: "ordinal"
                }
            }
        },
        data: {
            reader: "waffle-server",
            splash: true
        },
        language: language,
        ui: {
            buttons: []
        }
    });
    
    MountainChart.define('datawarning_content', {
        title: "Income data has large uncertainty!",
        body: "There are many different ways to estimate and compare income. Different methods are used in different countries and years. Unfortunately no data source exists that would enable comparisons across all countries, not even for one single year. Gapminder has managed to adjust the picture for some differences in the data, but there are still large issues in comparing individual countries. The precise shape of a country should be taken with a large grain of salt.<br/><br/> Gapminder strongly agrees with <a href='https://twitter.com/brankomilan' target='_blank'>Branko Milanovic</a> about the urgent need for a comparable global income survey, especially for the purpose of monitoring the UN poverty-goal.<br/><br/> We are constantly improving our datasets and methods. Please expect revision of this graph within the coming months. <br/><br/> Learn more about the datasets and methods in this <a href='http://www.gapminder.org/news/data-sources-dont-panic-end-poverty' target='_blank'>blog post</a>",
        doubtDomain: [1800, 1950, 2015],
        doubtRange: [1.0, 0.8, 0.6]
    });

    MountainChart.define('default_options', {
        state: {
            time: {
                start: 1800,
                end: 2015,
                value: 2015,
                step: 1,
                speed: 100,
                formatInput: "%Y",
                xLogStops: [1, 2, 5],
                yMaxMethod: "latest",
                povertyline: 1.82,
                povertyCutoff: 0.2,
                povertyFade: 0.7,
                gdpFactor: 1.039781626,
                //0.9971005335,
                gdpShift: -1.127066411,
                //-1.056221322,
                xPoints: 50
            },
            entities: {
                dim: "geo",
                opacitySelectDim: 0.3,
                opacityRegular: 0.6,
                show: {
                    _defs_: {
                        "geo": ['*'], //['swe', 'nor', 'fin', 'bra', 'usa', 'chn', 'jpn', 'zaf', 'ind', 'ago'],
                        "geo.cat": ["country"]
                    }
                }
            },
            marker: {
                space: ["entities", "time"],
                label: {
                    use: "property",
                    which: "geo.name"
                },
                axis_y: {
                    use: "indicator",
                    which: "pop",
                    scaleType: 'linear'
                },
                axis_x: {
                    use: "indicator",
                    //which: "mean",
                    which: "gdp_per_cap",
                    scaleType: 'log',
                    min: 0.11, //0
                    max: 500 //100
                },
                size: {
                    use: "indicator",
                    //which: "variance",
                    which: "gini",
                    scaleType: 'linear'
                },
                color: {
                    use: "property",
                    which: "geo.region",
                    scaleType: "ordinal"
                },
                stack: {
                    use: "value",
                    which: "all" // set a property of data or values "all" or "none"
                },
                group: {
                    which: "geo.region", // set a property of data
                    manualSorting: ["eur", "ame", "afr", "asi"],
                    merge: false
                }
            }
        },
        language: language,
        data: {
            //reader: "waffle-server"
            reader: "csv-file",
            path: Vizabi._globals.gapminder_paths.baseUrl + "local_data/waffles/dont-panic-poverty.csv",
            splash: true
            //path: "https://dl.dropboxusercontent.com/u/21736853/data/process/inc_mount_data_2015test/mountains-pop-gdp-gini-1800-2030.csv"
        }
    });


    LineChart.define('default_options', {
        state: {
            time: {
                start: 1990,
                end: 2012,
                value: 2012,
                step: 1,
                speed: 300,
                formatInput: "%Y"
            },
            //entities we want to show
            entities: {
                dim: "geo",
                show: {
                    _defs_: {
                        "geo": ["*"],
                        "geo.cat": ["region"]
                    }
                }
            },
            //how we show it
            marker: {
                space: ["entities", "time"],
                label: {
                    use: "property",
                    which: "geo.name"
                },
                axis_y: {
                    use: "indicator",
                    which: "gdp_per_cap",
                    scaleType: "log"
                },
                axis_x: {
                    use: "indicator",
                    which: "time",
                    scaleType: "time"
                },
                color: {
                    use: "property",
                    which: "geo",
                    palette: {
                        "asi": "#FF5872",
                        "eur": "#FFE700",
                        "ame": "#7FEB00",
                        "afr": "#00D5E9",
                        "_default": "#ffb600"
                    }
                },
                color_shadow: {
                    use: "property",
                    which: "geo",
                    palette: {
                        "asi": "#FF5872",
                        "eur": "#FFE700",
                        "ame": "#7FEB00",
                        "afr": "#00D5E9",
                        "_default": "#ffb600"
                    }
                }
            }
        },

        data: {
            reader: "waffle-server"
        },
        language: language,
        ui: {
            'vzb-tool-line-chart': {
                entity_labels: {
                    min_number_of_entities_when_values_hide: 2 //values hide when showing 2 entities or more
                },
                whenHovering: {
                    hideVerticalNow: 0,
                    showProjectionLineX: true,
                    showProjectionLineY: true,
                    higlightValueX: true,
                    higlightValueY: true,
                    showTooltip: 0
                }
            },
            buttons: []
        }
    });

    BubbleChart.define('datawarning_content', {
        title: "",
        body: "Comparing the size of economy across countries and time is not trivial. The methods vary and the prices change. Gapminder has adjusted the picture for many such differences, but still we recommend you take these numbers with a large grain of salt.<br/><br/> Countries on a lower income levels have lower data quality in general, as less resources are available for compiling statistics. Historic estimates of GDP before 1950 are generally also more rough. <br/><br/> Data for child mortality is more reliable than GDP per capita, as the unit of comparison, dead children, is universally comparable across time and place. This is one of the reasons this indicator has become so useful to measure social progress. But the historic estimates of child mortality are still suffering from large uncertainties.<br/><br/> Learn more about the datasets and methods in this <a href='http://www.gapminder.org/news/data-sources-dont-panic-end-poverty' target='_blank'>blog post</a>",
        doubtDomain: [1800, 1950, 2015],
        doubtRange: [1.0, 0.3, 0.2]
    });
    
    BubbleChart.define('default_options', {

        state: {
            time: {
                start: "1800",
                end: "2015",
                value: "2015",
                step: 1,
                speed: 300,
                formatInput: "%Y",
                round: "ceil",
                trails: true,
                lockNonSelected: 0,
                adaptMinMaxZoom: false
            },
            entities: {
                dim: "geo",
                show: {
                    _defs_: {
                        "geo": ["*"],
                        "geo.cat": ["country"]
                    }
                }
            },
            marker: {
                space: ["entities", "time"],
                type: "geometry",
                shape: "circle",
                label: {
                    use: "property",
                    which: "geo.name"
                },
                axis_y: {
                    use: "indicator",
                    which: "u5mr",
                    scaleType: "linear",
                    allow: {scales: ["linear", "log", "genericLog"]}
                },
                axis_x: {
                    use: "indicator",
                    which: "gdp_per_cap",
                    scaleType: "log",
                    allow: {scales: ["linear", "log", "genericLog"]}
                },
                color: {
                    use: "property",
                    which: "geo.region",
                    scaleType: "ordinal"
                },
                size: {
                    use: "indicator",
                    which: "pop",
                    scaleType: "linear",
                    allow: {scales: ["linear", "log"]},
                    min: 0.04,
                    max: 0.90 
                }
            }
        },
        data: {
            //reader: "waffle-server",
            reader: "csv-file",
            //path: Vizabi._globals.gapminder_paths.baseUrl + "local_data/waffles/basic-indicators.csv",
            path: Vizabi._globals.gapminder_paths.baseUrl + "local_data/waffles/dont-panic-poverty.csv",
            splash: true
            //path: "https://dl.dropboxusercontent.com/u/21736853/data/process/childsurv_2015test/bub_data_u5mr_inc_etc_20150823.csv"
        },
        language: language,
        ui: {
            'vzb-tool-bubble-chart': {
                whenHovering: {
                    showProjectionLineX: true,
                    showProjectionLineY: true,
                    higlightValueX: true,
                    higlightValueY: true
                },
                labels: {
                    autoResolveCollisions: true,
                    dragging: true
                }
            },
            buttons: []
        }
    });

    PopByAge.define('default_options', {
        state: {
            time: {
                value: '2013'
            },
            entities: {
                dim: "geo",
                show: {
                    _defs_: {
                        "geo": ["usa"]
                    }
                }
            },
            entities_age: {
                dim: "age",
                show: {
                    _defs_: {
                        "age": [[1, 100]] //show 1 through 100
                    }
                }
            },
            marker: {
                space: ["entities", "entities_age", "time"],
                group_by: 1,
                label: {
                    use: "indicator",
                    which: "age"
                },
                label_name: {
                    use: "property",
                    which: "geo"
                },
                axis_y: {
                    use: "indicator",
                    which: "age"
                },
                axis_x: {
                    use: "indicator",
                    which: "population"
                },
                color: {
                    use: "value",
                    which: "#ffb600"
                }
            }
        },
        data: {
            reader: "csv-file",
            path: Vizabi._globals.gapminder_paths.baseUrl + "local_data/waffles/{{geo}}.csv",
            splash: true
        },
        language: language,
        ui: {
            buttons: []
        }
    });

    //Waffle Server Reader custom path
    var WaffleReader = this.Vizabi.Reader.get('waffle-server');
    WaffleReader.define('basepath', "http://52.18.235.31:8001/values/waffle");

    //preloading mountain chart precomputed shapes
    MountainChartComponent.define("preload", function(done) {
        var shape_path = Vizabi._globals.gapminder_paths.baseUrl + "local_data/mc_precomputed_shapes.json";

        d3.json(shape_path, function(error, json) {
            if (error) return console.warn("Failed loading json " + shape_path + ". " + error);
            MountainChartComponent.define('precomputedShapes', json);
            done.resolve();
        });
    });

    //preloading metadata for all charts
    Vizabi.Tool.define("preload", function(promise) {

        var _this = this; 
    
        var metadata_path = Vizabi._globals.gapminder_paths.baseUrl + "local_data/waffles/metadata.json";
        var globals = Vizabi._globals;
        
        
        //TODO: concurrent
        //load language first
        this.preloadLanguage().then(function() {
            //then metadata
            d3.json(metadata_path, function(metadata) {
                
                globals.metadata = metadata;
                
                //TODO: this is a hack that helps to hide indicators which are not present in data
                globals.metadata.indicatorsArray = utils.keys(metadata.indicatorsDB)
                    .filter(function(f){
                        var one = metadata.indicatorsDB[f];
                        return one.allowCharts.indexOf(_this.name)!=-1 || one.allowCharts.indexOf("*")!=-1;
                    });
                
                promise.resolve();
            });
        });

    });

    Vizabi.Tool.define("preloadLanguage", function() {

        var promise = new Vizabi.Promise();

        var langModel = this.model.language;
        var translation_path = Vizabi._globals.gapminder_paths.baseUrl + "local_data/translation/"+langModel.id+".json";

        if(langModel && !langModel.strings[langModel.id]) {
            d3.json(translation_path, function(langdata) {
                langModel.strings[langModel.id] = langdata;
                promise.resolve();
            });
        }
        else {
            promise = promise.resolve();
        }

        return promise;

    });

    //if(datawarning_content) Vizabi.Tool.get("BubbleChart").define("datawarning_content",datawarning_content);
    
}.call(this));
