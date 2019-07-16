import React from "react";
import { Polyline } from "react-google-maps"

function calculateBezier(C1: LatLng, C2: LatLng, C3: LatLng, C4: LatLng, percent: number) {
    const B = percent * percent * percent;
    // const B1 = (t: number = percent) => {
    //     return t * t * t;
    // }
    // const B2 = (t: number = percent) => {
    //     return t * t * t;
    // }
    // const B3 = (t: number = percent) => {
    //     return t * t * t;
    // }
    // const B4 = (t: number = percent) => {
    //     return t * t * t;
    // }

    const pos : LatLng = {
        lat:0,
        lng:0
    }
    pos.lat = 

    getBezier: function (C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
    }
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface BezierPolylineProps {
    startPos: LatLng;
    endPos: LatLng;
    resolution: number;
}

const BezierPolyline: React.SFC<BezierPolylineProps> = ({
    resolution =
}) => {

    const points = []



}

var GmapsCubicBezier = function (latlong1, latlong2, latlong3, latlong4, resolution, map) {
    var lat1 = latlong1.lat();
    var long1 = latlong1.lng();
    var lat2 = latlong2.lat();
    var long2 = latlong2.lng();
    var lat3 = latlong3.lat();
    var long3 = latlong3.lng();
    var lat4 = latlong4.lat();
    var long4 = latlong4.lng();

    var points = [];

    for (it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
            x: lat1,
            y: long1
        }, {
                x: lat2,
                y: long2
            }, {
                x: lat3,
                y: long3
            }, {
                x: lat4,
                y: long4
            }, it));
    }
    var path = [];
    for (var i = 0; i < points.length - 1; i++) {
        path.push(new google.maps.LatLng(points[i].x, points[i].y));
        path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
    }

    var Line = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeOpacity: 0.0,

        icons: [{
            icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
            },
            offset: '0',
            repeat: '20px'
        }],
        strokeColor: 'red',
    });

    Line.setMap(map);

    return Line;
};


GmapsCubicBezier.prototype = {

    B1: function (t) {
        return t * t * t;
    },
    B2: function (t) {
        return 3 * t * t * (1 - t);
    },
    B3: function (t) {
        return 3 * t * (1 - t) * (1 - t);
    },
    B4: function (t) {
        return (1 - t) * (1 - t) * (1 - t);
    },
    getBezier: function (C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
    }
};