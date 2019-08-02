import postMarkerSvg from "./post-marker.svg"

export const postSymbol = {
    url: postMarkerSvg,
    anchor: { x: 16, y: 40 },
    labelOrigin:{x:16,y:18},
    shape: {},
    scaledSize: {
        width: 32,
        height: 40
    }
}

export const pinSymbol = {
    path: "M30,99.047619 C33.6357101,99.047619 35.3833096,87.4075254 38.5920453,77.2995863 C41.9674766,66.6665338 46.7751264,57.4799638 49.4156488,54.963641 C55.3625825,49.2964274 59.1044776,41.0653228 59.1044776,31.9047619 C59.1044776,14.8102339 46.0739591,0.952380952 30,0.952380952 C13.9260409,0.952380952 0.895522388,14.8102339 0.895522388,31.9047619 C0.895522388,41.1166613 4.67947631,49.3886572 10.6845437,55.0586812 C13.3440668,57.5698205 17.4672356,66.5996556 20.8623082,77.2995863 C24.026952,87.2732959 26.4241724,99.047619 30,99.047619 Z",
    strokeColor: "#FFFFFF",
    fillColor: "#00B38F",
    fillOpacity: 1,
    anchor:{
        x:30,
        y:100
    },
    scale:0.5,
    labelOrigin: { x: 30, y: 35 }
}

export const checkmarkSymbol = {
    path: "M37.2033451,26.5681682 L30,33.5102196 L42.6191007,50 C50.4022116,38.5664927 56.8750906,30.0056752 62.0377376,24.3175475 C67.2003845,18.6294199 75.854472,10.5235707 88,0 C77.5444454,5.51264902 68.890358,11.3307204 62.0377376,17.4542142 C55.1851171,23.5777079 49.1722368,29.4949567 43.9990965,35.2059606 L37.2033451,26.5681682 Z",
    strokeColor: "#000",
    strokeWeight:0.7,
    strokeOpacity:0.7,
    fillColor: "#00C698",
    fillOpacity: 0.8,
    anchor:{
        x:43,
        y:50
    },
    scale:1,
    labelOrigin: { x: 44, y: 23 }
}


const activeStroke = "#E28826";
const activeFill = "#E28826";


export const trainIcon = {
    path: "M77.9954148,117.859421 C85.3329337,116.67201 92.6369727,108.988574 92.6369727,99.6243873 L92.6369727,31.1595331 C92.6369727,21.493771 84.5383441,12.6213237 73.5352543,12.6213237 L26.4650645,12.6213237 C15.4622937,12.6213237 7.3633462,21.493771 7.3633462,31.1595331 L7.3633462,99.6243873 C7.3633462,108.988574 14.6673852,116.67201 22.004904,117.859421 L0,151 L12.6955784,151 L28.435277,127.8322 L71.5650419,127.8322 L87.3047404,151 L100,151 L77.9954148,117.859421 Z M37.603987,19.668955 C37.603987,17.9882035 39.0598844,16.5763722 40.7338794,16.5763722 L59.2664394,16.5763722 C60.9404345,16.5763722 62.3963319,17.9882035 62.3963319,19.668955 L62.3963319,25.1113886 C62.3963319,26.7921402 61.0201485,28.2369462 59.2664394,28.2369462 L40.7338794,28.2369462 C38.9801703,28.2369462 37.603987,26.7921402 37.603987,25.1113886 L37.603987,19.668955 Z M17.5855571,41.5187252 C17.5855571,36.3964348 20.885081,31.9265961 27.1027769,31.9265961 L72.8975419,31.9265961 C79.1152378,31.9265961 82.4150806,36.3964348 82.4150806,41.5187252 L82.4150806,53.8442366 C82.4632279,59.7668849 78.1586692,63.3928262 72.8975419,63.3928262 L27.1027769,63.3928262 C21.8416496,63.3928262 17.5370909,59.7668849 17.5855571,53.8442366 L17.5855571,41.5187252 Z M26.0664943,107.872555 C21.4414851,107.872555 17.6923739,104.107672 17.6923739,99.4643157 C17.6923739,94.8209594 21.4414851,91.0563961 26.0664943,91.0563961 C30.6915034,91.0563961 34.4406146,94.8209594 34.4406146,99.4643157 C34.4406146,104.107672 30.6915034,107.872555 26.0664943,107.872555 Z M65.3655208,99.4646358 C65.3655208,94.8212796 69.114632,91.0567162 73.7396412,91.0567162 C78.3646503,91.0567162 82.1137615,94.8212796 82.1137615,99.4646358 C82.1137615,104.107992 78.3646503,107.872876 73.7396412,107.872876 C69.114632,107.872876 65.3655208,104.107672 65.3655208,99.4646358 Z M62.3191687,5.31181487 C62.3191687,8.24544921 59.9505486,10.6236297 57.0287066,10.6236297 C54.1068678,10.6236297 51.7382446,8.24544921 51.7382446,5.31181487 C51.7382446,2.37818053 54.1068678,0 57.0287066,0 C59.9505486,0 62.3191687,2.37818053 62.3191687,5.31181487 Z M48.2620743,5.31181487 C48.2620743,8.24544921 45.8934542,10.6236297 42.9716154,10.6236297 C40.0497735,10.6236297 37.6811534,8.24544921 37.6811534,5.31181487 C37.6811534,2.37818053 40.0497735,0 42.9716154,0 C45.8934542,0 48.2620743,2.37818053 48.2620743,5.31181487 Z",
    strokeColor: activeStroke,
    fillColor: activeFill,
    fillOpacity: 1,
    anchor:{
        x:50,
        y:110
    },
    scale:0.25
}

export const planeIcon = {
    path: "M134.893492,83.0931828 L135.314464,97.1322952 L74.7231514,70.618791 L73.3698385,114.384315 L91.0348718,126.611937 L91.3257859,135.808039 L68.0918099,129.825197 L68.0871413,129.749203 L45.1117999,136.030321 L45.2086384,126.826747 L62.6125292,114.358901 L60.3746664,70.6208133 L0.332651748,98.0269706 L0.465828718,83.9630062 L58.5997573,39.1270831 C58.6334133,29.1928075 59.1250385,14.3140315 59.1583148,11.437336 C59.279976,0.919540908 74.1031727,-9.20904702 76.2815559,14.3614214 C76.5414189,17.1731837 76.2805955,32.3177946 75.8544575,39.0996381 L134.893492,83.0931828 Z",
    strokeColor: activeStroke,
    fillColor: activeFill,
    fillOpacity: 1,
    anchor:{
        x:68,
        y:68
    },
    scale:0.25
}

export const ferryIcon = {
    path: "M20.3998309,79.2591962 L1,43.3175596 L20.3998309,43.3175596 L32.3186813,22.5541231 C32.3186813,22.5541231 32.8575655,21.9572276 33.967033,20.8913427 C35.1081995,19.8254579 37.2637363,19.6549163 37.2637363,19.6549163 L52.7011834,19.6549163 L52.7011834,12.3642641 L59.7066779,12.3642641 L63.6373626,0 L68.7092139,0 L66.6804734,6.86429832 L69.5650888,12.3642641 L88.0456467,12.3642641 L88.0456467,19.6549163 L118.159763,19.6549163 C118.159763,19.6549163 120.822485,19.6549163 122.502536,21.573509 C124.784869,24.1316326 125.070161,26.1781315 125.070161,26.1781315 L129.951817,43.3175596 L140.7612,43.3175596 L151,79.2591962 C151,79.2591962 139.144548,69.4530557 120.188504,70.7321175 C104.751057,71.9685439 98.7282333,79.0886546 81.1352494,79.0886546 C71.5304311,79.0886546 57.2024514,72.6080748 46.171175,72.3522625 C38.056213,72.1817209 24.8377008,76.8289788 20.3998309,79.2591962 L20.3998309,79.2591962 Z M28.8634827,95.6311872 C35.330093,93.4994175 44.1741336,89.9180445 59.7066779,94.30949 C67.3778529,96.4412597 74.63694,98.7435709 81.7692308,98.9993833 C91.0570583,99.0420187 96.1923077,96.8676136 103.387997,94.4800316 C109.854607,92.2203557 117.398986,90.3443984 123.104818,90.4296692 C133.058326,90.6428462 140.666103,92.7746158 144.882079,95.2901041 L141.838969,84.2049018 C133.59721,80.4529872 119.554522,78.2785821 103.387997,84.5033495 C96.5726965,87.3172855 89.535503,89.1506074 82.339814,89.0227012 C75.8415046,88.8521597 69.5967878,87.5304625 63.1935757,85.6545052 C42.7159763,79.2591962 34.9497041,83.6080063 24.5524091,87.3172855 L28.8634827,95.6311872 Z M28.6732883,43.3175596 L47.6610313,43.3175596 L47.6610313,27.755641 L40.2434489,27.755641 C40.2434489,27.755641 38.7218935,28.0114534 36.9784446,29.5036922 C35.9323753,30.3564 33.8402367,34.1935854 33.8402367,34.1935854 L28.6732883,43.3175596 Z M77.3947591,43.3175596 L97.1115807,43.3175596 L97.1115807,27.755641 L77.3947591,27.755641 L77.3947591,43.3175596 L77.3947591,43.3175596 Z M119.332629,31.5501911 C119.332629,31.5501911 118.825444,29.8447753 118.001268,29.0347028 C116.891801,28.0114534 115.87743,27.755641 115.87743,27.755641 L102.120034,27.755641 L102.120034,43.3175596 L122.661031,43.3175596 L119.332629,31.5501911 Z M52.7011834,43.3175596 L72.5448014,43.3175596 L72.4814032,27.755641 L52.7011834,27.755641 L52.7011834,43.3175596 Z",
    strokeColor: activeStroke,
    fillColor: activeFill,
    fillOpacity: 1,
    anchor:{
        x:75,
        y:50
    },
    scale:0.25
}

